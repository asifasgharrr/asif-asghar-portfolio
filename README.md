# Asif Asghar — Portfolio V6

A Python/Flask personal portfolio focused on business intelligence, operations analytics, pricing, automation, decision systems and practical web work.

## Included
- Premium dark analytical visual system
- Animated hero/orbit visualization
- Responsive mobile navigation
- Scroll reveal effects and reading progress bar
- Project filtering
- Individual case-study pages with problem / approach / capabilities / stack
- Career timeline
- Skills architecture
- Decision-intelligence workflow visualization
- Public GitHub showcase link for New Umer Holidays
- SEO metadata, Open Graph tags, canonical URLs, favicon, robots.txt and sitemap route
- Basic browser/security headers
- Confidentiality-aware descriptions for internal IZI work
- Public LinkedIn/GitHub profile layer
- Education and continuous-learning section
- GitHub-hosted profile visual with graceful external dependency

## Run locally

```bash
python -m venv .venv
# Windows
.venv\\Scripts\\activate
# macOS/Linux
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Then open `http://127.0.0.1:5000`.

## Content / privacy rule
Internal IZI work is intentionally generalized. Do not add internal company datasets, customer/agent names, private pricing, credentials, proprietary source code, financial reports or other confidential information to the public site.

The New Umer Holidays public repository is a showcase repository; production source remains private.

## V6 additions
- Personal SVG brand mark and installable web manifest
- Structured Person / CreativeWork JSON-LD metadata
- Proof-of-work section explaining sanitized case-study evidence
- Health endpoint for deployment checks
- Static asset caching and API no-store policy

## Public profile links
- GitHub: https://github.com/asifasgharrr
- LinkedIn: https://www.linkedin.com/in/asif-asghar-b6290939a/

## Final deployment checklist
1. Replace the temporary local URL with the real production domain in any deployment-specific SEO configuration.
2. Add an approved professional photo only if wanted.
3. Add an approved public contact method (email / LinkedIn) if desired.
4. Add approved screenshots for sanitized IZI case studies and actual client visuals.
5. Confirm all external project links and client publication permissions.
6. Run a final accessibility, mobile, performance and link check.
7. Deploy Flask behind a production WSGI server; do not use Flask's debug server in production.
8. Only after portfolio content is approved, update the CV from this portfolio as the source of truth.

## Architecture

- `app.py` — Flask routes, project data loading, security headers and sitemap
- `templates/` — Jinja pages
- `static/css/style.css` — visual system and responsive layout
- `static/js/main.js` — interaction, filtering, navigation and scroll effects
- `data/projects.json` — editable project/case-study content


### Visual evidence
Internal IZI project cards use generated demonstration visuals derived from the documented feature/workflow profiles. They are not screenshots of private company data. The portfolio intentionally avoids customer-level records, credentials, proprietary source code and private commercial figures.


### Visual treatment
Each project uses a distinct generated demonstration visual or editorial mockup rather than repeating one dashboard screenshot. Internal IZI visuals are illustrative only and contain no private company records.


### Business Operations scope
The portfolio's IZI role section is grounded in the internal August 2026 management progress summary and September 2026 five-application source review. It represents recurring work across pricing, route/FX/margin governance, API monitoring and partner follow-up, accounting and reconciliation support, management reporting, agent/team continuity, RemitRio support, and delivery of internal operational-intelligence tools. Internal figures, customer records, credentials and proprietary source code are intentionally excluded from the public site.


### V11 UX pass
Hero composition was tightened so the portrait remains unobstructed, technical nodes stay outside the face area, and the theme selector is presented as a styled modal rather than raw controls. Business Operations content remains detailed and source-grounded.


## V13 QA hardening
- Fixed hero first-viewport composition so the full headline and portrait composition are visible on short desktop screens.
- Fixed theme contrast by removing remaining fixed dark-theme text colors from the primary UI surfaces.
- Added keyboard focus trapping and focus restoration for the theme dialog.
- Added long-lived caching for static image assets.
- Preserved reduced-motion support and all four visual themes.
