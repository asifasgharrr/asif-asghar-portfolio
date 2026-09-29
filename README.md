# Asif Asghar — Business Intelligence & Operations Portfolio

Live portfolio: https://asif-asghar-portfolio.vercel.app/

A Python/Flask personal portfolio focused on business intelligence, operations analytics, pricing and revenue analysis, process improvement, automation, decision-support systems and practical web delivery.

## What this portfolio demonstrates

- Business problem framing and operational analysis
- Pricing, route, FX, margin and profitability workflows
- Analytics evolution from Excel/Sheets to automation, Power BI and Python
- Internal decision-support and reconciliation system design
- Responsive frontend and full-stack web delivery
- SEO, accessibility, deployment and production-oriented QA
- Clear separation between public implementation evidence and confidential professional work

## Selected work

| Project | Evidence | Access |
| --- | --- | --- |
| IZI Decision & Pricing Intelligence Engine | Sanitized case study | Private professional work |
| IZI Reconciliation Centre | Sanitized case study | Private professional work |
| IZI Operations Rate Analysis | Sanitized case study | Private professional work |
| IZI Analytics Offline | Sanitized case study | Private professional work |
| IZI Routing Manager | Sanitized case study | Private professional work |
| IZI Performance & Profitability Analytics | Methodology case study | Private professional work |
| New Umer Holidays Travel Portal | Public showcase repository + live project | Public |
| Sangam Dry Fruit Shopify Store | Client case study | Client-owned production |

Internal and client-owned systems are intentionally not published as backend source code. Their case studies describe the business problem, approach, capabilities, architecture and personal contribution without exposing private datasets, credentials, proprietary source code or commercial rules.

## Public evidence

- Portfolio source: https://github.com/asifasgharrr/asif-asghar-portfolio
- New Umer Holidays showcase: https://github.com/asifasgharrr/new-umer-holidays-travel-portal
- Live New Umer Holidays project: https://newumerholidays.com/
- LinkedIn: https://www.linkedin.com/in/asif-asghar-b6290939a/

## Architecture

- `app.py` — Flask routes, project data loading, security headers and sitemap
- `templates/` — Jinja pages
- `static/css/style.css` — visual system and responsive layout
- `static/css/theme-fixes.css` — theme contrast and surface corrections
- `static/css/visual-overrides.css` — visual composition refinements
- `static/js/main.js` — interaction, filtering, navigation, themes and scroll effects
- `data/projects.json` — editable project/case-study content

## UX and accessibility

- Responsive desktop/mobile layout
- Keyboard-accessible navigation and theme dialog
- Skip link and visible focus states
- Reduced-motion support
- Mobile menu with focus management and `inert` handling
- Theme persistence with four visual modes
- Lazy-loaded project imagery
- Semantic headings, labels and navigation landmarks

## SEO and deployment

- Canonical URLs
- Meta description and Open Graph/Twitter metadata
- Person and CreativeWork structured data
- Dynamic `robots.txt` and `sitemap.xml`
- Google Search Console and Bing Webmaster Tools sitemap integration
- Security headers and static-asset caching
- Vercel deployment connected to the GitHub main branch

## Confidentiality rule

Professional IZI work and client projects may contain employer- or client-owned systems, data, pricing, credentials or source code. This repository therefore uses sanitized descriptions and demonstration visuals where necessary. Public evidence is provided only where publication is appropriate.

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

## Maintenance

When adding a new project, keep the case study interview-defensible: state the business problem, explain the approach, identify capabilities and personal contribution, and clearly mark whether the implementation is public, client-owned or confidential. Avoid unsupported impact numbers or fabricated testimonials.

© 2026 Asif Asghar
