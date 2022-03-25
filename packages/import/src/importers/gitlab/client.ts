import fetch from "node-fetch";
import { GITLAB_ISSUE } from "./GitlabImporter";

const GITLAB_API = "https://gitlab.com/api/v4";

export const gitlabClient = (apiKey: string) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return async (path: string, method: string, body?: never) => {
    const headers = {
      "Content-Type": "application/json",
      "PRIVATE-TOKEN": apiKey,
    };

    const response = await fetch(`${GITLAB_API}/${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
      throw new Error("Invalid API key");
    }

    if (response.status === 404) {
      throw new Error("Not found");
    }

    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }

    return response.json();
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getGitlabProjectId = (apiKey: string, projectName: string) => {
  return gitlabClient(apiKey)("projects?per_page=100&visibility=private", "GET")
    .then(projects => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { id } = projects.find((project: { path: string }) => project.path === projectName);

      if (!id) {
        throw new Error(`Project ${projectName} not found`);
      }

      return id;
    })
    .catch(error => {
      throw new Error(`Failed to get project: ${error.message}`);
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getGitlabIssuesFromRepo = async (apiKey: string, projectId: number) => {
  return await gitlabClient(apiKey)(`projects/${projectId}/issues?per_page=100`, "GET")
    .then(issues =>
      issues.map((issue: GITLAB_ISSUE) => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        labels: issue.labels,
        assignees: issue.assignees,
        due_date: issue.due_date,
        severity: issue.severity,
        web_url: issue.web_url,
        created_at: issue.created_at,
        state: issue.state,
      }))
    )
    .catch(error => {
      throw new Error(`Failed to get issues: ${error.message}`);
    });
};
