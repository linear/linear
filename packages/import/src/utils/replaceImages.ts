/* eslint-disable no-console */
import { LinearClient } from "@linear/sdk";
import { findImages } from "./markdownImages.ts";

/**
 * Replace markdown image URLs with Linear uploaded ones.
 *
 * Also supports reference images such as `![alt][label]`, which become inline images, and image tags
 * used by GitHub. Images inside code spans and code blocks, and escaped image markers, don't render
 * as images so they are left as-is. Markdown images that fail to upload become links to the source
 * image, so that viewing the content doesn't load it from the source. Image tags that fail to upload
 * are left as-is, since Linear shows HTML as text.
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
    const replacement = uploadedUrl ? image.render(uploadedUrl) : image.renderLink?.();
    if (replacement !== undefined) {
      result += text.slice(cursor, image.start) + replacement;
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
