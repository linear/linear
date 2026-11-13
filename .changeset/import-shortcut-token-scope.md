---
"@linear/import": patch
---

fix(import): only send the Shortcut API token to Shortcut attachment URLs on `media.app.shortcut.com`, and never when it is empty. Only use uploaded image URLs on Linear's hosts, so that the URL an image was downloaded from never ends up in imported content, and keep the token out of the logs of failed uploads.
