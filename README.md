# elsaravana

Astro-based portfolio and blog with backend code kept in the same repository.

## Structure

- `src/` - Astro frontend (portfolio + blog)
- `src/content/blog/` - Markdown blog posts (edit here, then redeploy)
- `elsaravana-api-main/` - Existing Strapi backend kept inside the app repo
- `legacy-gatsby-src/` - Backup of your previous Gatsby source

## Local development

### Frontend (Astro)

```bash
npm install
npm run dev
```

### Backend (Strapi in same repo)

```bash
cd elsaravana-api-main
npm install
npm run develop
```

Or from project root:

```bash
npm run backend:dev
```

## Writing a new blog post

1. Create a markdown file in `src/content/blog/`.
2. Use frontmatter fields: `title`, `description`, `category`, `date`, `draft`.
3. Commit and push to `main`.
4. GitHub Actions deploys the updated app.

Example:

```md
---
title: "My New Post"
description: "Short summary"
category: "machine-learning"
date: "2026-02-08"
draft: false
---

Post content here.
```

## GitHub deployment (Pages)

A workflow is added at `.github/workflows/deploy.yml`.

After pushing to `main`, enable Pages in your repository settings:

1. Open **Settings -> Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` to trigger deployment

Optional repository variables (recommended):

- `SITE_URL` - your final public URL (example: `https://elsaravana.com`)
- `SITE_BASE` - `/` for root/custom-domain deploys, or `/<repo-name>/` for project Pages

## Notes

- Blog content is now inside the app (`src/content/blog`) so deploying publishes new posts.
- Contact form currently uses a placeholder endpoint in `src/pages/contact.astro`. Replace it with your real form endpoint.
