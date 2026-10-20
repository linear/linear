---
"@linear/import": patch
---

fix(import): turn markdown images that aren't uploaded into links to the source image, so that viewing the imported content doesn't load images from the source host. This covers images that fail to upload and images whose URL isn't an HTTP one, such as protocol-relative URLs. Image tags that aren't uploaded are still left unchanged, since Linear shows HTML as text. Reference images such as `![alt][label]` are now uploaded too, and become inline images.
