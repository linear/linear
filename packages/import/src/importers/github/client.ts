/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch, { type Response } from "node-fetch";

const GITHUB_API = "https://api.github.com/graphql";

const MAX_ATTEMPTS = 5;
const BASE_RETRY_DELAY_MS = 1000;
// Waits longer than this fail right away with the time to try again, instead of leaving the import waiting
const MAX_RETRY_DELAY_MS = 5 * 60_000;
// GitHub asks clients to wait at least a minute when a rate limit response doesn't say how long to wait
const DEFAULT_RATE_LIMIT_DELAY_MS = 60_000;
// node-fetch has no timeout by default, so a stalled connection would hang the import
const REQUEST_TIMEOUT_MS = 30_000;

/**
 * Rejects tokens with characters that can't be sent in a header, e.g. a pasted zero-width space. fetch would otherwise
 * fail with an error that includes the token.
 */
export const githubTokenError = (token: string): string | undefined =>
  /[^\x21-\x7e]/.test(token)
    ? "GitHub token contains characters that aren't allowed. Copy it again from https://github.com/settings/tokens"
    : undefined;

interface RetryDelay {
  /** Don't retry sooner than this, e.g. until a rate limit resets */
  minMs?: number;
  /** Delay before the first retry, doubled on each further attempt */
  backoffMs?: number;
}

/** An error that may go away if the request is retried, e.g. a network failure, 5xx or rate limit. */
class TransientError extends Error {
  public constructor(
    message: string,
    public readonly delay: RetryDelay = {}
  ) {
    super(message);
  }
}

const retryAfterMs = (res: Response): number | undefined => {
  const retryAfter = Number(res.headers.get("retry-after"));
  return retryAfter > 0 ? retryAfter * 1000 : undefined;
};

/** Time until the primary rate limit resets, if it has been exhausted. */
const rateLimitResetMs = (res: Response): number | undefined => {
  const reset = Number(res.headers.get("x-ratelimit-reset"));
  return res.headers.get("x-ratelimit-remaining") === "0" && reset > 0
    ? Math.max(reset * 1000 - Date.now(), 0)
    : undefined;
};

const rateLimitError = (message: string, res: Response): TransientError => {
  const retryAfter = retryAfterMs(res);
  const reset = rateLimitResetMs(res);
  // The primary rate limit says exactly when it resets
  if (retryAfter === undefined && reset !== undefined) {
    return new TransientError(message, { minMs: reset });
  }
  // Secondary rate limits: wait as long as GitHub asks, or a minute, and exponentially longer while the limit persists
  return new TransientError(message, { backoffMs: retryAfter ?? DEFAULT_RATE_LIMIT_DELAY_MS });
};

const errorMessage = (body: string): string | undefined => {
  try {
    return JSON.parse(body).message;
  } catch {
    return undefined;
  }
};

const withoutTrailingPeriod = (message: string) => message.replace(/\.$/, "");

interface GraphQLError {
  type?: string;
  message: string;
  path?: (string | number)[];
}

// GitHub reports query timeouts and internal errors with a 200 status and this message, which Octokit also retries
const isTransientGraphQLError = (error: GraphQLError) =>
  /Something went wrong while executing your query/.test(error.message);

const MAX_LISTED_ERRORS = 3;

const describeErrors = (errors: GraphQLError[]): string => {
  const listed = errors
    .slice(0, MAX_LISTED_ERRORS)
    .map(error => `${withoutTrailingPeriod(error.message)}${error.path ? ` (at ${error.path.join(".")})` : ""}`)
    .join("; ");
  const more = errors.length > MAX_LISTED_ERRORS ? ` and ${errors.length - MAX_LISTED_ERRORS} more` : "";
  // Private repos also come back as NOT_FOUND when the token is missing the `repo` scope
  const hint = errors.some(error => error.type === "NOT_FOUND")
    ? ". Did you select `repo` scope for your GitHub token?"
    : "";
  return `${listed}${more}${hint}`;
};

const request = async (apiKey: string, query: string, variables?: { [key: string]: any }) => {
  let res: Response;
  let body: string;
  try {
    res = await fetch(GITHUB_API, {
      method: "POST",
      headers: {
        authorization: `token ${apiKey}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      timeout: REQUEST_TIMEOUT_MS,
    });
    body = await res.text();
  } catch (err) {
    // node-fetch rejects with a FetchError on network failures and timeouts. Retrying won't fix anything else.
    if ((err as Error).name !== "FetchError") {
      throw err;
    }
    throw new TransientError(`GitHub API request failed: ${(err as Error).message}`);
  }

  if (!res.ok) {
    const message = errorMessage(body);
    const error = `GitHub API request failed with ${res.status} ${res.statusText}${message ? `: ${message}` : ""}`;
    const rateLimited =
      res.status === 429 ||
      (res.status === 403 &&
        (retryAfterMs(res) !== undefined || rateLimitResetMs(res) !== undefined || /rate limit/i.test(message ?? "")));
    if (rateLimited) {
      throw rateLimitError(error, res);
    }
    if (res.status >= 500) {
      throw new TransientError(error, { minMs: retryAfterMs(res) });
    }
    throw new Error(error);
  }

  const json = JSON.parse(body);
  const errors: GraphQLError[] = json.errors ?? [];
  // GraphQL rate limit errors come back with a 200 status
  const rateLimitGraphQLError = errors.find(error => error.type === "RATE_LIMITED");
  if (rateLimitGraphQLError) {
    throw rateLimitError(`GitHub API request failed: ${rateLimitGraphQLError.message}`, res);
  }
  // GitHub can return partial data alongside errors, e.g. for fields the token can't access. Fail rather than import
  // incomplete data.
  if (errors.length > 0) {
    const error = `GitHub API request failed: ${describeErrors(errors)}`;
    throw errors.every(isTransientGraphQLError) ? new TransientError(error) : new Error(error);
  }
  if (!json.data) {
    throw new Error("GitHub API returned no data");
  }
  return json.data;
};

export const githubClient = (apiKey: string) => {
  return async (query: string, variables?: { [key: string]: any }) => {
    const tokenError = githubTokenError(apiKey);
    if (tokenError) {
      throw new Error(tokenError);
    }
    for (let attempt = 1; ; attempt++) {
      try {
        return await request(apiKey, query, variables);
      } catch (err) {
        if (!(err instanceof TransientError) || attempt >= MAX_ATTEMPTS) {
          throw err;
        }
        // Never retry sooner than the backoff, even if the rate limit has already reset by our clock
        const backoff = (err.delay.backoffMs ?? BASE_RETRY_DELAY_MS) * 2 ** (attempt - 1);
        const delay = Math.max(err.delay.minMs ?? 0, backoff);
        if (delay > MAX_RETRY_DELAY_MS) {
          throw new Error(
            `${withoutTrailingPeriod(err.message)}. Try again after ${new Date(Date.now() + delay).toLocaleTimeString()}.`
          );
        }
        // eslint-disable-next-line no-console
        console.warn(
          `${withoutTrailingPeriod(err.message)}. Retrying in ${Math.ceil(delay / 1000)}s (attempt ${attempt + 1}/${MAX_ATTEMPTS})`
        );
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };
};
