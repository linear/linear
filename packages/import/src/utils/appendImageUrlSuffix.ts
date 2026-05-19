const IMAGE_TAG_REGEX = /(<img[^>]*?src=")(https?:\/\/[^"]+)(")/g;

function mergeQuery(url: string, suffix: string): string {
  const fragmentStart = url.indexOf("#");
  const urlWithoutFragment = fragmentStart === -1 ? url : url.slice(0, fragmentStart);
  const fragment = fragmentStart === -1 ? "" : url.slice(fragmentStart);

  if (suffix.startsWith("?") && urlWithoutFragment.includes("?")) {
    return urlWithoutFragment + "&" + suffix.slice(1) + fragment;
  }
  return urlWithoutFragment + suffix + fragment;
}

function hostMatches(url: string, allowedHostSuffixes: string[]): boolean {
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return false;
  }
  return allowedHostSuffixes.some(suffix => {
    const lower = suffix.toLowerCase();
    return host === lower || host.endsWith("." + lower);
  });
}

function findMarkdownImageUrlEnd(text: string, start: number): number | undefined {
  let depth = 0;
  for (let index = start; index < text.length; index++) {
    const char = text[index];
    if (char === "\\") {
      index++;
      continue;
    }
    if (char === "(") {
      depth++;
      continue;
    }
    if (char === ")") {
      if (depth === 0) {
        return index;
      }
      depth--;
      continue;
    }
    if (depth === 0 && /\s/.test(char)) {
      return hasMarkdownImageClosingDelimiter(text, index) ? index : undefined;
    }
  }
  return undefined;
}

function hasMarkdownImageClosingDelimiter(text: string, start: number): boolean {
  let index = skipWhitespace(text, start);

  if (text[index] === ")") {
    return true;
  }

  index = findMarkdownImageTitleEnd(text, index);
  if (index === -1) {
    return false;
  }

  index = skipWhitespace(text, index);
  return text[index] === ")";
}

function skipWhitespace(text: string, start: number): number {
  let index = start;
  while (index < text.length && /\s/.test(text[index])) {
    index++;
  }
  return index;
}

function findMarkdownImageTitleEnd(text: string, start: number): number {
  const delimiter = text[start];
  if (delimiter === '"' || delimiter === "'") {
    for (let index = start + 1; index < text.length; index++) {
      if (text[index] === "\\") {
        index++;
        continue;
      }
      if (text[index] === delimiter) {
        return index + 1;
      }
    }
    return -1;
  }

  if (delimiter !== "(") {
    return -1;
  }

  let depth = 0;
  for (let index = start; index < text.length; index++) {
    const char = text[index];
    if (char === "\\") {
      index++;
      continue;
    }
    if (char === "(") {
      depth++;
      continue;
    }
    if (char === ")") {
      depth--;
      if (depth === 0) {
        return index + 1;
      }
    }
  }

  return -1;
}

function appendMarkdownImageUrlSuffix(text: string, apply: (url: string) => string): string {
  let result = "";
  let cursor = 0;

  while (cursor < text.length) {
    const imageStart = text.indexOf("![", cursor);
    if (imageStart === -1) {
      result += text.slice(cursor);
      break;
    }

    const urlStart = text.indexOf("](", imageStart + 2);
    if (urlStart === -1) {
      result += text.slice(cursor);
      break;
    }

    const urlContentStart = urlStart + 2;
    if (!text.startsWith("http://", urlContentStart) && !text.startsWith("https://", urlContentStart)) {
      result += text.slice(cursor, urlContentStart);
      cursor = urlContentStart;
      continue;
    }

    const urlContentEnd = findMarkdownImageUrlEnd(text, urlContentStart);
    if (urlContentEnd === undefined) {
      result += text.slice(cursor, urlContentStart);
      cursor = urlContentStart;
      continue;
    }

    result += text.slice(cursor, urlContentStart);
    result += apply(text.slice(urlContentStart, urlContentEnd));
    cursor = urlContentEnd;
  }

  return result;
}

/**
 * Append a query suffix to every external image URL in a markdown string.
 *
 * Handles both markdown images (`![alt](https://…)`) and HTML `<img src="https://…">` tags.
 * When the source URL already contains a query string and the suffix starts with `?`,
 * the suffix is joined with `&` so the resulting URL stays well-formed.
 *
 * If `allowedHostSuffixes` is provided, the suffix is only appended to URLs whose host
 * exactly matches or is a subdomain of one of the listed suffixes — guards against
 * leaking auth tokens to third-party hosts that happen to be embedded in descriptions.
 */
export function appendImageUrlSuffix(
  text: string,
  suffix: string,
  options?: { allowedHostSuffixes?: string[] }
): string {
  if (!text || !suffix) {
    return text;
  }
  const allowed = options?.allowedHostSuffixes;
  const apply = (url: string): string => {
    if (allowed && !hostMatches(url, allowed)) {
      return url;
    }
    return mergeQuery(url, suffix);
  };
  return appendMarkdownImageUrlSuffix(text, apply).replace(
    IMAGE_TAG_REGEX,
    (_match, pre: string, url: string, post: string) => `${pre}${apply(url)}${post}`
  );
}
