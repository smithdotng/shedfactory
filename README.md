# Shedfactory — shedfactory.co

Website for Shedfactory Limited: a digital creative agency and product studio. Built with **Next.js 15 (App Router)**, React 19 and TypeScript, with MongoDB for contact messages and newsletter subscribers.

## What's on the site

| Route | Page |
| --- | --- |
| `/` | Home — hero, products, services, startup offer, process, work, testimonials, FAQ |
| `/about` | Story, values, products, testimonials |
| `/products` | Diner.ng, Glee.ng, Found.ng, Haulage.ng, 74 Tribe Studios overview |
| `/products/[slug]` | Individual product pages (`diner`, `glee`, `found`, `haulage`, `74-tribe`) |
| `/services` and `/services/[slug]` | Brand strategy, web & app development, UI/UX, digital marketing, content |
| `/startups` | Venture building for founders and companies, with an idea-submission form |
| `/work` | Portfolio |
| `/contact` | Contact form, offices, WhatsApp, email |
| `/blog` and `/blog/[slug]` | Blog (posts are markdown files in `content/blog/`), RSS at `/blog/rss.xml` |
| `/admin` | Messages and subscribers (basic auth) |

Old Express URLs (`/brand-strategy`, `/web-development`, `/ui-ux`, `/digital-marketing`, `/content`, `/portfolio`, `/case-studies`) permanently redirect to their new homes.

## Editing content

Almost all copy — products, services, portfolio, testimonials, FAQs, stats, contact details — lives in **`src/lib/content.ts`**. Edit it there and every page updates. Styles are in `src/app/globals.css`.

## Writing a blog post

1. Copy `content/blog/_TEMPLATE.md` to a new file, e.g. `content/blog/my-new-post.md`. The file name becomes the URL (`/blog/my-new-post`).
2. Fill in the `title`, `description`, `date`, `author` and `tags` at the top, then write the post in Markdown.
3. Commit and push. The post appears on `/blog`, the home page, the sitemap and the RSS feed.

A branded cover and share image are generated automatically. To use a photo instead, add it under `public/assets/images/blog/` and set `cover:` in the post. Posts dated in the future stay hidden until that day (checked hourly). Files starting with `_` are never published.

## Share previews (Open Graph)

Every page has its own Open Graph and Twitter tags (title, description, URL, image) via `pageMeta()` in `src/lib/seo.ts`. Share images are generated at 1200×630 by `src/lib/og.tsx`: a site card for general pages, and individual cards for each product, service and blog post.

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
