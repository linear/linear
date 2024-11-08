import { IssueLabel, LinearClient } from "@linear/sdk";
import { ImportResult } from "../types";
import _ from "lodash";

type Id = string;

class LabelManager {
  public constructor(existingLabels: IssueLabel[]) {
    this.existingLabelMap = {};
    this.existingLabelGroupsMap = {};
    this.existingGroupIdLabelMap = {};

    this.processExistingLabels(existingLabels);
  }

  public getGroupLabelId(groupName: string): Id | undefined {
    return this.existingLabelGroupsMap[groupName.toLowerCase()];
  }

  public getLabelId(labelName: string): Id | undefined {
    return this.existingLabelMap[labelName.toLowerCase()];
  }

  public doesRootLabelExist(labelName: string): boolean {
    return !!this.existingLabelMap[labelName.toLowerCase()];
  }

  public addGroup(groupName: string, groupLabelId: Id): void {
    this.existingLabelGroupsMap[groupName.toLowerCase()] = groupLabelId;
    this.existingGroupIdLabelMap[groupLabelId] = {};
  }

  public addGroupLabel(groupId: Id, labelName: string, labelId: Id): void {
    this.existingGroupIdLabelMap[groupId][labelName.toLowerCase()] = labelId;
  }

  public addLabel(labelName: string, labelId: Id): void {
    this.existingLabelMap[labelName.toLowerCase()] = labelId;
  }

  public getGroupLabel(groupId: Id, labelName: string): Id | undefined {
    return this.existingGroupIdLabelMap[groupId][labelName.toLowerCase()];
  }

  private processExistingLabels(existingLabels: IssueLabel[]) {
    for (const label of existingLabels) {
      const labelName = label.name?.toLowerCase();
      if (label.isGroup) {
        if (labelName && label.id && !this.existingLabelGroupsMap[labelName]) {
          this.existingLabelGroupsMap[labelName] = label.id;
        }
      } else {
        if (labelName && label.id && !this.existingLabelMap[labelName]) {
          this.existingLabelMap[labelName] = label.id;
        }
      }
    }
  }

  private existingLabelMap: { [name: string]: string };
  private existingLabelGroupsMap: { [name: string]: string };
  private existingGroupIdLabelMap: { [id: Id]: { [name: string]: Id } };
}

export const handleLabels = async (
  client: LinearClient,
  data: ImportResult,
  teamId: string,
  existingLabels: IssueLabel[]
): Promise<{ [identifier: string]: string }> => {
  const manager = new LabelManager(existingLabels);
  const { labels } = data;

  const createLabel = async ({
    name,
    description,
    color,
    parentId,
  }: {
    name: string;
    description?: string;
    color?: string;
    parentId?: string;
  }) => {
    const labelResponse = await client.createIssueLabel({
      name,
      description,
      color,
      teamId,
      parentId,
    });

    const issueLabel = await labelResponse?.issueLabel;
    return issueLabel?.id;
  };

  // Create labels and mapping to source data
  const labelMapping = {} as { [identifier: string]: Id };

  for (const labelId of Object.keys(labels)) {
    const label = labels[labelId];
    let labelName = _.truncate(label.name.trim(), { length: 80 });

    let groupLabelId: string | undefined;
    // Handle label groups
    if (labelName.indexOf("/") !== -1) {
      const parts = labelName.split("/");
      const group = parts.slice(0, -1).join("/");
      const subgroup = parts[parts.length - 1];

      groupLabelId = manager.getGroupLabelId(group);
      const rootLabelExists = manager.doesRootLabelExist(group);

      // Label group does not exist, create it
      if (!groupLabelId) {
        groupLabelId = await createLabel({
          name: rootLabelExists ? `${group} (group)` : group,
          color: label.color,
          description: label.description,
        });

        if (groupLabelId) {
          manager.addGroup(group, groupLabelId);
        }
      }

      labelName = subgroup; // Use the subgroup name for the actual label
    }

    let actualLabelId: string | undefined;
    if (groupLabelId) {
      // If we have a group label, check if we've already created the subgroup label
      actualLabelId = manager.getGroupLabel(groupLabelId, labelName);
    } else {
      // Check if this label matches with an existing group label
      if (manager.getGroupLabelId(labelName)) {
        // This label has matched with an existing group label. We cannot re-use the label as-is, it will be renamed.
        actualLabelId = undefined;
        labelName = `${labelName} (imported)`;
      }

      // Check if this label matches with an existing root label
      actualLabelId = manager.getLabelId(labelName);
    }

    if (!actualLabelId) {
      // We haven't found an existing label, create it
      actualLabelId = await createLabel({
        name: labelName,
        color: label.color,
        description: label.description,
        parentId: groupLabelId,
      });

      if (groupLabelId && actualLabelId) {
        manager.addGroupLabel(groupLabelId, labelName, actualLabelId);
      } else if (actualLabelId) {
        manager.addLabel(labelName, actualLabelId);
      }
    }

    if (actualLabelId) {
      labelMapping[labelId] = actualLabelId;
    }
  }

  return labelMapping;
};
