/* eslint-disable no-console */
import { LinearClient } from "@linear/sdk";

const IMAGE_TAG_REGEX = /<img\s(?:[^>]*?\s)?src="(https?:\/\/[^"]+)"[^>]*>/g;

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

/** Finds the images that render in the text, in order of appearance. */
function findImages(text: string): Image[] {
  const codeRanges = findCodeRanges(text);
  const isLiteral = (index: number) => isBackslashEscaped(text, index) || inCodeRange(index, codeRanges);

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
  return Array.from(text.matchAll(IMAGE_TAG_REGEX))
    .filter(match => !isLiteral(match.index))
    .map(match => ({
      start: match.index,
      end: match.index + match[0].length,
      url: match[1],
      render: uploadedUrl => `![](${uploadedUrl})`,
    }));
}

function findMarkdownImages(text: string, isLiteral: (index: number) => boolean): Image[] {
  const images: Image[] = [];
  for (let start = text.indexOf("!["); start !== -1; start = text.indexOf("![", start + 1)) {
    const image = isLiteral(start) ? undefined : parseMarkdownImage(text, start);
    if (image) {
      images.push(image);
    }
  }
  return images;
}

/** Parses a markdown image `![alt](url "title")` starting at `start`. */
function parseMarkdownImage(text: string, start: number): Image | undefined {
  const altEnd = findAltTextEnd(text, start + 2);
  if (altEnd === undefined || text[altEnd + 1] !== "(") {
    return undefined;
  }

  const urlStart = skipWhitespace(text, altEnd + 2);
  if (!text.startsWith("http://", urlStart) && !text.startsWith("https://", urlStart)) {
    return undefined;
  }

  const urlEnd = findMarkdownImageUrlEnd(text, urlStart);
  const end = urlEnd === undefined ? undefined : findMarkdownImageEnd(text, urlEnd);
  if (urlEnd === undefined || end === undefined) {
    return undefined;
  }

  // Put images on their own line, and only replace the URL to keep the alt text and title
  return {
    start,
    end,
    url: text.slice(urlStart, urlEnd),
    render: uploadedUrl => `\n${text.slice(start, urlStart)}${uploadedUrl}${text.slice(urlEnd, end)}\n`,
  };
}

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

/** Finds the `]` closing an image's alt text, skipping escaped and nested brackets. */
function findAltTextEnd(text: string, start: number): number | undefined {
  let depth = 0;
  for (let index = start; index < text.length; index++) {
    const char = text[index];
    if (char === "\\") {
      index++;
      continue;
    }
    if (char === "[") {
      depth++;
      continue;
    }
    if (char === "]") {
      if (depth === 0) {
        return index;
      }
      depth--;
    }
  }
  return undefined;
}

/** Finds the end of an image URL, which may contain balanced parentheses. */
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
      return index;
    }
  }
  return undefined;
}

/** Finds the index after the `)` closing an image, skipping its optional title. */
function findMarkdownImageEnd(text: string, urlEnd: number): number | undefined {
  let index = skipWhitespace(text, urlEnd);

  if (text[index] !== ")") {
    const titleEnd = findMarkdownImageTitleEnd(text, index);
    if (titleEnd === -1) {
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
