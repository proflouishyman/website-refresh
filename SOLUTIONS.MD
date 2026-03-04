# Solutions Log

## 2026-03-03 - Replace Placeholder Template with Real Site Content

### Problem
- The live project folder was still using the stock HTML5UP Editorial demo (`index.html`) with placeholder copy, generic imagery, and unnecessary template dependencies.
- The result looked unfinished and did not reflect Louis Hyman's real work, books, or brand.

### Solution
- Replaced the entire homepage markup with a custom static `index.html` tailored to Louis Hyman's real content:
  - Hero focused on the central `Temp` message.
  - Dedicated books grid (Temp, Borrow, Debtor Nation, American Capitalism, Shopping for Change).
  - Bio, talks/essays links, and review quotes sections.
  - Clean contact path back to the current live site.
- Added a brand-new `styles.css` with:
  - Consistent design tokens (color, spacing, typography).
  - Responsive layouts for desktop and mobile.
  - Accessibility improvements (skip link, readable contrast, reduced-motion support).
  - Lightweight animation and clear content hierarchy.
- Imported and renamed local book/portrait assets into `html5up-editorial/images/louis/` and wired them into the new page.

### Outcome
- The site is now a clean, simple, GitHub-friendly static page that reflects real material and eliminates demo-template clutter.

## 2026-03-03 - Make Deployment Push-Ready For GitHub

### Problem
- The workspace was not initialized as a git repository, and the website lived inside `html5up-editorial/`, which is not a default GitHub Pages publishing path.
- Pushing as-is would not automatically publish the site.

### Solution
- Added a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` to deploy `html5up-editorial/` directly to GitHub Pages on each push to `main`.
- Enabled automatic GitHub Pages setup in the workflow (`enablement: true`) so first deploy does not fail on repos where Pages has not yet been turned on.
- Added `.gitignore` entries for `.DS_Store` and common local editor folders to keep commits clean.
- Kept all asset and page paths relative so the deployed artifact works from the GitHub Pages root.

### Outcome
- After push, GitHub Actions can publish the site automatically from the intended folder without manual file moves.

## 2026-03-03 - Migrate Wix Page Routes Into GitHub Site

### Problem
- The GitHub site only had a redesigned homepage, while most content still lived on Wix routes (`/temp`, `/borrow`, `/debtor-nation`, `/about-me`, etc.).
- If Wix were turned off, those pages and links would break.

### Solution
- Migrated all sitemap routes into local static pages inside `html5up-editorial`:
  - `books/`
  - `temp/`
  - `borrow/`
  - `debtor-nation/`
  - `american-capitalism/`
  - `shopping-for-change/`
  - `history-of-capitalism/`
  - `talks/`
  - `other-essays/`
  - `about-me/`
  - `home-1/` (legacy redirect to homepage)
- Updated `index.html` to link internally to these local routes instead of `louishyman.com` links.
- Extended `styles.css` with shared subpage layout classes so all migrated routes keep a consistent visual system.
- Added deploy-friendly crawler files:
  - `html5up-editorial/robots.txt`
  - `html5up-editorial/sitemap.xml`
  - `html5up-editorial/.nojekyll`

### Outcome
- Core Wix-hosted content is now available directly from the GitHub Pages site, enabling Wix shutdown without losing major routes.

## 2026-03-03 - Configure Custom Domain Cutover + Contact Form Delivery

### Problem
- GitHub Pages needed to be configured for `www.louishyman.com` before DNS cutover.
- The migrated site replaced Wix forms, so contact submissions needed an email delivery path on static hosting.

### Solution
- Set GitHub Pages custom domain to `www.louishyman.com`.
- Added `html5up-editorial/CNAME` so deployments keep the custom domain binding.
- Updated `html5up-editorial/robots.txt` and `html5up-editorial/sitemap.xml` to point at the production domain.
- Added a static contact form on `about-me/index.html` using FormSubmit (`https://formsubmit.co`) with anti-spam honeypot and redirect handling.
- Added form UI styles in `styles.css`.

### Outcome
- GitHub Pages is prepared for custom-domain traffic and SEO indexing on `www.louishyman.com`.
- Contact form submissions can be delivered without running a custom backend.

## 2026-03-04 - Make Homepage Book Titles The Primary Links

### Problem
- In the homepage books grid, each card used a separate "Book page" link below the description.
- This added visual clutter and made the title text itself non-interactive.

### Solution
- Updated `html5up-editorial/index.html` so each book card title (`<h3>`) contains the route link:
  - `Temp`
  - `Borrow`
  - `Debtor Nation`
  - `American Capitalism: A Reader`
  - `Shopping for Change`
- Removed the separate "Book page" link row from each card.
- Updated `html5up-editorial/styles.css` to style linked titles consistently with the existing card typography and add a clear hover/focus underline state.

### Outcome
- Book titles are now the single, cleaner click target for each card.
- The books section matches the requested simpler interaction model without changing destination URLs.
