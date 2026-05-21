const IMAGE_TAG_REGEX = /(<img[^>]*?src=")(https?:\/\/[^"]+)(")/g;

function isBackslashEscaped(text: string, index: number): boolean {
  let count = 0;
  for (let i = index - 1; i >= 0 && text[i] === "\\"; i--) {
    count++;
  }
  return count % 2 === 1;
}

function findCodeRanges(text: string): [number, number][] {
  const ranges: [number, number][] = [];

  // Fenced code blocks: 3+ backticks or tildes at line start (0-3 spaces of indent).
  // Unclosed fences extend to end of input.
  const fence = /(?:^|\n)[ \t]{0,3}(`{3,}|~{3,})[^\n]*(?:\n[\s\S]*?(?:\n[ \t]{0,3}\1[ \t]*(?=\n|$)|$)|$)/g;
  let m: RegExpExecArray | null;
  while ((m = fence.exec(text)) !== null) {
    const start = m[0].startsWith("\n") ? m.index + 1 : m.index;
    ranges.push([start, m.index + m[0].length]);
  }

  // Inline code spans: matching runs of backticks on the same line.
  const inline = /`+[^`\n]+?`+/g;
  while ((m = inline.exec(text)) !== null) {
    const idx = m.index;
    if (ranges.some(([s, e]) => idx >= s && idx < e)) {
      continue;
    }
    ranges.push([idx, idx + m[0].length]);
  }

  return ranges;
}

function inCodeRange(index: number, ranges: [number, number][]): boolean {
  return ranges.some(([s, e]) => index >= s && index < e);
}

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

function appendMarkdownImageUrlSuffix(
  text: string,
  apply: (url: string) => string,
  codeRanges: [number, number][]
): string {
  let result = "";
  let cursor = 0;

  while (cursor < text.length) {
    const imageStart = text.indexOf("![", cursor);
    if (imageStart === -1) {
      result += text.slice(cursor);
      break;
    }

    // Skip escaped markers (\![…]) and markers inside code spans/blocks — they don't render as images.
    if (isBackslashEscaped(text, imageStart) || inCodeRange(imageStart, codeRanges)) {
      result += text.slice(cursor, imageStart + 1);
      cursor = imageStart + 1;
      continue;
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
 * Skips markers that would not render as images, so the suffix is not embedded into
 * literal text the server-side image pipeline won't rewrite away:
 * - Backslash-escaped markdown image markers (`\![…](…)`), respecting `\\` → literal backslash.
 * - URLs inside inline code spans (`` `…` ``) and fenced code blocks (```` ```…``` ````).
 *
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
  const codeRangesInput = findCodeRanges(text);
  const afterMarkdown = appendMarkdownImageUrlSuffix(text, apply, codeRangesInput);
  const codeRangesAfter = findCodeRanges(afterMarkdown);
  return afterMarkdown.replace(IMAGE_TAG_REGEX, (match, pre: string, url: string, post: string, offset: number) => {
    if (isBackslashEscaped(afterMarkdown, offset) || inCodeRange(offset, codeRangesAfter)) {
      return match;
    }
    return `${pre}${apply(url)}${post}`;
  });
}
