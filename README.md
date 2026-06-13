# nuts3745.dev

A dependency-free personal website built with vanilla HTML, CSS, and a local drawing-only JavaScript enhancement.

## Features

- Static single-page site
- Responsive layout
- Social links for Bluesky, GitHub, Scrapbox, and Laboratory
- Editorial color fields with reduced-motion support
- Local Canvas refraction lines without network access, storage, or dynamic HTML
- No npm dependencies or build step

## Project Structure

- `public/index.html` - The complete page markup
- `public/styles.css` - Site styling
- `public/script.js` - Optional Canvas refraction enhancement
- `public/favicon.svg` - Favicon asset

## Local Preview

Open `public/index.html` directly in a browser, or serve the directory with any static file server.

```bash
python3 -m http.server 8000 --directory public
```

Then open [http://localhost:8000](http://localhost:8000).

## Deployment

Deploy the repository root as static files. No install or build command is required.

## License

Copyright © 2019-2026 nuts3745. All rights reserved.
