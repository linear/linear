---
"@linear/import": patch
---

fix(import): upload Shortcut CSV images from the CLI again, and only send the Shortcut API token to https Shortcut hosts. Images are only replaced when the upload reports success and returns a URL. Failed uploads leave the original text unchanged, including when an unsuccessful response contains a URL. When uploading images, all importers now upload every image instead of only the first one, support image URLs with parentheses or a title, and leave images in code spans, code blocks and escaped image markers untouched.
