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

## 2026-03-04 - Add Talk Previews + Expand Essay Archive Links

### Problem
- The `Talks` page listed talk titles without rich previews or enough direct media links.
- The `Essays` page had only one New York Times link and did not reflect the broader volume of writing across NYT, WSJ, and other outlets.
- The pages needed stronger visual presentation with artwork where available while staying simple and GitHub Pages friendly.

### Solution
- Rebuilt `talks/index.html` using a reusable preview-card grid:
  - Added six linked cards with watch links and local preview images for major talks.
  - Mapped cards to public links from Talks at Google, Long Now, CASBS/Stanford, Heldrich Center, Cornell ILR, and C-SPAN.
- Rebuilt `other-essays/index.html` with:
  - A featured essay preview section (NYT archive, Atlantic, Washington Post, Vox) including artwork.
  - An expanded New York Times essay index with multiple linked pieces and years.
  - A second publication index for WSJ and other outlets.
- Extended `styles.css` with shared `.preview-*` and `.essay-*` classes for consistent card/list rendering across desktop and mobile.
- Added local preview image assets in `html5up-editorial/images/louis/previews/` so production rendering does not depend on fragile hotlinked media.

### Outcome
- Talks and essays now feel complete, scannable, and visual, with direct links for users to watch or read.
- The essays section now includes substantially more links and publication coverage, especially NYT items.
- The new components are static-site compatible and deploy cleanly on GitHub Pages.

## 2026-03-04 - Make Essay Preview Images Smaller + Side-Aligned

### Problem
- On `/other-essays/`, featured images appeared above each card and felt too large for quick scanning.
- The first featured card used a portrait image instead of article artwork.

### Solution
- Updated `other-essays/index.html`:
  - Switched the featured preview grid to a side-thumbnail layout variant (`preview-grid-side`).
  - Replaced the portrait-based NYT card with a NYT article card using article artwork.
  - Replaced the Washington Post preview image with article-related artwork.
- Added new local assets:
  - `images/louis/previews/essay-nyt-ai.jpg`
  - `images/louis/previews/essay-wapo-silicon.jpg`
- Extended `styles.css` with a dedicated side-card variant:
  - Fixed-width boxed thumbnails on the left.
  - Content on the right.
  - Mobile width adjustments so cards stay readable on smaller screens.

### Outcome
- `/other-essays/` now presents smaller boxed images to the side of each featured card.
- Featured cards prioritize article art over portrait photography where available.

## 2026-03-04 - Add Two Additional Wall Street Journal Essay Links

### Problem
- The essays page needed two more specific Wall Street Journal links to reflect additional writing requested by the site owner.

### Solution
- Updated `html5up-editorial/other-essays/index.html` in the "Wall Street Journal and Other Outlets" list.
- Added two new WSJ links using the exact URLs supplied by the site owner:
  - American economy/capitalism history timeline article.
  - History of work in America article.
- Kept the same target/rel external-link contract used across the page.

### Outcome
- `/other-essays/` now includes the two additional WSJ links in the publication index.

## 2026-03-04 - Rebuild Essays Page As De-duplicated Popular Writing Archive

### Problem
- The user needed the site to focus on popular writing from the CV (not academic writing).
- The old `/other-essays/` page mixed highlight cards and index items with repeated entries and incomplete outlet coverage.

### Solution
- Replaced the previous mixed layout in `html5up-editorial/other-essays/index.html` with a single de-duplicated archive section:
  - Grouped entries by outlet (`Wall Street Journal`, `New York Times`, `Washington Post and The Atlantic`, `Other Outlets`).
  - Added 42 unique popular-writing entries parsed from the CV section "Opinion Pieces and Popular Writing."
  - Kept verified URLs where already known and listed remaining entries as plain titles with outlet/date metadata to avoid broken links.
- Added supporting CSS in `styles.css`:
  - `.essay-note` for archive context copy.
  - `.essay-group-title` for outlet grouping headers.
  - `.essay-title` for non-linked publication entries.
- Ran a normalized title check to confirm no duplicates in the rendered popular-writing list.

### Outcome
- `/other-essays/` now reflects the CV's popular-writing record with outlet-based grouping and no duplicate titles.
- The page no longer mixes in non-publication interview/feature links in the main publication archive.

## 2026-03-04 - URL Verification Pass + Author-Only Essay Links + Bio Text Update

### Problem
- The essays archive still had many unlinked popular-writing entries even when stable URLs were available.
- One Wall Street Journal item (`Protecting Health Records from Cyberattack`) was linked even though Louis Hyman was not the author.
- A New York Times title needed correction from “How Sears Helped Advance Jim Crow” to “How Sears Helped Oppose Jim Crow.”
- The homepage/about bio sentence needed to be updated to the current Johns Hopkins appointment wording.

