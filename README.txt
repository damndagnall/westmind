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


## ✅ Contact form (works on Cloudflare Pages)
This project includes a **Cloudflare Pages Function** at:
- POST /api/contact  (file: functions/api/contact.js)

### Set environment variables in Cloudflare Pages
Cloudflare Dashboard → Workers & Pages → Pages → (your project) → Settings → Environment variables:
- CONTACT_TO = your inbox email (e.g., hello@westmindpsychology.com.au)
- CONTACT_FROM = a sender on your domain (e.g., no-reply@westmindpsychology.com.au)

### MailChannels DNS auth (required)
To send mail via MailChannels from your domain, add this DNS record in Cloudflare DNS:
- Type: TXT
- Name: _mailchannels
- Content: v=mc1 cfid=<YOUR_CLOUDFLARE_ACCOUNT_ID>

Also ensure your domain has SPF/DKIM/DMARC as appropriate for deliverability.
If you prefer, I can swap this to Resend/SendGrid (API key) instead.

