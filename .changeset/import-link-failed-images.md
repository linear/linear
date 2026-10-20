---
"@linear/import": patch
---

fix(import): turn markdown images that fail to upload into links to the source image, so that viewing the imported content doesn't load images from the source host. Image tags that fail to upload are still left unchanged, since Linear shows HTML as text. Reference images such as `![alt][label]` are now uploaded too, and become inline images.
