import fetch from "node-fetch";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GithubImporter } from "../importers/github/GithubImporter.ts";

vi.mock("node-fetch", () => ({ default: vi.fn() }));

const fetchMock = vi.mocked(fetch);

const jsonResponse = (body: unknown, status = 200, statusText = "OK") =>
  ({
    ok: status >= 200 && status < 300,
    status,
    statusText,
    json: async () => body,
    text: async () => JSON.stringify(body),
  }) as unknown as Awaited<ReturnType<typeof fetch>>;

const issuesPage = (titles: string[], hasNextPage: boolean, endCursor: string) =>
  jsonResponse({
    data: {
      repository: {
        issues: {
          edges: titles.map(title => ({
            node: {
              id: title,
              title,
              body: "",
              url: `https://github.com/owner/repo/issues/${title}`,
              createdAt: "2026-01-01T00:00:00Z",
              labels: { nodes: [] },
              comments: { nodes: [] },
            },
          })),
          pageInfo: { hasNextPage, endCursor },
        },
      },
    },
  });

describe("GithubImporter", () => {
  beforeEach(() => {
    // Requests beyond the mocked responses never settle, so a retry loop times out instead of spinning forever
    fetchMock.mockReset().mockReturnValue(new Promise(() => undefined));
  });

  it("fetches every page of issues", async () => {
    fetchMock
      .mockResolvedValueOnce(issuesPage(["1", "2"], true, "cursor-1"))
      .mockResolvedValueOnce(issuesPage(["3"], false, "cursor-2"));

    const result = await new GithubImporter("token", "owner", "repo").import();

    expect(result.issues.map(issue => issue.title)).toEqual(["1", "2", "3"]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(JSON.parse(fetchMock.mock.calls[1][1]?.body as string).variables.cursor).toBe("cursor-1");
  });

  it("fails instead of retrying forever when the GitHub API rejects the request", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ message: "Bad credentials" }, 401, "Unauthorized"));

    await expect(new GithubImporter("revoked", "owner", "repo").import()).rejects.toThrow(
      /401 Unauthorized.*Bad credentials/
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("fails instead of retrying forever when the repository can't be found", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        data: { repository: null },
        errors: [{ type: "NOT_FOUND", message: "Could not resolve to a Repository with the name 'owner/missing'." }],
      })
    );

    await expect(new GithubImporter("token", "owner", "missing").import()).rejects.toThrow(
      "Unable to find repo owner/missing"
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
