# Instructions for Claude – TekFab site scripts

This repo is public and served live at https://scripts.tekfab.co.uk/site.js. A push here changes the live shop
within about 10 minutes, so Keith must approve it first.

The full maintenance rules live in the private repo `turleyk/tekfab-website-code`, file `MAINTENANCE.md`.
Read them before planning or making any change.

Short version:
- Plan and log every change in Zoho Projects, KMP 1 – TekFab Shop & Quote Forms (tag "Claude logged").
- Edit `src/*.js`, run `./build.sh`, commit `src/` and `site.js` together. Never edit `site.js` directly.
- This repo holds only what GitHub serves. Page snippets (guide pages etc.) and Header Code live in
  `tekfab-website-code/zoho/`; `deploy-map.yaml` there lists where every piece is deployed.
- Keep the file table in `README.md` up to date in the same commit, and add a line to the change log in
  `tekfab-website-code/MAINTENANCE.md`.
- Nothing secret or business-private goes in this repo.
