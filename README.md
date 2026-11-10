# Voz website — minimal design

Static website for Cloudflare Workers static assets or Cloudflare Pages. No build tools required.

## Deploy

Upload the **contents** of this folder (not the enclosing folder) to the root of the GitHub repository connected to Cloudflare. Replace the old `index.html`, `styles.css`, `script.js`, and `README.md`. Add `features.html` and `guide.html`. Preserve the `updates/latest.json` path.

Cloudflare will redeploy after committing to the production branch.

## Release buttons

The Download Free Version and Buy a Licence buttons are intentionally disabled until a real, trusted installer URL and payment URL are configured. Do not publish an unverified URL or a fake checkout. Once ready, change the buttons in index.html to anchor links and provide the actual URLs.

## Theme

Colors are based on the Voz PySide6 GUI: background #0e1223, panels #191e36, blue buttons #2b4ac3, and text #e9edff.

The updates/latest.json file remains `unreleased`; do not advertise an update until the installer is published and its SHA-256 checksum is calculated.


## Logo and background screenshots
- Header brand on Home, Features, and Guide uses `assets/voz-logo.png` extracted from the supplied `voz.ico`.
- The favicon is `assets/voz.ico`.
- The homepage cycles through five supplied screenshots in their exact upload order, every 6.5 seconds.
- The screenshots are darkened behind a gradient overlay to preserve readability.
- To change slideshow timing, edit `6500` (milliseconds) in `script.js`.
- Upload the `assets` directory along with the other site files.
