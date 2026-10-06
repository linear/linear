import { type IssueLabel, LinearClient } from "@linear/sdk";
import _ from "lodash";
import type { ImportResult } from "../types.ts";

type Id = string;
const WORKSPACE_ID = "workspace";

type LabelType = "root" | "parent" | "child";

/**
 * Handle importing labels
 *
 * @param client Linear client instance to use for API requests
 * @param importData Import data containing issues and labels
 * @param teamId Team ID being imported to
 * @param existingLabels Existing labels in the team and workspace
 */
export const handleLabels = async (
  client: LinearClient,
  importData: ImportResult,
  teamId: string,
  existingLabels: IssueLabel[]
): Promise<Record<string, { type: LabelType; id: Id }>> => {
  const manager = await LabelManager.create(teamId, existingLabels);
  const labelMapping: Record<string, { type: LabelType; id: Id; existedBeforeImport: boolean }> = {};

  // We process issues instead of labels to validate issue <> label constraints (e.g. only one label from a group)
  for (const issue of importData.issues) {
    const labels = issue.labels;
    if (!labels) {
      continue;
    }

    await handleIssueLabels(client, manager, teamId, importData, labels, labelMapping);
  }

  return labelMapping;
};

const handleIssueLabels = async (
  client: LinearClient,
  manager: LabelManager,
  teamId: Id,
  importData: ImportResult,
  issueLabelIds: string[],
  labelMapping: Record<string, { type: "root" | "parent" | "child"; id: Id; existedBeforeImport?: boolean }>
) => {
  let actualLabelId: Id | undefined;
  // Track which groups are used to prevent multiple labels from same group
  const usedGroups = new Set<string>();

  for (const labelId of issueLabelIds) {
    const labelData = importData.labels[labelId];
    const parsed = parseLabelName(labelData.name);
    const group = parsed[0];
    let labelName = parsed[1];

    // If this label's group is already used in this issue, or if it was previously mapped as a child label
    // and its group is in use, create/use a root label with the full name.
    if (group && (usedGroups.has(group) || (labelMapping[labelId]?.type === "child" && usedGroups.has(group)))) {
      const fullName = labelData.name;
      const label = manager.getLabelByName(fullName, teamId);
      actualLabelId = label?.id;

      // If this was previously a child label, delete it before converting to root
      if (labelMapping[labelId]?.type === "child" && !labelMapping[labelId].existedBeforeImport) {
        await deleteLabel(client, labelMapping[labelId].id);
      }

      if (!actualLabelId) {
        const created = await createLabel(client, { name: fullName, teamId, isGroup: false });
        actualLabelId = created.id;
        manager.addLabel({ label: new Label(created.id, created.name), teamId });
      }

      labelMapping[labelId] = { type: "root", id: actualLabelId, existedBeforeImport: label?.existedBeforeImport };
      continue;
    }

    // If we already have a mapping for this label and it's not a conflicting child label,
    // use it and track the group
    if (labelMapping[labelId]) {
      if (group) {
        usedGroups.add(group);
      }
      continue;
    }

    // Previous imports may have renamed labels to avoid conflicts, so match those names too
    let groupLabel = group ? findImportedLabel(group, name => manager.getGroupLabel({ name })) : undefined;

    if (group) {
      if (!groupLabel) {
        const groupName = getAvailableName(manager, group, teamId);
        const created = await createLabel(client, { name: groupName, teamId, isGroup: true });
        groupLabel = new GroupLabel(created.id, created.name);
        manager.addLabel({ label: groupLabel, teamId });
      }

      usedGroups.add(group);
    }

    // Handle the child label if we have a valid group
    if (groupLabel) {
      const existingChildLabel = findImportedLabel(labelName, name => groupLabel.getSubgroupLabel(name));
      actualLabelId = existingChildLabel?.id;

      if (!actualLabelId) {
        const created = await createLabel(client, {
          name: getAvailableName(manager, labelName, teamId),
          parentId: groupLabel.id,
          teamId,
          isGroup: false,
        });
        actualLabelId = created.id;

        const subgroupLabel = new SubgroupLabel(created.id, created.name);
        manager.addLabel({ label: subgroupLabel, parent: groupLabel, teamId });
      }

      labelMapping[labelId] = {
        type: "child",
        id: actualLabelId,
        existedBeforeImport: existingChildLabel?.existedBeforeImport,
      };
      continue;
    }

    // Handle as root label
    labelName = labelData.name;
    let rootLabelName = labelName;

    // Check for conflicts with existing group labels
    if (manager.getGroupLabel({ name: labelName })) {
      rootLabelName = renameConflictingLabel(labelName);
    }

    // Check for existing root label
    const rootLabel = manager.getRootLabel({ name: rootLabelName });
    actualLabelId = rootLabel?.id;

    if (!actualLabelId) {
      const created = await createLabel(client, { name: rootLabelName, teamId, isGroup: false });
      actualLabelId = created.id;
      manager.addLabel({ label: new Label(created.id, created.name), teamId });
    }

    labelMapping[labelId] = { type: "root", id: actualLabelId, existedBeforeImport: rootLabel?.existedBeforeImport };
  }
};

