import type { IssueLabel, LinearClient } from "@linear/sdk";
import { describe, expect, it } from "vitest";
import { handleLabels } from "../helpers/labelManager.ts";
import type { ImportResult } from "../types.ts";

const TEAM_ID = "team-1";

interface StoredLabel {
  id: string;
  name: string;
  isGroup: boolean;
  teamId?: string;
  parentId?: string;
}

/** In-memory stand-in for the label API. Like Linear, names are unique per team regardless of parent group. */
class FakeLabelApi {
  public labels: StoredLabel[] = [];
  private nextId = 1;

  public add(label: Omit<StoredLabel, "id">) {
    const stored = { ...label, id: `label-${this.nextId++}` };
    this.labels.push(stored);
    return stored;
  }

  public find(name: string) {
    return this.labels.find(label => label.name === name);
  }

  public client() {
    return {
      createIssueLabel: async (input: { name: string; teamId?: string; parentId?: string; isGroup?: boolean }) => {
        const conflict = this.labels.some(
          label =>
            label.name.toLowerCase() === input.name.toLowerCase() && (!label.teamId || label.teamId === input.teamId)
        );
        if (conflict) {
          throw new Error(`Label "${input.name}" already exists in team. Please pick a different name and try again.`);
        }
        const stored = this.add({
          name: input.name,
          isGroup: input.isGroup ?? false,
          teamId: input.teamId,
          parentId: input.parentId,
        });
        return { issueLabel: Promise.resolve({ id: stored.id }) };
      },
      deleteIssueLabel: async (id: string) => {
        this.labels = this.labels.filter(label => label.id !== id);
      },
    } as unknown as LinearClient;
  }

  public existingLabels() {
    return this.labels.map(
      label =>
        ({
          id: label.id,
          name: label.name,
          isGroup: label.isGroup,
          team: Promise.resolve(label.teamId ? { id: label.teamId } : undefined),
          parent: Promise.resolve(label.parentId ? { id: label.parentId } : undefined),
        }) as unknown as IssueLabel
    );
  }

  /** Runs one import, loading existing labels from the store like the CLI does */
  public import(importData: ImportResult) {
    return handleLabels(this.client(), importData, TEAM_ID, this.existingLabels());
  }
}

const importWithLabels = (labelNames: string[]): ImportResult => ({
  issues: [{ title: "Issue", labels: labelNames.map((_, index) => `csv-${index}`) }],
  users: {},
  labels: Object.fromEntries(labelNames.map((name, index) => [`csv-${index}`, { name }])),
});

describe("handleLabels", () => {
  it("reuses a renamed child label when the same CSV is imported repeatedly", async () => {
    const api = new FakeLabelApi();
    api.add({ name: "Critical", isGroup: false, teamId: TEAM_ID });
    const importData = importWithLabels(["Notion Priority/Critical"]);

    const first = await api.import(importData);
    const child = api.find("Critical (imported)");
    expect(child?.parentId).toBe(api.find("Notion Priority")?.id);
    expect(first["csv-0"]).toMatchObject({ type: "child", id: child?.id });

    const labelCount = api.labels.length;
    for (let run = 0; run < 2; run++) {
      const mapping = await api.import(importData);
      expect(mapping["csv-0"]).toMatchObject({ type: "child", id: child?.id });
    }
    expect(api.labels).toHaveLength(labelCount);
    expect(api.find("Critical (imported) (imported)")).toBeUndefined();
  });

  it("recovers when a group already contains duplicate renamed children", async () => {
    const api = new FakeLabelApi();
    api.add({ name: "Critical", isGroup: false, teamId: TEAM_ID });
    const group = api.add({ name: "Notion Priority", isGroup: true, teamId: TEAM_ID });
    const child = api.add({ name: "Critical (imported)", isGroup: false, teamId: TEAM_ID, parentId: group.id });
    api.add({ name: "Critical (imported) (imported)", isGroup: false, teamId: TEAM_ID, parentId: group.id });
    const labelCount = api.labels.length;

    const mapping = await api.import(importWithLabels(["Notion Priority/Critical"]));

    expect(mapping["csv-0"]).toMatchObject({ type: "child", id: child.id });
    expect(api.labels).toHaveLength(labelCount);
  });

  it("reuses a renamed group label when the group name collides with a root label", async () => {
    const api = new FakeLabelApi();
    api.add({ name: "Notion Priority", isGroup: false, teamId: TEAM_ID });
    const importData = importWithLabels(["Notion Priority/High"]);

    await api.import(importData);
    const group = api.find("Notion Priority (imported)");
    expect(group?.isGroup).toBe(true);
    const labelCount = api.labels.length;

    const mapping = await api.import(importData);

    expect(mapping["csv-0"]).toMatchObject({ type: "child", id: api.find("High")?.id });
    expect(api.find("High")?.parentId).toBe(group?.id);
    expect(api.labels).toHaveLength(labelCount);
  });

  it("doesn't reuse a child ending in (imported) when the original name is free", async () => {
    const api = new FakeLabelApi();
    const group = api.add({ name: "Notion Priority", isGroup: true, teamId: TEAM_ID });
    const unrelated = api.add({ name: "Critical (imported)", isGroup: false, teamId: TEAM_ID, parentId: group.id });

    const mapping = await api.import(importWithLabels(["Notion Priority/Critical"]));

    const child = api.find("Critical");
    expect(child?.parentId).toBe(group.id);
    expect(mapping["csv-0"]).toMatchObject({ type: "child", id: child?.id });
    expect(mapping["csv-0"]?.id).not.toBe(unrelated.id);
  });

  it("doesn't reuse a group ending in (imported) when the original name is free", async () => {
    const api = new FakeLabelApi();
    const unrelated = api.add({ name: "Notion Priority (imported)", isGroup: true, teamId: TEAM_ID });

    await api.import(importWithLabels(["Notion Priority/High"]));

    const group = api.find("Notion Priority");
    expect(group?.isGroup).toBe(true);
    expect(api.find("High")?.parentId).toBe(group?.id);
    expect(api.find("High")?.parentId).not.toBe(unrelated.id);
  });

  it("picks the next free name when the renamed name is taken outside the group", async () => {
    const api = new FakeLabelApi();
    api.add({ name: "Critical", isGroup: false, teamId: TEAM_ID });
    api.add({ name: "Critical (imported)", isGroup: false, teamId: TEAM_ID });
    const importData = importWithLabels(["Notion Priority/Critical"]);

    await api.import(importData);
    const child = api.find("Critical (imported) (imported)");
    expect(child?.parentId).toBe(api.find("Notion Priority")?.id);
    const labelCount = api.labels.length;

    const mapping = await api.import(importData);

    expect(mapping["csv-0"]).toMatchObject({ type: "child", id: child?.id });
    expect(api.labels).toHaveLength(labelCount);
  });
});
