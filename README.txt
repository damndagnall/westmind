# WestMind Psychology — Static Site (Cloudflare Pages)

## Files
- index.html (home)
- services.html
- specialties.html
- telehealth.html
- about.html
- contact.html
- privacy.html
- 404.html (Cloudflare Pages uses this for not-found)
- assets/styles.css
- assets/site.js

## Deploy to Cloudflare Pages (free)
1. Create a GitHub repo and upload the contents of this folder (or drag/drop in Cloudflare Pages).
2. Cloudflare Dashboard → Pages → Create a project.
3. Choose your repo (or upload assets).
4. Build settings:
   - Framework preset: **None**
   - Build command: **(leave blank)**
   - Build output directory: **/** (root)
5. Deploy.

## Contact form
This is a static site.
- Current form uses **mailto** (creates an email draft).
- For a real form handler, easiest options:
  - Formspree (free tier) → set form action URL
  - Cloudflare Worker endpoint (still very low cost; can be free depending on usage)

## Replace placeholders
- Email/phone
- Practice address (if you want it public)
- Taine Hall registration/credentials
- Telehealth platform details
- Specialties list
