import { IssueLabel, LinearClient } from "@linear/sdk";
import { ImportResult } from "../types";
import _ from "lodash";

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
        actualLabelId = await createLabel(client, { name: fullName, teamId });
        const newRootLabel = new Label(actualLabelId, fullName);
        manager.addLabel({ label: newRootLabel, teamId });
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

    let groupLabel = group ? manager.getGroupLabel({ name: group }) : undefined;

    if (group) {
      if (!groupLabel) {
        // Check if the group name conflicts with an existing root label
        const rootLabelConflict = manager.getRootLabel({ name: group });
        if (rootLabelConflict) {
          // Create the group label with a modified name
          const groupName = `${group} (imported)`;
          const groupId = await createLabel(client, { name: groupName, teamId });
          groupLabel = new GroupLabel(groupId, groupName);
          manager.addLabel({ label: groupLabel, teamId });
        } else {
          // Create new group label
          const groupId = await createLabel(client, { name: group, teamId });
          groupLabel = new GroupLabel(groupId, group);
          manager.addLabel({ label: groupLabel, teamId });
        }
      }

      usedGroups.add(group);
    }

    // Handle the child label if we have a valid group
    if (groupLabel) {
      const existingChildLabel = groupLabel.getSubgroupLabel(labelName);
      actualLabelId = existingChildLabel?.id;

      if (!actualLabelId) {
        // Check for naming conflicts
        const existingLabel = manager.getLabelByName(labelName, teamId);
        const newLabelName = existingLabel ? renameConflictingLabel(labelName) : labelName;

        actualLabelId = await createLabel(client, {
          name: newLabelName,
          parentId: groupLabel.id,
          teamId,
        });

        const subgroupLabel = new SubgroupLabel(actualLabelId, newLabelName);
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
      actualLabelId = await createLabel(client, { name: rootLabelName, teamId });
      const newRootLabel = new Label(actualLabelId, rootLabelName);
      manager.addLabel({ label: newRootLabel, teamId });
    }

    labelMapping[labelId] = { type: "root", id: actualLabelId, existedBeforeImport: rootLabel?.existedBeforeImport };
  }
};

const renameConflictingLabel = (labelName: string) => `${labelName} (imported)`;

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

    this.nameToLabel[label.normalizedName] = { [teamId]: label };
    this.idToLabel[label.id] = { [teamId]: label };

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
    existingLabels.sort(a => (a.isGroup ? -1 : 1));

    const isExisting = true;

    for (const existingLabel of existingLabels) {
      const labelName = existingLabel.name;
      const teamId = (await existingLabel.team)?.id ?? WORKSPACE_ID;

      if (existingLabel.isGroup && labelName && existingLabel.id) {
        this.addLabel({ label: new GroupLabel(existingLabel.id, labelName, isExisting), teamId });
      } else if (labelName && existingLabel.id) {
        const parent = await existingLabel.parent;

        if (parent) {
          const group = this.idToLabel[parent.id]?.[teamId] as GroupLabel;
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
    description,
    color,
    parentId,
    teamId,
  }: {
    name: string;
    description?: string;
    color?: string;
    parentId?: Id;
    teamId: Id;
  }
) => {
  try {
    const response = await client.createIssueLabel({ name, description, color, teamId, parentId });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await response?.issueLabel)!.id;
  } catch {
    // If the label failed to create it's likely it's a name conflict, in which case we try one more time with a new name
    const newName = renameConflictingLabel(name);
    const response = await client.createIssueLabel({ name: newName, description, color, teamId, parentId });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await response?.issueLabel)!.id;
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
