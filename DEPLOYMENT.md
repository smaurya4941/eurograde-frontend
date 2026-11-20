# Deploying the EuroGrades website to Plesk

Staging: **https://eurograde.ureligible.com** (API: https://eurogradeapi.ureligible.com).

## How it works

1. You push to `main` on GitHub.
2. GitHub Actions (`.github/workflows/deploy.yml`) runs the format and lint checks, builds the site
   with the API URL baked in, and commits the built files (`dist/`) to the **`deploy`** branch.
3. Plesk's Git extension pulls the `deploy` branch straight into the document root (GitHub
   webhook). There is nothing to build or run on the server.

Never push to `deploy` by hand.

## One-time setup

### 1. GitHub

1. **Settings → Secrets and variables → Actions → Variables → New repository variable**:

   | Name             | Value (staging)                               |
   | ---------------- | --------------------------------------------- |
   | `VITE_API_URL`   | `https://eurogradeapi.ureligible.com`         |
   | `ALLOW_INDEXING` | `false` (set `true` only on the final domain) |
   | `VITE_APP_NAME`  | optional, defaults to `EuroGrades`            |

2. **Settings → Actions → General → Workflow permissions**: "Read and write permissions".
3. Run the workflow once (**Actions → Build and publish deploy branch → Run workflow**) so the
   `deploy` branch exists.

### 2. Plesk: subdomain and SSL

1. **Websites & Domains → Add Subdomain** `eurograde` on `ureligible.com`.
   Document root: **`eurograde.ureligible.com`** (the built files go straight in it).
2. **SSL/TLS Certificates**: Let's Encrypt, then turn on **"Permanent SEO-safe 301 redirect from
   HTTP to HTTPS"** in Hosting Settings.
3. **Apache & nginx Settings**: keep Apache enabled. The site's `.htaccess` (from `public/.htaccess`)
   sends page URLs like `/about` or `/services/ielts-preparation` to the app, returns real 404s
   for missing files, and sets long cache headers for `/assets/`.
   PHP is not needed for this subdomain.

### 3. Plesk: Git

1. **Git → Add Repository → Remote Git hosting**.
   - Repository URL: `git@github.com:smaurya4941/eurograde-frontend.git` (SSH).
   - Add the **SSH public key** Plesk shows under **repo → Settings → Deploy keys** (read-only).
2. Repository settings:
   - Branch: **`deploy`**
   - Deployment mode: **Automatic**
   - Deployment path: **`eurograde.ureligible.com`** (the document root).
3. Add the **Webhook URL** from Plesk under **repo → Settings → Webhooks** (content type
   `application/json`, "Just the push event").
4. No additional deployment actions are needed.

### 4. Check

- https://eurograde.ureligible.com loads, and pages such as `/about` work when reloaded directly.
- Contact form and newsletter submit successfully (needs the API's `.env` cookie/CORS settings:
  `FRONTEND_URL`, `SESSION_DOMAIN=.ureligible.com`, `SANCTUM_STATEFUL_DOMAINS`).
- https://eurograde.ureligible.com/robots.txt shows `Disallow: /` while `ALLOW_INDEXING` is not
  `true`.

## Everyday use

Push to `main`. When **GitHub → Actions** is green, Plesk pulls the new build within seconds.
Visitors get it on their next page load (the app shell is never cached; assets have unique names).

## Moving to the main domain later

1. In Plesk, point the main domain's document root at a Git deployment of the `deploy` branch (or
   move the subdomain).
2. Change the GitHub variables: `VITE_API_URL` → the new API URL, `ALLOW_INDEXING` → `true`.
3. Re-run the workflow (**Actions → Run workflow**) so the site is rebuilt with the new API URL.
4. Update the API's `.env` (see the backend's DEPLOYMENT.md).

## Optional: nginx caching

If **"Serve static files directly by nginx"** is enabled in Apache & nginx Settings, nginx serves
`/assets/` itself and Apache's cache headers don't apply. Add this to **Additional nginx
directives** to keep the one-year cache:

```nginx
location ^~ /assets/ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
    try_files $uri =404;
}
```
