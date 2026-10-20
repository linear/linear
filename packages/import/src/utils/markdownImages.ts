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
// Lines that end a paragraph, after which a link reference definition can start: ATX headings and code fences
const PARAGRAPH_END_REGEX = /^(?:#{1,6}(?:[ \t]|$)|`{3,}|~{3,})/;

export interface Image {
  /** Index of the first character of the image in the text. */
  start: number;
  /** Index after the last character of the image in the text. */
  end: number;
  /** URL of the source image. */
  url: string;
  /** Renders the image pointing to the uploaded URL. */
  render: (uploadedUrl: string) => string;
  /**
   * Renders a link to the source image, which doesn't load it, for images that fail to upload. Image tags don't have
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

/** Finds the `]` closing the link label starting at `start`, which has at most 999 characters and no unescaped brackets. */
function findLinkLabelEnd(text: string, start: number): number | undefined {
  for (let index = start + 1; index < text.length && index - start <= 1000; index++) {
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

/** Normalizes a link label so that references match definitions regardless of case and whitespace. */
function normalizeLabel(label: string): string {
  // Lowercasing then uppercasing approximates Unicode case folding, as the CommonMark reference implementation does
  return label
    .replace(/[ \t\r\n]+/g, " ")
    .trim()
    .toLowerCase()
    .toUpperCase();
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
 * @returns The definition, with its normalized label and the index of the end of its last line
 */
function parseDefinition(
  text: string,
  start: number,
  parentheses: Map<number, number>
): (Definition & { label: string; end: number }) | undefined {
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
  const titleLineEnd = titleEnd === undefined ? undefined : findBlankLineEnd(text, titleEnd);
  if (titleEnd !== undefined && titleLineEnd !== undefined) {
    return { label, url, title: text.slice(titleStart, titleEnd), end: titleLineEnd };
  }

  // Without a title, the URL ends its line
  const lineEnd = findBlankLineEnd(text, destinationEnd);
  return lineEnd === undefined ? undefined : { label, url, end: lineEnd };
}

/**
 * Finds the link reference definitions, by normalized label.
 *
 * Definitions can't interrupt a paragraph, so they start the text, a list item or a blockquote, or follow a blank line,
 * a heading, a code fence or another definition.
 */
function findDefinitions(
  text: string,
  isLiteral: (index: number) => boolean,
  parentheses: Map<number, number>
): Map<string, Definition> {
  const definitions = new Map<string, Definition>();
  let canStart = true;
  let previousQuoteDepth = 0;
  for (let lineStart = 0; lineStart < text.length;) {
    CONTAINER_PREFIX_REGEX.lastIndex = lineStart;
    const prefix = CONTAINER_PREFIX_REGEX.exec(text)?.[0] ?? "";
    const contentStart = lineStart + prefix.length;
    const quoteDepth = prefix.split(">").length - 1;

    // A list item or a blockquote can interrupt a paragraph. The prefix has a list marker if it has anything other than
    // whitespace and blockquote markers.
    const startsBlock = canStart || /[^ \t>]/.test(prefix) || quoteDepth > previousQuoteDepth;
    previousQuoteDepth = quoteDepth;
    const definition =
      startsBlock && text[contentStart] === "[" && !isLiteral(contentStart)
        ? parseDefinition(text, contentStart, parentheses)
        : undefined;
    if (definition) {
      // The first definition of a label is the one that applies
      if (!definitions.has(definition.label)) {
        definitions.set(definition.label, { url: definition.url, title: definition.title });
      }
      canStart = true;
      lineStart = definition.end + 1;
      continue;
    }

    const newline = text.indexOf("\n", contentStart);
    const lineEnd = newline === -1 ? text.length : newline;
    const content = text.slice(contentStart, lineEnd).trim();
    canStart = !content || PARAGRAPH_END_REGEX.test(content);
    lineStart = lineEnd + 1;
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
  if (!destination || !/^https?:\/\//.test(destination.url)) {
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
    // Whitespace ends a URL, so parentheses in a URL can't be matched across it
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
    if (url && /^https?:\/\//.test(url)) {
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
