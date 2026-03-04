# Website Migration Checklist (Wix -> GitHub Pages)

Use this checklist for any site move (for example `louishyman.com`, `pattykuzbida.com`, or future domains).

## 1) Inventory Before Build
- Export or list all current public routes from the old host.
- Export or list all important media/assets currently hotlinked from the old host.
- Identify forms, email capture, and any dynamic features that need static-host alternatives.
- Decide canonical domain target (`www` vs apex) before DNS cutover.

## 2) Build In Repo First
- Recreate all important routes in static files/directories.
- Keep old URL paths where possible to avoid broken links and SEO loss.
- Localize assets into the repo (`images/`, `assets/`) instead of hotlinking old-host media.
- Replace dynamic forms with static-compatible form handlers (for example FormSubmit/Formspree).

## 3) Configure GitHub Pages
- Add deploy workflow for Pages on push to `main`.
- Add `CNAME` with target custom domain.
- Add `.nojekyll`.
- Add/update `robots.txt` and `sitemap.xml` for the production domain.

## 4) Verify Before DNS Switch
- Check every primary route on the GitHub Pages URL.
- Verify forms submit and email delivery works.
- Verify canonical URLs and sitemap routes are consistent with live route style (slash/no slash).
- Verify all major media assets load locally from the repo.

## 5) DNS Cutover Sequence
- Lower DNS TTL (for example 300-3600 seconds) before changing records.
- Point `www` to GitHub Pages via CNAME (`<user>.github.io`).
- Keep mail records (MX/SPF/DKIM/mail CNAMEs) unchanged.
- Wait for propagation and certificate issuance.

## 6) SSL/HSTS Validation
- Confirm the custom domain serves a valid certificate.
- If HSTS/cert warnings appear during propagation, wait and recheck after DNS/cert settle.
- Confirm both expected hostnames redirect correctly (or intentionally do not).

## 7) Post-Cutover Cleanup
- Re-test key routes and form submissions on the final domain.
- Confirm GitHub Actions deployment succeeds on the latest commit.
- Keep old hosting active until custom-domain HTTPS is fully stable.
- Cancel old hosting only after successful live verification.

## 8) Governance
- Track migration decisions and fixes in `SOLUTIONS.MD`.
- Use PR-based deploys (branch -> PR -> merge) for auditability and rollback safety.
- Treat uncertain links/authorship as unverified and leave unlinked until confirmed.
