/* eslint-disable no-console */
import { LinearClient } from "@linear/sdk";
import { findImages } from "./markdownImages.ts";

const DEFAULT_API_URL = "https://api.linear.app/graphql";
// URLs of uploaded images: a host and a path, without a query or characters that markdown decodes or that end a URL
const UPLOADED_URL_REGEX = /^https?:\/\/[a-z\d.-]+(?::\d+)?(?:\/[\w.~%-]*)*$/i;

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
 * Downloads an image and uploads it to Linear
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
  let downloadUrl = url;
  try {
    downloadUrl = authenticateUrl ? authenticateUrl(url) : url;
    const res = await client.imageUploadFromUrl(downloadUrl);
    // Only URLs on Linear's hosts are used, so that the URL the image was downloaded from can't end up in issue content
    if (res?.success === true && res.url && isUploadedUrl(res.url, client.options?.apiUrl ?? DEFAULT_API_URL)) {
      return res.url;
    }
  } catch (err) {
    // The error may mention the URL the image was downloaded from, with its credentials
    const message = err instanceof Error ? String(err.message) : "Unknown error";
    console.error(`Failed to replace image`, redactCredentials(message, url, downloadUrl));
  }

  // Never return the authenticated URL, so that credentials don't end up in issue content
  return undefined;
};

/**
 * Whether the URL is one of an uploaded image: on a linear.app host, or a host of the API's domain, such as one for
 * development, and in a form that markdown renders as is.
 */
const isUploadedUrl = (url: string, apiUrl: string): boolean => {
  if (!UPLOADED_URL_REGEX.test(url)) {
    return false;
  }

  try {
    const { hostname, protocol } = new URL(url);
    const api = new URL(apiUrl);
    const apiLabels = api.hostname.split(".");
    // The API's host without its first label, unless that would leave a top-level domain or the host is an IP address
    const apiDomain = apiLabels.length > 2 && /[a-z]/i.test(api.hostname) ? apiLabels.slice(1).join(".") : api.hostname;
    return (
      (protocol === "https:" || protocol === api.protocol) &&
      ["linear.app", apiDomain].some(domain => hostname === domain || hostname.endsWith(`.${domain}`))
    );
  } catch {
    return false;
  }
};

/**
 * Replaces in a message what `authenticateUrl` added to the URL to download the image, such as a token: the query
 * parameter values and user info that the source URL doesn't have, or the whole download URL when they can't be found.
 */
const redactCredentials = (message: string, url: string, downloadUrl: string): string => {
  if (downloadUrl === url) {
    return message;
  }

  const credentials = findAddedCredentials(url, downloadUrl);
  return (
    (credentials.length > 0 ? credentials : [downloadUrl])
      // Longest first, so that a credential containing another one is replaced whole
      .sort((first, second) => second.length - first.length)
      // Replaced without a regular expression, which could be too large for long URLs
      .reduce((result, credential) => result.split(credential).join("[redacted]"), message)
  );
};

/** Finds the query parameter values and user info of the download URL that the source URL doesn't have. */
const findAddedCredentials = (url: string, downloadUrl: string): string[] => {
  try {
    const source = new URL(url);
    const download = new URL(downloadUrl);
    // Indexed once, since looking each parameter up in the query would take quadratic time for long queries
    const sourceParameters = new Set([...source.searchParams].map(parameter => JSON.stringify(parameter)));
    const added = [...download.searchParams]
      .filter(parameter => !sourceParameters.has(JSON.stringify(parameter)))
      .map(([, value]) => value);
    for (const part of ["username", "password"] as const) {
      if (download[part] !== source[part]) {
        added.push(download[part]);
      }
    }
    // Without surrounding spaces, which the message keeps, and also percent-encoded, as the message could show them
    const forms = added.map(value => value.trim()).flatMap(value => [value, encodeURIComponent(value)]);
    return [...new Set(forms)].filter(form => form.length > 0);
  } catch {
    return [];
  }
};
