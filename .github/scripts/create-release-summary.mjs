import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const plan = JSON.parse(fs.readFileSync(path.join(process.env.RUNNER_TEMP, "release-plan.json"), "utf8"));
const releases = plan.releases.filter(({ type }) => type !== "none");
const lines = [
  "This is an automated SDK maintenance PR. Merging it will publish the listed packages to npm.",
  "",
  "| Package | Current | Release | Bump |",
  "| --- | --- | --- | --- |",
  ...releases.map(({ name, oldVersion, newVersion, type }) => `| ${name} | ${oldVersion} | ${newVersion} | ${type} |`),
  "",
  "Full release notes are available in the changed `CHANGELOG.md` files.",
  "",
];
const body = lines.join("\n");

fs.writeFileSync(path.join(process.env.RUNNER_TEMP, "release-body.md"), body);
fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, body);