const renameConflictingLabel = (labelName: string) => `${labelName} (imported)`;

const MAX_CONFLICT_RENAMES = 5;

/** The label name followed by the names previous imports may have renamed it to on conflict */
const importedNameCandidates = (labelName: string) =>
  _.range(MAX_CONFLICT_RENAMES + 1).map(renames => labelName + " (imported)".repeat(renames));

const findImportedLabel = <T>(labelName: string, find: (name: string) => T | undefined) =>
  importedNameCandidates(labelName)
    .map(find)
    .find(label => label !== undefined);

/** Label names are unique across the team regardless of group, so avoid every existing name */
const getAvailableName = (manager: LabelManager, labelName: string, teamId: Id) =>
  importedNameCandidates(labelName).find(name => !manager.getLabelByName(name, teamId)) ?? labelName;

function parseLabelName(fullName: string): [string | undefined, string] {
  // Ensure every part is truncated to 80 characters
  const parts = fullName.split("/").map(part => _.truncate(part.trim(), { length: 80 }));
  let group: string | undefined;
  let subgroup: string;

  if (parts.length > 1) {
    subgroup = parts.pop() as string;
    group = parts.join("/");
  } else {
    group = undefined;
    subgroup = fullName;
  }

  return [group, subgroup] as [string | undefined, string];
}

class LabelManager {
  private nameToLabel: Record<string, { [teamId: Id | typeof WORKSPACE_ID]: Label }> = {};
  private idToLabel: Record<Id, { [teamId: Id | typeof WORKSPACE_ID]: Label }> = {};

  public constructor(private teamId: Id) {}

  /**
   * Create a new label manager.
   *
   * @param teamId The team ID being imported to
   * @param existingLabels Existing labels in the team and workspace
   * @returns LabelManager instance
   */
  public static async create(teamId: Id, existingLabels: IssueLabel[]): Promise<LabelManager> {
    const manager = new LabelManager(teamId);
    await manager.initializeLabels(existingLabels);
    return manager;
  }

  /**
   * Retrieve a label by name in either the workspace or specified team
   *
   * @param name Label name
   * @param teamId Team ID to search in
   * @returns Label instance if found
   */
  public getLabelByName(name: string, teamId: Id | typeof WORKSPACE_ID): Label | undefined {
    const normalized = Label.normalizeName(name);
    return this.nameToLabel[normalized]?.[teamId] ?? this.nameToLabel[normalized]?.[WORKSPACE_ID];
  }

  /**
   * Retrieve a label by its ID in either the workspace or specified team
   *
   * @param name Label ID
   * @param teamId Team ID to search in
   * @returns Label instance if found
   */
  public getLabelById(id: Id, teamId: Id | typeof WORKSPACE_ID): Label | undefined {
    return this.idToLabel[id]?.[teamId] ?? this.idToLabel[id]?.[WORKSPACE_ID];
  }

  /**
   * Retrieve a group label by name or ID in either the workspace or specified team
   *
   * @param props Object containing either name or ID
   * @returns GroupLabel instance if found
   */
  public getGroupLabel(props: { name: string } | { id: Id }): GroupLabel | undefined {
    return this.getLabel(props, GroupLabel);
  }

