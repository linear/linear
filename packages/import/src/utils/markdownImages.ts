// Character references decoded in URLs: numeric ones, and the named ones for the characters that HTML escapes
const HTML_URL_ESCAPE_REGEX = /&(?:#\d{1,7}|#[xX][\da-fA-F]{1,6}|amp|lt|gt|quot|apos);/g;
// Markdown can also escape ASCII punctuation with a backslash
const MARKDOWN_ESCAPE_REGEX = /\\[!-/:-@[-`{-~]|&(?:#\d{1,7}|#[xX][\da-fA-F]{1,6}|amp|lt|gt|quot|apos);/g;
const ASCII_PUNCTUATION_REGEX = /[!-/:-@[-`{-~]/g;

const NAMED_CHARACTER_REFERENCES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

const TITLE_CLOSING_DELIMITERS: Record<string, string | undefined> = { '"': '"', "'": "'", "(": ")" };

// Blockquote and list item markers at the start of a line, and the indentation around them
const CONTAINER_PREFIX_REGEX = /(?:[ \t]*(?:>|(?:[-+*]|\d{1,9}[.)])(?=[ \t])))*[ \t]*/y;
// Whitespace separating the parts of a link reference definition, which can include one line ending
const DEFINITION_WHITESPACE_REGEX = /[ \t]*(?:\r?\n[ \t]*)?/y;
// Whitespace until the end of the line
const BLANK_LINE_END_REGEX = /[ \t\r]*(?=\n|$)/y;

export interface Image {
  /** Index of the first character of the image in the text. */
  start: number;
  /** Index after the last character of the image in the text. */
  end: number;
  /** URL of the source image, which may be relative or use any scheme. */
  url: string;
  /** Renders the image pointing to the uploaded URL. */
  render: (uploadedUrl: string) => string;
  /**
   * Renders a link to the source image, which doesn't load it, for images that aren't uploaded. Image tags don't have
   * one, since Linear doesn't render HTML and shows them as text.
   */
  renderLink?: () => string;
}

/** Indexes of the closing delimiter matching each opening delimiter, by index of the opening delimiter. */
interface Delimiters {
  brackets: Map<number, number>;
  parentheses: Map<number, number>;
}

/** A link reference definition `[label]: url "title"`, which reference images can use. */
interface Definition {
  url: string;
  /** Title in quotes or parentheses, as written. */
  title?: string;
}

/** The part of a markdown image after its alt text, which gives the URL of the image. */
interface Destination {
  /** Index after the last character of the image in the text. */
  end: number;
  /** URL of the source image. */
  url: string;
  /** Renders the part after the alt text pointing to the uploaded URL. */
  render: (uploadedUrl: string) => string;
  /** The part after the text of a link to the source image. */
  link: string;
}

function isBackslashEscaped(text: string, index: number): boolean {
  let count = 0;
  for (let i = index - 1; i >= 0 && text[i] === "\\"; i--) {
    count++;
  }
  return count % 2 === 1;
}

/**
 * Whether the character ends a URL. Spaces and control characters do, but as in Linear's markdown parser, other
 * whitespace such as non-breaking spaces doesn't.
 */
function isUrlEnd(char: string): boolean {
  return char <= " " || char === "\x7f";
}

/** Finds the ranges of code blocks and code spans, sorted and without overlaps. */
function findCodeRanges(text: string): [number, number][] {
  const fences: [number, number][] = [];

  // Fenced code blocks: 3+ backticks or tildes at line start (0-3 spaces of indent), closed by at least as many of the
  // same character. Backtick fences can't have backticks in their info string. Unclosed fences extend to end of input.
  const fence =
    /(?:^|\n) {0,3}(?:(`{3,})[^`\n]*(?=\n|$)(?:(?:\n[^\n]*)*?\n {0,3}\1`*[ \t]*(?=\n|$)|[\s\S]*)|(~{3,})[^\n]*(?:(?:\n[^\n]*)*?\n {0,3}\2~*[ \t]*(?=\n|$)|[\s\S]*))/g;
  let m: RegExpExecArray | null;
  while ((m = fence.exec(text)) !== null) {
    const start = m[0].startsWith("\n") ? m.index + 1 : m.index;
    fences.push([start, m.index + m[0].length]);
  }

  // Inline code spans: runs of backticks closed by a run of the same length on the same line. Spans don't start inside
  // a run of backticks, which would try each shorter run, or after a backslash, which may escape the backtick.
  const spans: [number, number][] = [];
  const inline = /(?<![`\\])(`+)[^`\n]+?\1(?!`)/g;
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
 * @param breakAtUrlEnd Whether characters that end URLs leave the delimiters opened before them unmatched
 * @returns Index of the closing delimiter matching each opening delimiter, by index of the opening delimiter
 */
function matchDelimiters(text: string, open: string, close: string, breakAtUrlEnd: boolean): Map<number, number> {
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
    if (breakAtUrlEnd && isUrlEnd(char)) {
      openIndexes.length = 0;
    }
  }
  return matches;
}

/** Finds the end of an image URL, which may contain balanced parentheses but no spaces or control characters. */
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
    if (char === ")" || isUrlEnd(char)) {
      return index;
    }
  }
  return text.length;
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

/** Decodes the escapes matched by `escapeRegex`, as markdown and HTML renderers do. */
function decodeEscapes(text: string, escapeRegex: RegExp): string {
  return text.replace(escapeRegex, escape => {
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

/**
 * Finds the `]` closing the link label starting at `start`, which can't contain unescaped brackets. Unlike CommonMark,
 * Linear's markdown parser doesn't limit the length of labels.
 */
function findLinkLabelEnd(text: string, start: number): number | undefined {
  for (let index = start + 1; index < text.length; index++) {
    const char = text[index];
    if (char === "\\") {
      index++;
      continue;
    }
    if (char === "]") {
      return index;
    }
    if (char === "[") {
      return undefined;
    }
  }
  return undefined;
}

/**
 * Normalizes a link label so that references match definitions regardless of case and whitespace, including Unicode
 * whitespace such as non-breaking spaces, as Linear's markdown parser does.
 */
function normalizeLabel(label: string): string {
  // Lowercasing then uppercasing approximates Unicode case folding
  return label.trim().replace(/\s+/g, " ").toLowerCase().toUpperCase();
}

function skipDefinitionWhitespace(text: string, start: number): number {
  DEFINITION_WHITESPACE_REGEX.lastIndex = start;
  DEFINITION_WHITESPACE_REGEX.test(text);
  return DEFINITION_WHITESPACE_REGEX.lastIndex;
}

/** Finds the end of the line if only whitespace follows `start` on it. */
function findBlankLineEnd(text: string, start: number): number | undefined {
  BLANK_LINE_END_REGEX.lastIndex = start;
  return BLANK_LINE_END_REGEX.test(text) ? BLANK_LINE_END_REGEX.lastIndex : undefined;
}

/**
 * Parses a link reference definition `[label]: url "title"` or `[label]: <url> "title"` starting at `start`.
 *
 * @returns The definition, with its normalized label
 */
function parseDefinition(
  text: string,
  start: number,
  parentheses: Map<number, number>
): (Definition & { label: string }) | undefined {
  const labelEnd = findLinkLabelEnd(text, start);
  if (labelEnd === undefined || text[labelEnd + 1] !== ":") {
    return undefined;
  }
  const label = normalizeLabel(text.slice(start + 1, labelEnd));
  if (!label) {
    return undefined;
  }

  const destinationStart = skipDefinitionWhitespace(text, labelEnd + 2);
  const bracketed = text[destinationStart] === "<";
  const urlStart = bracketed ? destinationStart + 1 : destinationStart;
  const urlEnd = bracketed ? findBracketedUrlEnd(text, urlStart) : findMarkdownImageUrlEnd(text, urlStart, parentheses);
  if (urlEnd === undefined || (!bracketed && urlEnd === urlStart)) {
    return undefined;
  }
  const destinationEnd = bracketed ? urlEnd + 1 : urlEnd;
  const url = decodeEscapes(text.slice(urlStart, urlEnd), MARKDOWN_ESCAPE_REGEX);

  // A title is separated from the URL by whitespace, and ends its line
  const titleStart = skipDefinitionWhitespace(text, destinationEnd);
  const titleEnd = titleStart > destinationEnd ? findMarkdownImageTitleEnd(text, titleStart) : undefined;
  if (titleEnd !== undefined && findBlankLineEnd(text, titleEnd) !== undefined) {
    return { label, url, title: text.slice(titleStart, titleEnd) };
  }

  // Without a title, the URL ends its line
  return findBlankLineEnd(text, destinationEnd) === undefined ? undefined : { label, url };
}

/**
 * Finds the link reference definitions, by normalized label.
 *
 * This finds definitions at the start of every line outside code, including lines that markdown doesn't treat as
 * definitions, such as those continuing a paragraph or inside another definition. Images that use them are then
 * uploaded or turned into links even if they don't render, which is harmless, while a missed definition would leave an
 * image loading from the source host.
 */
function findDefinitions(
  text: string,
  isLiteral: (index: number) => boolean,
  parentheses: Map<number, number>
): Map<string, Definition> {
  const definitions = new Map<string, Definition>();
  for (let lineStart = 0; lineStart < text.length;) {
    CONTAINER_PREFIX_REGEX.lastIndex = lineStart;
    const contentStart = lineStart + (CONTAINER_PREFIX_REGEX.exec(text)?.[0].length ?? 0);
    const definition =
      text[contentStart] === "[" && !isLiteral(contentStart)
        ? parseDefinition(text, contentStart, parentheses)
        : undefined;
    // The first definition of a label is the one that applies
    if (definition && !definitions.has(definition.label)) {
      definitions.set(definition.label, { url: definition.url, title: definition.title });
    }

    const newline = text.indexOf("\n", contentStart);
    lineStart = newline === -1 ? text.length : newline + 1;
  }
  return definitions;
}

/** Parses the `(url "title")` or `(<url> "title")` after the alt text of an image ending at `altEnd`. */
function parseInlineDestination(
  text: string,
  altEnd: number,
  parentheses: Map<number, number>
): Destination | undefined {
  if (text[altEnd + 1] !== "(") {
    return undefined;
  }

  const destinationStart = skipWhitespace(text, altEnd + 2);
  const bracketed = text[destinationStart] === "<";
  const urlStart = bracketed ? destinationStart + 1 : destinationStart;
  const urlEnd = bracketed ? findBracketedUrlEnd(text, urlStart) : findMarkdownImageUrlEnd(text, urlStart, parentheses);
  const end = urlEnd === undefined ? undefined : findMarkdownImageEnd(text, bracketed ? urlEnd + 1 : urlEnd);
  if (urlEnd === undefined || end === undefined) {
    return undefined;
  }

  // Only replace the URL, to keep the title
  return {
    end,
    url: decodeEscapes(text.slice(urlStart, urlEnd), MARKDOWN_ESCAPE_REGEX),
    render: uploadedUrl => `${text.slice(altEnd + 1, urlStart)}${uploadedUrl}${text.slice(urlEnd, end)}`,
    link: text.slice(altEnd + 1, end),
  };
}

/**
 * Parses the reference after the alt text of an image starting at `start` and ending at `altEnd`: a label `[label]`,
 * or `[]` or nothing to use the alt text as the label.
 */
function parseReference(
  text: string,
  start: number,
  altEnd: number,
  definitions: Map<string, Definition>
): Destination | undefined {
  const labelEnd = text[altEnd + 1] === "[" ? findLinkLabelEnd(text, altEnd + 1) : undefined;
  const hasLabel = labelEnd !== undefined && labelEnd > altEnd + 2;
  // The alt text can only be used as a label if it is a valid label, without brackets
  if (!hasLabel && findLinkLabelEnd(text, start + 1) !== altEnd) {
    return undefined;
  }

  const label = hasLabel ? text.slice(altEnd + 2, labelEnd) : text.slice(start + 2, altEnd);
  const definition = definitions.get(normalizeLabel(label));
  if (!definition) {
    return undefined;
  }

  // The uploaded image is inline, since the definition may be used by links too
  return {
    end: (labelEnd ?? altEnd) + 1,
    url: definition.url,
    render: uploadedUrl => `(${uploadedUrl}${definition.title ? ` ${definition.title}` : ""})`,
    link: `[${label}]`,
  };
}

/**
 * Parses a markdown image starting at `start`: an inline image `![alt](url "title")`, or a reference image
 * `![alt][label]`, `![alt][]` or `![alt]` using a definition `[label]: url "title"`.
 */
function parseMarkdownImage(
  text: string,
  start: number,
  delimiters: Delimiters,
  definitions: Map<string, Definition>
): Image | undefined {
  const altEnd = delimiters.brackets.get(start + 1);
  if (altEnd === undefined) {
    return undefined;
  }

  // An image is a reference when it isn't followed by a valid inline destination
  const destination =
    parseInlineDestination(text, altEnd, delimiters.parentheses) ?? parseReference(text, start, altEnd, definitions);
  if (!destination) {
    return undefined;
  }

  // The image covers a `!` right before it, so that a link replacing it can escape the `!`, which would make it an image
  const isAfterMarker = text[start - 1] === "!" && !isBackslashEscaped(text, start - 1);
  const imageStart = isAfterMarker ? start - 1 : start;

  // Keep the alt text, and keep images inside tables and lists
  return {
    start: imageStart,
    end: destination.end,
    url: destination.url,
    render: uploadedUrl => `${text.slice(imageStart, altEnd + 1)}${destination.render(uploadedUrl)}`,
    renderLink: () => {
      // Decoded here rather than for every image, since the alt texts of nested images overlap. The link text escapes
      // it, so that images and links in it don't render.
      const alt = decodeEscapes(text.slice(start + 2, altEnd), MARKDOWN_ESCAPE_REGEX);
      return `${isAfterMarker ? "\\!" : ""}[${escapeMarkdown(alt.trim() ? alt : destination.url)}]${destination.link}`;
    },
  };
}

/** Escapes every ASCII punctuation character, so that markdown shows the text as is. */
function escapeMarkdown(text: string): string {
  return text.replace(ASCII_PUNCTUATION_REGEX, "\\$&");
}

function findMarkdownImages(text: string, isLiteral: (index: number) => boolean): Image[] {
  const delimiters: Delimiters = {
    brackets: matchDelimiters(text, "[", "]", false),
    // Spaces end a URL, so parentheses in a URL can't be matched across them
    parentheses: matchDelimiters(text, "(", ")", true),
  };
  const definitions = findDefinitions(text, isLiteral, delimiters.parentheses);

  const images: Image[] = [];
  for (let start = text.indexOf("!["); start !== -1; start = text.indexOf("![", start + 1)) {
    const image = isLiteral(start) ? undefined : parseMarkdownImage(text, start, delimiters, definitions);
    if (image) {
      images.push(image);
    }
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

    const url = tag.src === undefined ? undefined : decodeEscapes(tag.src, HTML_URL_ESCAPE_REGEX);
    if (url) {
      images.push({ start, end: tag.end, url, render: uploadedUrl => `![](${uploadedUrl})` });
    }

    // An `<img` inside the tag's attributes isn't a tag
    start = text.indexOf("<img", tag.end);
  }
  return images;
}

/**
 * Finds the images that render in the text, in order of appearance.
 *
 * Every scan is linear in the length of the text, so that malformed images can't make the import hang.
 */
export function findImages(text: string): Image[] {
  const codeRanges = findCodeRanges(text);
  const isLiteral = (index: number) => isBackslashEscaped(text, index) || inRanges(index, codeRanges);

  // Drop markdown images nested in another one, such as in its alt text
  const markdownImages: Image[] = [];
  for (const image of findMarkdownImages(text, isLiteral)) {
    if (image.start >= (markdownImages.at(-1)?.end ?? 0)) {
      markdownImages.push(image);
    }
  }

  // Linear shows image tags as text, so markdown images in their attributes render. Drop the tags that overlap them
  // instead, such as tags in a markdown image's alt text.
  const tags: Image[] = [];
  let next = 0;
  for (const tag of findImageTags(text, isLiteral)) {
    while (next < markdownImages.length && markdownImages[next].end <= tag.start) {
      next++;
    }
    if (next === markdownImages.length || markdownImages[next].start >= tag.end) {
      tags.push(tag);
    }
  }

  return [...markdownImages, ...tags].sort((a, b) => a.start - b.start);
}