### Solution
- Updated the bio text in both `html5up-editorial/index.html` and `html5up-editorial/about-me/index.html` to:
  - Include the Dorothy Ross Professor title.
  - Include membership in the Data Science and AI Institute.
- Ran an outlet/title URL verification pass for popular-writing entries and converted verified authored items to links in `html5up-editorial/other-essays/index.html`.
- Kept uncertain or unverified items as plain text (no link) to avoid broken/misattributed destinations.
- Removed the non-authored WSJ URL by converting `Protecting Health Records from Cyberattack` to an unlinked title.
- Corrected the NYT title text to “How Sears Helped Oppose Jim Crow.”
- Updated the essays note copy to explicitly state that links are included only when URL and authorship are verified.

### Outcome
- `/other-essays/` now includes substantially more verified authored links without introducing duplicated entries.
- Non-authored items are no longer linked.
- Bio text now matches current appointment language across home and about pages.

## 2026-03-04 - Remove Essays Page Verification Note Copy

### Problem
- The essays page included explanatory copy under "Popular Writing by Outlet" that the site owner wanted removed.

### Solution
- Removed the `<p class="essay-note">` line from `html5up-editorial/other-essays/index.html`.
- Kept the section structure and publication lists unchanged.

### Outcome
- The requested note text no longer appears on `/other-essays/`.

## 2026-03-04 - Add About Page AI and Center Roles

### Problem
- The About page bio needed two current role updates:
  - Membership at `https://ai.jhu.edu/`.
  - Director role for the Center for Economy and Society.

### Solution
- Updated `html5up-editorial/about-me/index.html` copy to include:
  - Membership in the Hopkins AI Lab (`https://ai.jhu.edu/`) alongside the Data Science and AI Institute.
  - Director of the Center for Economy and Society (`https://snfagora.jhu.edu/our-work/labs/center-for-economy-society/`).
- Kept the existing paragraph structure and other biography content unchanged.

### Outcome
- The About page now reflects the requested AI affiliation and center directorship with direct links.

## 2026-03-04 - Add Reusable Migration Checklist

### Problem
- Migration lessons from the Wix -> GitHub cutover were only captured in conversation and scattered solution entries.
- Future site migrations (including additional family domains) need a repeatable, written process.

### Solution
- Added `MIGRATION_CHECKLIST.md` at the repo root with a step-by-step process covering:
  - pre-migration inventory,
  - static rebuild standards,
  - GitHub Pages setup,
  - pre-cutover validation,
  - DNS/SSL cutover order,
  - post-cutover verification,
  - governance practices (`SOLUTIONS.MD`, PR-based deploys, unverified links policy).

### Outcome
- The project now has a reusable migration playbook that can be copied to other site repos and applied consistently.

## 2026-03-04 - Restore Books Page Image Cards and Remove Subheading

### Problem
- The `/books/` page regressed to text-only jump cards and included extra lead copy that the site owner did not want.
- The prior visual style with book images was lost on this route.

### Solution
- Updated `html5up-editorial/books/index.html` to use image-based `.book-card` entries (matching the established visual style used on the homepage books section).
- Restored all five book cover/media images on the books index cards.
- Removed the page subheading/lead line under the main books title.

### Outcome
- `/books/` now shows the older image-forward card layout again.
- The unwanted subheading text is removed.

## 2026-03-04 - Remove Defunct Podcast and Book-Order Links

### Problem
- The podcasts page still contained legacy platform links that are no longer valid or useful:
  - Stitcher (now sunset/redirected).
  - iTunes U (returned 404).
- Book detail pages still used `Order` buttons pointing to outdated/blocked purchase URLs.
- The site owner requested removal of these defunct links and a general real-link check.

### Solution
- Updated `html5up-editorial/history-of-capitalism/index.html`:
  - Removed `Stitcher archive` and `iTunes U archive` list items.
- Updated `html5up-editorial/temp/index.html`, `html5up-editorial/borrow/index.html`, and `html5up-editorial/american-capitalism/index.html`:
  - Removed all `Order` buttons from the book CTA rows.
  - Kept internal navigation buttons (`All books`, `Course and podcast series`) intact.
- Ran a status-check pass against external links remaining on those touched pages to verify current reachability.

### Outcome
- Defunct podcast platform links are removed.
- Defunct `Order` links are removed from book pages.
- Remaining external links on the touched pages currently resolve successfully in automated checks.
