# Shedfactory — shedfactory.co

Website for Shedfactory Limited: a digital creative agency and product studio. Built with **Next.js 15 (App Router)**, React 19 and TypeScript, with MongoDB for contact messages and newsletter subscribers.

## What's on the site

| Route | Page |
| --- | --- |
| `/` | Home — hero, products, services, startup offer, process, work, testimonials, FAQ |
| `/about` | Story, values, products, testimonials |
| `/products` | Diner.ng, Glee.ng, Found.ng overview |
| `/products/[diner\|glee\|found]` | Individual product pages |
| `/services` and `/services/[slug]` | Brand strategy, web & app development, UI/UX, digital marketing, content |
| `/startups` | Venture building for founders and companies, with an idea-submission form |
| `/work` | Portfolio |
| `/contact` | Contact form, offices, WhatsApp, email |
| `/admin` | Messages and subscribers (basic auth) |

Old Express URLs (`/brand-strategy`, `/web-development`, `/ui-ux`, `/digital-marketing`, `/content`, `/portfolio`, `/case-studies`) permanently redirect to their new homes.

## Editing content

Almost all copy — products, services, portfolio, testimonials, FAQs, stats, contact details — lives in **`src/lib/content.ts`**. Edit it there and every page updates. Styles are in `src/app/globals.css`.

## Running locally

```bash
cp .env.example .env.local   # then fill in the values
npm install
npm run dev                  # http://localhost:3000
```

## Environment variables

| Name | Purpose |
| --- | --- |
| `MONGODB_URI` | Same MongoDB database the Express site used (collections `contacts`, `subscribers`) |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Required for `/admin`. If either is missing, admin stays locked. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata and the sitemap (default `https://shedfactory.co`) |

## Deploying

Works on Vercel out of the box: import the repo, set the environment variables above, deploy. On a VPS: `npm run build && npm start` behind a reverse proxy.
