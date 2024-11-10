import { IssueLabel, LinearClient } from "@linear/sdk";
import { ImportResult } from "../types";
import _ from "lodash";

type Id = string;
const WORKSPACE_ID = "workspace";

class LabelManager {
  private nameToLabel: Record<string, { [teamId: Id | typeof WORKSPACE_ID]: Label }> = {};
  private idToLabel: Record<Id, { [teamId: Id | typeof WORKSPACE_ID]: Label }> = {};

  public constructor(
    existingLabels: IssueLabel[],
    private teamId: Id
  ) {
    this.initializeLabels(existingLabels);
  }

  public getLabelByName(name: string, teamId: Id | typeof WORKSPACE_ID): Label | undefined {
    return this.nameToLabel[name.toLowerCase()]?.[teamId] ?? this.nameToLabel[name]?.[WORKSPACE_ID];
  }

  public getLabelById(id: Id, teamId: Id | typeof WORKSPACE_ID): Label | undefined {
    return this.idToLabel[id]?.[teamId] ?? this.idToLabel[id]?.[WORKSPACE_ID];
  }

  private getLabel<T>(props: { name: string } | { id: Id }, checkInstance: (label: Label) => boolean): T | undefined {
    let label: Label | undefined;
    if ("name" in props) {
      label = this.getLabelByName(props.name, this.teamId);
    } else {
      label = this.getLabelById(props.id, this.teamId);
    }
    return (label && checkInstance(label) ? label : undefined) as T | undefined;
  }

  public getGroupLabel(props: { name: string } | { id: Id }): LabelGroup | undefined {
    return this.getLabel<LabelGroup>(props, label => label instanceof LabelGroup);
  }

  public getRootLabel(props: { name: string } | { id: Id }): Label | undefined {
    return this.getLabel<Label>(props, label => label instanceof Label);
  }

  public addLabel(props: { label: Label; parent?: LabelGroup; teamId?: Id | typeof WORKSPACE_ID }) {
    const { label, parent, teamId = this.teamId } = props;

    this.nameToLabel[label.name.toLowerCase()] = { [teamId]: label };
    this.idToLabel[label.id] = { [teamId]: label };

    if (parent) {
      parent.addLabel(label.name, label.id);
    }
  }

