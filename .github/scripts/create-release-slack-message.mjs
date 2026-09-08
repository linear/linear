import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const publishedPackages = JSON.parse(process.env.PUBLISHED_PACKAGES);

const releaseLines = publishedPackages.map(({ name, version }) => {
  const packageDirectory = path.join("packages", name.split("/").at(-1));
  const changelogPath = path.join(packageDirectory, "CHANGELOG.md");
  const changelog = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, "utf8") : "";

  const versions = [...changelog.matchAll(/^## ([0-9]\S*)$/gm)].map(match => match[1]);
  const previousVersion = versions.find(candidate => candidate !== version);
  const currentRelease = changelog.split(`## ${version}\n`)[1]?.split(/^## /m)[0] ?? "";
  const releaseType = currentRelease.match(/^### (Major|Minor|Patch) Changes$/m)?.[1].toLowerCase() ?? "";
  const npmUrl = `https://www.npmjs.com/package/${name}/v/${version}`;
  const versionChange = previousVersion ? `v${previousVersion} → ` : "";

  return `• ${name} [${releaseType}] ${versionChange}<${npmUrl}|v${version}>`;
});

const githubApi = endpoint =>
  JSON.parse(
    execFileSync("gh", ["api", `repos/${process.env.GITHUB_REPOSITORY}/${endpoint}`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
  );

let approval = "";
let pullRequestContext = "";
try {
  const pullRequests = githubApi(`commits/${process.env.GITHUB_SHA}/pulls`);
  const pullRequest = pullRequests.find(({ merged_at: mergedAt }) => mergedAt);
  if (pullRequest) {
    const reviews = githubApi(`pulls/${pullRequest.number}/reviews?per_page=100`);
    const latestDecisions = new Map();
    for (const review of reviews) {
      if (!["APPROVED", "CHANGES_REQUESTED", "DISMISSED"].includes(review.state)) {
        continue;
      }
      const previous = latestDecisions.get(review.user.login);
      if (!previous || review.submitted_at > previous.submitted_at) {
        latestDecisions.set(review.user.login, review);
      }
    }

    const approvers = [...latestDecisions.values()]
      .filter(({ state }) => state === "APPROVED")
      .map(({ user }) => `<https://github.com/${user.login}|@${user.login}>`)
      .sort()
      .join(", ");
    if (approvers) {
      approval = `, approved by ${approvers}`;
    }

    const pullRequestUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/pull/${pullRequest.number}`;
    const author =
      pullRequest.user.login === "github-actions[bot]"
        ? "CI"
        : `<https://github.com/${pullRequest.user.login}|@${pullRequest.user.login}>`;
    pullRequestContext = ` — <${pullRequestUrl}|#${pullRequest.number}> by ${author}`;
  }
} catch {
  // Approval context is best effort and should never block a release notification.
}

const runUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
const text = `:rocket: New releases${approval}${pullRequestContext}\n${releaseLines.join("\n")}\n<${runUrl}|View Run>`;

fs.writeFileSync(path.join(process.env.RUNNER_TEMP, "sdk-release-slack.json"), JSON.stringify({ text }));
