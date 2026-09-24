import fetch from "node-fetch";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GithubImporter } from "../importers/github/GithubImporter.ts";
import { githubClient } from "../importers/github/client.ts";

vi.mock("node-fetch", () => ({ default: vi.fn() }));

const fetchMock = vi.mocked(fetch);

const jsonResponse = (body: unknown, status = 200, statusText = "OK", headers: Record<string, string> = {}) =>
  ({
    ok: status >= 200 && status < 300,
    status,
    statusText,
    headers: new Headers(headers),
    text: async () => JSON.stringify(body),
  }) as unknown as Awaited<ReturnType<typeof fetch>>;

const issuesPage = (titles: string[], hasNextPage: boolean, endCursor: string, comments: unknown[] = []) =>
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
              comments: { nodes: comments },
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

  it("skips comments whose author account was deleted", async () => {
    const comment = { body: "Hello", createdAt: "2026-01-02T00:00:00Z", url: "https://github.com/c" };
    fetchMock.mockResolvedValueOnce(
      issuesPage(["1"], false, "cursor-1", [
        { ...comment, id: "c1", author: null },
        { ...comment, id: "c2", author: { id: "u1", login: "octocat", avatarUrl: "https://avatars/u1", email: "" } },
      ])
    );

    const result = await new GithubImporter("token", "owner", "repo").import();

    expect(result.issues[0].comments).toEqual([
      { body: "Hello", userId: "u1", createdAt: new Date(comment.createdAt) },
    ]);
    expect(result.users).toEqual({ u1: { name: "octocat", avatarUrl: "https://avatars/u1", email: undefined } });
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
        errors: [
          {
            type: "NOT_FOUND",
            path: ["repository"],
            message: "Could not resolve to a Repository with the name 'owner/missing'.",
          },
        ],
      })
    );

    await expect(new GithubImporter("token", "owner", "missing").import()).rejects.toThrow(
      "GitHub API request failed: Could not resolve to a Repository with the name 'owner/missing' (at repository). Did you select `repo` scope for your GitHub token?"
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("githubClient", () => {
  const query = () => githubClient("token")("query { viewer { login } }");
  const viewer = jsonResponse({ data: { viewer: { login: "octocat" } } });
  const rateLimited = (headers: Record<string, string>) =>
    jsonResponse({ errors: [{ type: "RATE_LIMITED", message: "API rate limit exceeded for user ID 1." }] }, 200, "OK", {
      "x-ratelimit-remaining": "0",
      ...headers,
    });

  beforeEach(() => {
    vi.useFakeTimers({ now: new Date("2026-01-01T00:00:00Z") });
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    // Requests beyond the mocked responses never settle, so a retry loop times out instead of spinning forever
    fetchMock.mockReset().mockReturnValue(new Promise(() => undefined));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("retries server errors with exponential backoff", async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse("<html>Unicorn!</html>", 502, "Bad Gateway"))
      .mockResolvedValueOnce(jsonResponse({ message: "Server Error" }, 503, "Service Unavailable"))
      .mockResolvedValueOnce(viewer);

    const result = query();
    await vi.advanceTimersByTimeAsync(999);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(1999);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(1);

    await expect(result).resolves.toEqual({ viewer: { login: "octocat" } });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("retries network failures", async () => {
    fetchMock.mockRejectedValueOnce(new Error("socket hang up")).mockResolvedValueOnce(viewer);

    const result = query();
    await vi.runAllTimersAsync();

    await expect(result).resolves.toEqual({ viewer: { login: "octocat" } });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("gives up after 5 attempts", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ message: "Server Error" }, 500, "Internal Server Error"));

    const result = expect(query()).rejects.toThrow(
      "GitHub API request failed with 500 Internal Server Error: Server Error"
    );
    await vi.runAllTimersAsync();

    await result;
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it("waits for the rate limit to reset when GitHub returns a GraphQL rate limit error", async () => {
    const reset = Date.now() / 1000 + 30;
    fetchMock.mockResolvedValueOnce(rateLimited({ "x-ratelimit-reset": String(reset) })).mockResolvedValueOnce(viewer);

    const result = query();
    await vi.advanceTimersByTimeAsync(29_999);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);

    await expect(result).resolves.toEqual({ viewer: { login: "octocat" } });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("honors retry-after on secondary rate limits", async () => {
    fetchMock
      .mockResolvedValueOnce(
        jsonResponse({ message: "You have exceeded a secondary rate limit." }, 403, "Forbidden", {
          "retry-after": "10",
        })
      )
      .mockResolvedValueOnce(viewer);

    const result = query();
    await vi.advanceTimersByTimeAsync(9_999);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);

    await expect(result).resolves.toEqual({ viewer: { login: "octocat" } });
  });

  it("waits a minute when a rate limit doesn't say how long to wait", async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ message: "You have exceeded a secondary rate limit." }, 403, "Forbidden"))
      .mockResolvedValueOnce(viewer);

    const result = query();
    await vi.advanceTimersByTimeAsync(59_999);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);

    await expect(result).resolves.toEqual({ viewer: { login: "octocat" } });
  });

  it("still backs off when the rate limit has already reset by our clock", async () => {
    fetchMock
      .mockResolvedValueOnce(rateLimited({ "x-ratelimit-reset": String(Date.now() / 1000 - 5) }))
      .mockResolvedValueOnce(viewer);

    const result = query();
    await vi.advanceTimersByTimeAsync(999);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);

    await expect(result).resolves.toEqual({ viewer: { login: "octocat" } });
  });

  it("fails without waiting when the rate limit resets too far in the future", async () => {
    fetchMock.mockResolvedValueOnce(rateLimited({ "x-ratelimit-reset": String(Date.now() / 1000 + 3600) }));

    await expect(query()).rejects.toThrow(
      /^GitHub API request failed: API rate limit exceeded for user ID 1\. Try again after .+\.$/
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("does not retry other forbidden responses", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse(
        { message: "Although you appear to have the correct authorization credentials..." },
        403,
        "Forbidden"
      )
    );

    await expect(query()).rejects.toThrow("GitHub API request failed with 403 Forbidden: Although you appear");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("reports GitHub's error message when a response has no data", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ errors: [{ type: "FORBIDDEN", message: "Resource not accessible by personal access token" }] })
    );

    await expect(query()).rejects.toThrow(
      "GitHub API request failed: Resource not accessible by personal access token"
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("fails instead of returning partial data when a response has errors", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        data: { viewer: { login: "octocat" } },
        errors: [
          {
            type: "FORBIDDEN",
            path: ["repository", "issues", "edges", 1, "node", "labels"],
            message: "Resource not accessible by personal access token",
          },
        ],
      })
    );

    await expect(query()).rejects.toThrow(
      "GitHub API request failed: Resource not accessible by personal access token (at repository.issues.edges.1.node.labels)"
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("lists the first few errors when a response has many", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        data: { viewer: { login: "octocat" } },
        errors: [1, 2, 3, 4, 5].map(i => ({ message: "Forbidden", path: ["edges", i] })),
      })
    );

    await expect(query()).rejects.toThrow(
      "GitHub API request failed: Forbidden (at edges.1); Forbidden (at edges.2); Forbidden (at edges.3) and 2 more"
    );
  });
});