  private async initializeLabels(existingLabels: IssueLabel[]) {
    // We want to process groups first.
    existingLabels.sort(a => (a.isGroup ? -1 : 1));

    for (const existingLabel of existingLabels) {
      const labelName = existingLabel.name?.toLowerCase();
      const teamId = (await existingLabel.team)?.id ?? WORKSPACE_ID;

      if (existingLabel.isGroup && labelName && existingLabel.id) {
        const group = new LabelGroup(existingLabel.id, labelName);
        this.addLabel({ label: group, teamId });
      } else if (labelName && existingLabel.id) {
        const parent = await existingLabel.parent;

        if (parent) {
          const group = this.idToLabel[parent.id]?.[teamId] as LabelGroup;
          this.addLabel({ label: new Label(existingLabel.id, labelName), parent: group, teamId });
        } else {
          this.addLabel({ label: new Label(existingLabel.id, labelName), teamId });
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
  const response = await client.createIssueLabel({ name, description, color, teamId, parentId });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return (await response?.issueLabel)!.id;
};

const deleteLabel = async (client: LinearClient, labelId: Id) => {
  await client.deleteIssueLabel(labelId);
};

export const handleLabels = async (
  client: LinearClient,
  importData: ImportResult,
  teamId: string,
  existingLabels: IssueLabel[]
): Promise<Record<string, { type: "root" | "parent" | "child"; id: Id }>> => {
  const manager = new LabelManager(existingLabels, teamId);
  const labelMapping: Record<string, { type: "root" | "parent" | "child"; id: Id }> = {};

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
  labelMapping: Record<string, { type: "root" | "parent" | "child"; id: Id }>
) => {
  let actualLabelId: Id | undefined;
  // Track which groups are used to prevent multiple labels from same group
  const usedGroups = new Set<string>();

  for (const labelId of issueLabelIds) {
    const labelData = importData.labels[labelId];
    const parsed = parseLabelName(labelData.name);
    const group = parsed[0];
    let labelName = parsed[1];

    // If this label's group is already used in this issue,
    // or if it was previously mapped as a child label and its group is in use,
    // create/use a root label with the full name
    if (group && (usedGroups.has(group) || (labelMapping[labelId]?.type === "child" && usedGroups.has(group)))) {
      const fullName = labelData.name;
      actualLabelId = manager.getLabelByName(fullName, teamId)?.id;

      // If this was previously a child label, delete it before converting to root
      if (labelMapping[labelId]?.type === "child") {
        await deleteLabel(client, labelMapping[labelId].id);
      }

      if (!actualLabelId) {
        actualLabelId = await createLabel(client, { name: fullName, teamId });
        const rootLabel = new Label(actualLabelId, fullName);
        manager.addLabel({ label: rootLabel, teamId });
      }

      labelMapping[labelId] = { type: "root", id: actualLabelId };
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
          groupLabel = new LabelGroup(groupId, groupName);
          manager.addLabel({ label: groupLabel, teamId });
        } else {
          // Create new group label
          const groupId = await createLabel(client, { name: group, teamId });
          groupLabel = new LabelGroup(groupId, group);
          manager.addLabel({ label: groupLabel, teamId });
        }
      }

      usedGroups.add(group);
    }

    // Handle the child label if we have a valid group
    if (groupLabel) {
      actualLabelId = groupLabel.labels[labelName];

      if (!actualLabelId) {
        // Check for naming conflicts
        const existingLabel = manager.getLabelByName(labelName, teamId);
        const newLabelName = existingLabel ? `${labelName} (imported)` : labelName;

        actualLabelId = await createLabel(client, {
          name: newLabelName,
          parentId: groupLabel.id,
          teamId,
        });

        const subgroupLabel = new SubgroupLabel(actualLabelId, newLabelName);
        manager.addLabel({ label: subgroupLabel, parent: groupLabel, teamId });
      }

      labelMapping[labelId] = { type: "child", id: actualLabelId };
      continue;
    }

    // Handle as root label
    labelName = labelData.name;
    let rootLabelName = labelName;

    // Check for conflicts with existing group labels
    if (manager.getGroupLabel({ name: labelName })) {
      rootLabelName = `${labelName} (imported)`;
    }

    // Check for existing root label
    actualLabelId = manager.getLabelByName(rootLabelName, teamId)?.id;

    if (!actualLabelId) {
      actualLabelId = await createLabel(client, { name: rootLabelName, teamId });
      const rootLabel = new Label(actualLabelId, rootLabelName);
      manager.addLabel({ label: rootLabel, teamId });
    }

    labelMapping[labelId] = { type: "root", id: actualLabelId };
  }
};

function parseLabelName(fullName: string): [string | undefined, string] {
  const parts = fullName.split("/");
  let group: string | undefined;
  let subgroup: string;

  if (parts.length > 1) {
    subgroup = parts.pop() as string;
    group = parts.join("/");
  } else {
    group = undefined;
    subgroup = fullName;
  }

  // Ensure every part is truncated to 80 characters
  return [group, subgroup].map(part => (part ? _.truncate(part.trim(), { length: 80 }) : undefined)) as [
    string | undefined,
    string,
  ];
}

class Label {
  public constructor(
    public id: Id,
    public name: string
  ) {}
}

class LabelGroup extends Label {
  public labels: Record<string, Id> = {};

  public constructor(id: Id, name: string) {
    super(id, name);
  }

  public addLabel(name: string, id: Id) {
    this.labels[name.toLowerCase()] = id;
  }
}

class SubgroupLabel extends Label {}
