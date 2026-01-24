# DBody | DionWilson.com

This repository contains the source for the DBody personal training website.
It is a fast, static site built with HTML, CSS, and JavaScript.

## Project structure

```
/
  index.html
  styles.css
  script.js
  assets/
    images/
    videos/
    docs/
```

## Adding new files

- **Images**: add JPG/PNG/SVG files to `assets/images/`.
- **Videos**: add MP4/WebM files to `assets/videos/`.
- **Documents**: add PDF or certifications to `assets/docs/`.

Update `index.html` to reference new assets.

## Large video uploads (Git LFS)

GitHub blocks files larger than 100 MB in normal Git history. This repo is
configured to use Git LFS for common video formats. To add a large video:

1. Install Git LFS once on your machine.
2. Run `git lfs install`.
3. Add your video to `assets/videos/`.
4. Commit and push as normal.

If you prefer not to use Git LFS, host the video on YouTube/Vimeo and embed
the link in `index.html`.
