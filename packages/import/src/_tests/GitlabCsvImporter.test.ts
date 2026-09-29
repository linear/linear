import fs from "fs";
import os from "os";
import path from "path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { GitLabCsvImporter } from "../importers/gitlabCsv/GitlabCsvImporter.ts";

let tmpDir: string;

const importWeights = async (weights: string[]) => {
  const header = "Title,Description,URL,State,Labels,Due Date,Created At (UTC),Closed At (UTC),Weight,Time Estimate";
  const rows = weights.map(
    (weight, index) => `"Issue ${index}","",https://gitlab.com/a/b/-/issues/${index},opened,,,,,${weight},`
  );
  const file = path.join(tmpDir, `gitlab-${weights.join("-")}.csv`);
  fs.writeFileSync(file, [header, ...rows].join("\n"));
  const { issues } = await new GitLabCsvImporter(file).import();
  return issues.map(issue => issue.priority);
};

describe("GitLabCsvImporter priority", () => {
  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "linear-import-"));
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("maps the highest weight to Urgent and the lowest weight to Low", async () => {
    expect(await importWeights(["1", "2", "3", "4", "5"])).toEqual([4, 3, 3, 2, 1]);
  });

  it("never maps a weighted issue to No priority", async () => {
    const priorities = await importWeights(["1", "3", "8", "13", "21"]);

    expect(priorities.every(priority => priority !== undefined && priority >= 1 && priority <= 4)).toBe(true);
  });

  it("maps a single distinct weight to Urgent", async () => {
    expect(await importWeights(["3", "3"])).toEqual([1, 1]);
  });

  it("leaves issues without a weight unprioritized", async () => {
    expect(await importWeights(["", "2", "4"])).toEqual([undefined, 4, 1]);
  });
});
