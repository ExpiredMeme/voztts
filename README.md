# Voz website — Cloudflare Pages starter

A static site ready for GitHub-connected Cloudflare Pages.

## Deploy

1. Extract this ZIP.
2. In your GitHub repository, select **Add file → Upload files**.
3. Upload `index.html`, `styles.css`, `script.js` and the `updates` folder with `latest.json`.
4. Commit to the `main` branch. Cloudflare Pages should automatically redeploy.

Cloudflare Pages configuration:
- Framework preset: None
- Build command: (blank)
- Build output directory: / (repository root)
- Root directory: (blank)

## Releases and security

The download button is intentionally disabled until a verified public installer is published.
The `/updates/latest.json` manifest is a placeholder; the Windows app must NOT treat
`status: unreleased` as an available update. Do not insert a fictional version,
download URL or checksum.

When publishing a release, host the large installer in R2 or another trusted
HTTPS download host, compute its real SHA-256 checksum, and update the manifest.
Before wiring automatic execution or installation, implement secure update
verification and a trustworthy signing process. Initially, open the download
URL in the browser rather than executing remote files automatically.

No bot source code, credentials, license server secrets or private keys belong
in this public repository.
