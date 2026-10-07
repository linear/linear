/* eslint-disable no-console */
import { LinearClient } from "@linear/sdk";

// Character references decoded in URLs: numeric ones, and the named ones for the characters that HTML escapes
const HTML_URL_ESCAPE_REGEX = /&(?:#\d{1,7}|#[xX][\da-fA-F]{1,6}|amp|lt|gt|quot|apos);/g;
// Markdown URLs can also escape ASCII punctuation with a backslash
const MARKDOWN_URL_ESCAPE_REGEX = /\\[!-/:-@[-`{-~]|&(?:#\d{1,7}|#[xX][\da-fA-F]{1,6}|amp|lt|gt|quot|apos);/g;

const NAMED_CHARACTER_REFERENCES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

const TITLE_CLOSING_DELIMITERS: Record<string, string | undefined> = { '"': '"', "'": "'", "(": ")" };

interface Image {
  /** Index of the first character of the image in the text. */
  start: number;
  /** Index after the last character of the image in the text. */
  end: number;
  /** URL of the source image. */
  url: string;
  /** Renders the image pointing to the uploaded URL. */
  render: (uploadedUrl: string) => string;
}

/** Indexes of the closing delimiter matching each opening delimiter, by index of the opening delimiter. */
interface Delimiters {
  brackets: Map<number, number>;
  parentheses: Map<number, number>;
}

/**
 * Replace markdown image URLs with Linear uploaded ones.
 *
 * Also supports image tags used by GitHub. Images inside code spans and code blocks, and escaped
 * image markers, don't render as images so they are left as-is. So are images that fail to upload.
 *
 * @param client Linear API client.
 * @param text Markdown content.
 * @param authenticateUrl Maps each image URL to the URL to download it from, such as to perform authentication
 * @returns Markdown content with images using the new Linear URLs
 */
export const replaceImagesInMarkdown = async (
  client: LinearClient,
  text: string,
  authenticateUrl?: (url: string) => string
): Promise<string> => {
  const images = findImages(text);
  const uploadedUrls = await Promise.all(images.map(image => replaceImageUrl(client, image.url, authenticateUrl)));

  let result = "";
  let cursor = 0;
  images.forEach((image, index) => {
    const uploadedUrl = uploadedUrls[index];
    if (uploadedUrl) {
      result += text.slice(cursor, image.start) + image.render(uploadedUrl);
      cursor = image.end;
    }
  });
  return result + text.slice(cursor);
};

/**
 * Downloads image and upload it to Linear
 *
 * @param client Linear API client
 * @param url URL of the source image
 * @param authenticateUrl Maps the source URL to the URL to download it from
 * @returns URL of the uploaded image, or undefined if the upload failed
 */
const replaceImageUrl = async (
  client: LinearClient,
  url: string,
  authenticateUrl?: (url: string) => string
): Promise<string | undefined> => {
  try {
    const res = await client.imageUploadFromUrl(authenticateUrl ? authenticateUrl(url) : url);
    if (res?.success === true && res.url) {
      return res.url;
    }
  } catch (err) {
    console.error(`Failed to replace image`, err.message);
  }

  // Never return the authenticated URL, so that credentials don't end up in issue content
  return undefined;
};

/**
 * Finds the images that render in the text, in order of appearance.
 *
 * Every scan is linear in the length of the text, so that malformed images can't make the import hang.
 */
function findImages(text: string): Image[] {
  const codeRanges = findCodeRanges(text);
  const isLiteral = (index: number) => isBackslashEscaped(text, index) || inRanges(index, codeRanges);

  const candidates = [...findMarkdownImages(text, isLiteral), ...findImageTags(text, isLiteral)].sort(
    (a, b) => a.start - b.start
  );

  // Drop images nested in another one, such as an image tag in a markdown image's alt text
  const images: Image[] = [];
  for (const image of candidates) {
    if (image.start >= (images.at(-1)?.end ?? 0)) {
      images.push(image);
    }
  }
  return images;
}

function findImageTags(text: string, isLiteral: (index: number) => boolean): Image[] {
  const images: Image[] = [];
  let start = text.indexOf("<img");
  while (start !== -1) {
    if (isLiteral(start) || !/\s/.test(text.charAt(start + "<img".length))) {
      start = text.indexOf("<img", start + 1);
      continue;
    }

    const tag = parseImageTag(text, start);
    if (!tag) {
      // The tag is never closed, so the rest of the text is inside it
      break;
    }

    const url = tag.src === undefined ? undefined : decodeUrl(tag.src, HTML_URL_ESCAPE_REGEX);
    if (url && /^https?:\/\//.test(url)) {
      images.push({ start, end: tag.end, url, render: uploadedUrl => `![](${uploadedUrl})` });
    }

    // An `<img` inside the tag's attributes isn't a tag
    start = text.indexOf("<img", tag.end);
  }
  return images;
}

/** Parses the attributes of the `<img>` tag starting at `start`, or returns undefined if the tag isn't closed. */
function parseImageTag(text: string, start: number): { end: number; src?: string } | undefined {
  let src: string | undefined;
  let index = start + "<img".length;
  while (index < text.length) {
    index = skipWhitespace(text, index);
    if (text[index] === ">") {
      return { end: index + 1, src };
    }

    const nameStart = index;
    while (index < text.length && !/[\s=>]/.test(text[index])) {
      index++;
    }
    const name = text.slice(nameStart, index);

    index = skipWhitespace(text, index);
    if (text[index] !== "=") {
      continue;
    }

    let value: string;
    index = skipWhitespace(text, index + 1);
    const quote = text[index];
    if (quote === '"' || quote === "'") {
      const valueEnd = text.indexOf(quote, index + 1);
      if (valueEnd === -1) {
        return undefined;
      }
      value = text.slice(index + 1, valueEnd);
      index = valueEnd + 1;
    } else {
      const valueStart = index;
      while (index < text.length && !/[\s>]/.test(text[index])) {
        index++;
      }
      value = text.slice(valueStart, index);
    }

    // Browsers use the first of duplicate attributes
    if (name === "src" && src === undefined) {
      src = value;
    }
  }
  return undefined;
}

function findMarkdownImages(text: string, isLiteral: (index: number) => boolean): Image[] {
  const delimiters: Delimiters = {
    brackets: matchDelimiters(text, "[", "]", false),
    // Whitespace ends a URL, so parentheses in a URL can't be matched across it
    parentheses: matchDelimiters(text, "(", ")", true),
  };

  const images: Image[] = [];
  for (let start = text.indexOf("!["); start !== -1; start = text.indexOf("![", start + 1)) {
    const image = isLiteral(start) ? undefined : parseMarkdownImage(text, start, delimiters);
    if (image) {
      images.push(image);
    }
  }
  return images;
}

/** Parses a markdown image `![alt](url "title")` or `![alt](<url> "title")` starting at `start`. */
function parseMarkdownImage(text: string, start: number, delimiters: Delimiters): Image | undefined {
  const altEnd = delimiters.brackets.get(start + 1);
  if (altEnd === undefined || text[altEnd + 1] !== "(") {
    return undefined;
  }

  const destinationStart = skipWhitespace(text, altEnd + 2);
  const bracketed = text[destinationStart] === "<";
  const urlStart = bracketed ? destinationStart + 1 : destinationStart;
  if (!text.startsWith("http://", urlStart) && !text.startsWith("https://", urlStart)) {
    return undefined;
  }

  const urlEnd = bracketed
    ? findBracketedUrlEnd(text, urlStart)
    : findMarkdownImageUrlEnd(text, urlStart, delimiters.parentheses);
  const end = urlEnd === undefined ? undefined : findMarkdownImageEnd(text, bracketed ? urlEnd + 1 : urlEnd);
  if (urlEnd === undefined || end === undefined) {
    return undefined;
  }

  // Only replace the URL, to keep the alt text and title, and to keep images inside tables and lists
  return {
    start,
    end,
    url: decodeUrl(text.slice(urlStart, urlEnd), MARKDOWN_URL_ESCAPE_REGEX),
    render: uploadedUrl => `${text.slice(start, urlStart)}${uploadedUrl}${text.slice(urlEnd, end)}`,
  };
}

/** Decodes the escapes matched by `escapeRegex` in a URL, as markdown and HTML renderers do. */
function decodeUrl(url: string, escapeRegex: RegExp): string {
  return url.replace(escapeRegex, escape => {
    if (escape.startsWith("\\")) {
      return escape.slice(1);
    }

    const name = escape.slice(1, -1);
    if (!name.startsWith("#")) {
      return NAMED_CHARACTER_REFERENCES[name];
    }

    const codePoint = /^#[xX]/.test(name) ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
    const isValid = codePoint !== 0 && codePoint <= 0x10ffff && (codePoint < 0xd800 || codePoint > 0xdfff);
    return isValid ? String.fromCodePoint(codePoint) : "�";
  });
}

function isBackslashEscaped(text: string, index: number): boolean {
  let count = 0;
  for (let i = index - 1; i >= 0 && text[i] === "\\"; i--) {
    count++;
  }
  return count % 2 === 1;
}

/** Finds the ranges of code blocks and code spans, sorted and without overlaps. */
function findCodeRanges(text: string): [number, number][] {
  const fences: [number, number][] = [];

  // Fenced code blocks: 3+ backticks or tildes at line start (0-3 spaces of indent).
  // Unclosed fences extend to end of input.
  const fence = /(?:^|\n)[ \t]{0,3}(`{3,}|~{3,})[^\n]*(?:\n[\s\S]*?(?:\n[ \t]{0,3}\1[ \t]*(?=\n|$)|$)|$)/g;
  let m: RegExpExecArray | null;
  while ((m = fence.exec(text)) !== null) {
    const start = m[0].startsWith("\n") ? m.index + 1 : m.index;
    fences.push([start, m.index + m[0].length]);
  }

  // Inline code spans: matching runs of backticks on the same line. Spans don't start inside a run of backticks,
  // which would try each shorter run.
  const spans: [number, number][] = [];
  const inline = /(?<!`)`+[^`\n]+?`+/g;
  while ((m = inline.exec(text)) !== null) {
    const idx = m.index;
    if (inRanges(idx, fences)) {
      continue;
    }
    spans.push([idx, idx + m[0].length]);
  }

  // Spans are on a single line, so they can't overlap fences, which start at the beginning of a line
  return [...fences, ...spans].sort((a, b) => a[0] - b[0]);
}

/** Whether the index is in one of the ranges, which must be sorted and not overlap. */
function inRanges(index: number, ranges: [number, number][]): boolean {
  let low = 0;
  let high = ranges.length - 1;
  while (low <= high) {
    const middle = (low + high) >> 1;
    const [start, end] = ranges[middle];
    if (index < start) {
      high = middle - 1;
    } else if (index >= end) {
      low = middle + 1;
    } else {
      return true;
    }
  }
  return false;
}

/**
 * Matches unescaped delimiters, such as brackets, in a single pass over the text. Parsing images with it avoids
 * scanning the rest of the text again for each unclosed delimiter.
 *
 * @param breakOnWhitespace Whether whitespace leaves the delimiters opened before it unmatched
 * @returns Index of the closing delimiter matching each opening delimiter, by index of the opening delimiter
 */
function matchDelimiters(text: string, open: string, close: string, breakOnWhitespace: boolean): Map<number, number> {
  const matches = new Map<number, number>();
  const openIndexes: number[] = [];
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (char === "\\") {
      index++;
      continue;
    }
    if (char === open) {
      openIndexes.push(index);
      continue;
    }
    if (char === close) {
      const openIndex = openIndexes.pop();
      if (openIndex !== undefined) {
        matches.set(openIndex, index);
      }
      continue;
    }
    if (breakOnWhitespace && /\s/.test(char)) {
      openIndexes.length = 0;
    }
  }
  return matches;
}

/** Finds the end of an image URL, which may contain balanced parentheses but no whitespace. */
function findMarkdownImageUrlEnd(text: string, start: number, parentheses: Map<number, number>): number | undefined {
  for (let index = start; index < text.length; index++) {
    const char = text[index];
    if (char === "\\") {
      index++;
      continue;
    }
    if (char === "(") {
      const closeIndex = parentheses.get(index);
      if (closeIndex === undefined) {
        return undefined;
      }
      index = closeIndex;
      continue;
    }
    if (char === ")" || /\s/.test(char)) {
      return index;
    }
  }
  return undefined;
}

/** Finds the `>` closing an image URL in angle brackets, which can't contain line breaks or unescaped `<`. */
function findBracketedUrlEnd(text: string, start: number): number | undefined {
  for (let index = start; index < text.length; index++) {
    const char = text[index];
    if (char === "\\") {
      index++;
      continue;
    }
    if (char === ">") {
      return index;
    }
    if (char === "<" || char === "\n") {
      return undefined;
    }
  }
  return undefined;
}

/** Finds the index after the `)` closing an image, skipping its optional title. */
function findMarkdownImageEnd(text: string, destinationEnd: number): number | undefined {
  let index = skipWhitespace(text, destinationEnd);

  if (text[index] !== ")") {
    const titleEnd = findMarkdownImageTitleEnd(text, index);
    if (titleEnd === undefined) {
      return undefined;
    }
    index = skipWhitespace(text, titleEnd);
  }

  return text[index] === ")" ? index + 1 : undefined;
}

function skipWhitespace(text: string, start: number): number {
  let index = start;
  while (index < text.length && /\s/.test(text[index])) {
    index++;
  }
  return index;
}

/** Finds the index after an image title in quotes or parentheses. */
function findMarkdownImageTitleEnd(text: string, start: number): number | undefined {
  const closingDelimiter = TITLE_CLOSING_DELIMITERS[text[start]];
  if (closingDelimiter === undefined) {
    return undefined;
  }

  for (let index = start + 1; index < text.length; index++) {
    const char = text[index];
    if (char === "\\") {
      index++;
      continue;
    }
    if (char === closingDelimiter) {
      return index + 1;
    }
    // Titles in parentheses can't contain unescaped parentheses
    if (char === "(" && closingDelimiter === ")") {
      return undefined;
    }
  }
  return undefined;
}
