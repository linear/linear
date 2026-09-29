---
"@linear/import": patch
---

fix(import): upload Shortcut CSV images from the CLI again, and only send the Shortcut API token to https Shortcut hosts. Images are only replaced when the upload reports success and returns a URL. Failed uploads leave the original text unchanged, including when an unsuccessful response contains a URL. When uploading images, all importers now upload every image instead of only the first one, support image URLs with parentheses, angle brackets or a title, decode escaped characters in image URLs before downloading them, and leave images in code spans, code blocks and escaped image markers untouched. Uploaded images now keep their place in the text instead of moving to their own line, so images in tables and lists stay in them. Malformed images and image tags no longer make the import hang.