  /**
   * Retrieve a root label by name or ID in either the workspace or specified team
   *
   * @param props Object containing either name or ID
   * @returns Label instance if found
   */
  public getRootLabel(props: { name: string } | { id: Id }): Label | undefined {
    return this.getLabel(props, Label);
  }

  /**
   * Adds a label to the manager
   *
   * @param props Object containing the team ID and label data
   */
  public addLabel(
    props: { teamId: Id } & (
      | {
          label: Label;
        }
      | {
          label: SubgroupLabel;
          parent: GroupLabel;
        }
    )
  ) {
    const { label, teamId = this.teamId } = props;

    this.nameToLabel[label.normalizedName] = { ...this.nameToLabel[label.normalizedName], [teamId]: label };
    this.idToLabel[label.id] = { ...this.idToLabel[label.id], [teamId]: label };

    if ("parent" in props) {
      const { parent } = props;
      parent.addSubgroupLabel(label);
    }
  }

  private getLabel<T extends typeof Label>(
    props: { name: string } | { id: Id },
    instanceType: T
  ): InstanceType<T> | undefined {
    let label: Label | undefined;
    if ("name" in props) {
      label = this.getLabelByName(props.name, this.teamId);
    } else {
      label = this.getLabelById(props.id, this.teamId);
    }
    return (label && label instanceof instanceType ? label : undefined) as InstanceType<T> | undefined;
  }

  private async initializeLabels(existingLabels: IssueLabel[]) {
    // We want to process groups first.
    existingLabels.sort((a, b) => Number(b.isGroup) - Number(a.isGroup));

    const isExisting = true;

    for (const existingLabel of existingLabels) {
      const labelName = existingLabel.name;
      const teamId = (await existingLabel.team)?.id ?? WORKSPACE_ID;

      if (existingLabel.isGroup && labelName && existingLabel.id) {
        this.addLabel({ label: new GroupLabel(existingLabel.id, labelName, isExisting), teamId });
      } else if (labelName && existingLabel.id) {
        const parent = await existingLabel.parent;
        const group = parent ? this.idToLabel[parent.id]?.[teamId] : undefined;

        if (group instanceof GroupLabel) {
          this.addLabel({ label: new Label(existingLabel.id, labelName, isExisting), parent: group, teamId });
        } else {
          this.addLabel({ label: new Label(existingLabel.id, labelName, isExisting), teamId });
        }
      }
    }
  }
}

const createLabel = async (
  client: LinearClient,
  {
    name,
    isGroup,
    description,
    color,
    parentId,
    teamId,
  }: {
    name: string;
    isGroup: boolean;
    description?: string;
    color?: string;
    parentId?: Id;
    teamId: Id;
  }
) => {
  try {
    const response = await client.createIssueLabel({ name, description, color, teamId, parentId, isGroup });
    return { id: (await response?.issueLabel)!.id, name };
  } catch {
    // If the label failed to create it's likely it's a name conflict, in which case we try one more time with a new name
    const newName = renameConflictingLabel(name);
    const response = await client.createIssueLabel({ name: newName, description, color, teamId, parentId, isGroup });
    return { id: (await response?.issueLabel)!.id, name: newName };
  }
};

const deleteLabel = async (client: LinearClient, labelId: Id) => {
  await client.deleteIssueLabel(labelId);
};

/** A root label */
class Label {
  /**
   * Create a new label
   *
   * @param id Label ID returned from the API
   * @param name Label name as it was imported
   * @param existedBeforeImport Whether the label existed before the import
   */
  public constructor(
    public id: Id,
    private name: string,
    public existedBeforeImport: boolean = false
  ) {}

  public get normalizedName() {
    return Label.normalizeName(this.name);
  }

  public static normalizeName(name: string) {
    // Trim and lowercase to prevent duplicates
    return name.toLowerCase().trim();
  }
}

/** A label group (parent label) */
class GroupLabel extends Label {
  private labels: Record<string, Label> = {};

  public constructor(id: Id, name: string, existedBeforeImport?: boolean) {
    super(id, name, existedBeforeImport);
  }

  public addSubgroupLabel(label: SubgroupLabel) {
    this.labels[label.normalizedName] = label;
  }

  public getSubgroupLabel(name: string) {
    return this.labels[Label.normalizeName(name)];
  }
}

/** A label in a group (child label)  */
class SubgroupLabel extends Label {}
