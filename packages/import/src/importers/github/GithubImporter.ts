/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Importer, ImportResult } from "../../types.ts";
import { githubClient } from "./client.ts";

interface GITHUB_ISSUE {
  id: string;
  title: string;
  body: string;
  url: string;
  createdAt: string;
  labels: {
    nodes?: {
      id: string;
      color: string;
      name: string;
      description?: string;
    }[];
  };
  comments: {
    nodes?: {
      id: string;
      body: string;
      createdAt: string;
      url: string;
      author: {
        login: string;
        avatarUrl: string;
        id?: string;
        name?: string;
        email?: string;
      };
    }[];
  };
}

/**
 * Fetch and paginate through all Github issues.
 *
 * @param apiKey GitHub api key for authentication
 */
export class GithubImporter implements Importer {
  public constructor(apiKey: string, owner: string, repo: string) {
    this.apiKey = apiKey;

    // If repo contains a slash, it's a full repo name (e.g. "owner/repo")
    if (repo.includes("/")) {
      const [parsedOwner, parsedRepo] = repo.split("/");
      if (!parsedOwner || !parsedRepo) {
        throw new Error(`Invalid repository format: "${repo}". Expected format: "owner/repo" (e.g. "facebook/react")`);
      }
      this.owner = parsedOwner;
      this.repo = parsedRepo;
    } else {
      // If no slash, use the provided owner and repo separately
      if (!owner) {
        throw new Error(
          `Missing organization/owner name. Please provide the full repository name (e.g. "facebook/react") or specify the owner separately.`
        );
      }
      this.owner = owner;
      this.repo = repo;
    }
  }

  public get name(): string {
    return "GitHub";
  }

  public get defaultTeamName(): string {
    return this.repo;
  }

  public import = async (): Promise<ImportResult> => {
    let issueData: GITHUB_ISSUE[] = [];
    let cursor;
    const github = githubClient(this.apiKey);

    while (true) {
      try {
        const data = (await github(
          `query lastIssues($owner: String!, $repo: String!, $num: Int, $cursor: String) {
            repository(owner:$owner, name:$repo) {
              issues(first:$num, after: $cursor, states:OPEN) {
                edges {
                  node {
                    id
                    title
                    body
                    url
                    createdAt
                    labels(first:100) {
                      nodes{
                        id
                        color
                        name
                        description
                      }
                    }
                    comments(first: 100) {
                      nodes {
                        id
                        body
                        createdAt
                        url
                        author {
                          login
                          avatarUrl(size: 255)
                          ... on User {
                            id
                            name
                            email
                          }                        
                        }
                      }
                    }
                  }
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          }`,
          {
            owner: this.owner,
            repo: this.repo,
            num: 25,
            cursor,
          }
        )) as any;

        // User didn't select repo scope
        if (!data || !data.repository) {
          throw new Error(
            `Unable to find repo ${this.owner}/${this.repo}. Did you select \`repo\` scope for your GitHub token?`
          );
        }

        cursor = data.repository.issues.pageInfo.endCursor;
        const fetchedIssues = data.repository.issues.edges.map((d: any) => d.node) as GITHUB_ISSUE[];
        issueData = issueData.concat(fetchedIssues);

        if (!data.repository.issues.pageInfo.hasNextPage) {
          break;
        }
      } catch (err) {
        console.error(err);
      }
    }

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
    };

    for (const issue of issueData) {
      importData.issues.push({
        title: issue.title,
        description: `${issue.body}\n\n[View original issue in GitHub](${issue.url})`,
        url: issue.url,
        comments: issue.comments.nodes
          ? issue.comments.nodes
              .filter(comment => comment.author.id)
              .map(comment => ({
                body: comment.body,
                userId: comment.author.id as string,
                createdAt: new Date(comment.createdAt),
              }))
          : [],
        labels: issue.labels.nodes ? issue.labels.nodes.map(label => label.id) : [],
        createdAt: new Date(issue.createdAt),
      });

      const users = issue.comments.nodes
        ? issue.comments.nodes.map(comment => ({
            id: comment.author.id,
            name: comment.author.login,
            avatarUrl: comment.author.avatarUrl,
            email: comment.author.email,
          }))
        : [];
      for (const user of users) {
        const { id, email, ...userData } = user;
        if (id) {
          importData.users[id] = {
            ...userData,
            email: email && email.length > 0 ? email : undefined,
          };
        }
      }

      const labels = issue.labels.nodes
        ? issue.labels.nodes.map(label => ({
            id: label.id,
            color: `#${label.color}`,
            name: label.name,
            description: label.description,
          }))
        : [];
      for (const label of labels) {
        const { id, ...labelData } = label;
        importData.labels[id] = labelData;
      }
    }

    return importData;
  };

  // -- Private interface

  private apiKey: string;
  private owner: string;
  private repo: string;
}
