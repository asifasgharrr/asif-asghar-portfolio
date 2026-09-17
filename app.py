from flask import Flask, render_template, abort, jsonify, send_from_directory, request, make_response
import json
from pathlib import Path
from xml.sax.saxutils import escape

app = Flask(__name__)
BASE = Path(__file__).resolve().parent

with open(BASE / "data" / "projects.json", encoding="utf-8") as f:
    PROJECTS = json.load(f)
PROJECT_MAP = {p["slug"]: p for p in PROJECTS}

EXPERIENCE = [
    ("2017 — 2023", "MILVIK / BIMA Mobile Pakistan", "Team Lead — Claims Operations", "Led claims operations for a 20+ person team, with QA, SLA control, workflow improvement, reporting, coaching and cross-functional coordination."),
    ("2023", "Creative Garage", "ERP Implementation Executive", "Worked across ERP implementation, process-gap analysis, workflow mapping, data validation, SOPs and user training."),
    ("2023 — 2024", "AI Information Technologies", "Customer Support Specialist", "Handled technical support, issue categorization and escalation, recurring-issue tracking and customer communication."),
    ("2024 — 2025", "New Umer Holidays", "Graphic Designer — Part-Time / Project-Based", "Produced digital creative work while developing stronger analytics, BI and technical capabilities."),
    ("2026 — Present", "IZI Services", "Business Operations Analyst — Operations & Pricing", "Work across pricing, revenue, profitability, reconciliation, service operations, reporting, process improvement and internal analytics applications."),
]

SKILL_GROUPS = {
    "Analytics & BI": ["Power BI", "Excel", "Google Sheets", "Pandas", "Business Intelligence", "Profitability Analysis"],
    "Data & Programming": ["Python", "SQL", "SQLite", "Data Cleaning", "Validation", "Analytical Modeling"],
    "Automation & Systems": ["Google Apps Script", "Streamlit", "Process Automation", "Decision Intelligence", "Workflow Design", "QA / Controls"],
    "Web & Product": ["Next.js", "React", "Tailwind CSS", "Supabase", "Vercel", "Shopify"],
}

@app.after_request
def security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    response.headers["Cache-Control"] = "public, max-age=31536000, immutable" if response.mimetype in {"text/css", "application/javascript", "image/svg+xml", "image/jpeg", "image/png", "image/webp", "image/avif"} else "no-cache"
    response.headers["Content-Security-Policy"] = "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"
    return response

@app.route("/")
def home():
    return render_template("index.html", projects=PROJECTS, experience=EXPERIENCE, skill_groups=SKILL_GROUPS)

@app.route("/projects/<slug>")
def project_detail(slug):
    project = PROJECT_MAP.get(slug)
    if not project:
        abort(404)
    related = [p for p in PROJECTS if p["slug"] != slug and p["category"] == project["category"]][:2]
    return render_template("project.html", project=project, related=related)

@app.route("/api/projects")
def projects_api():
    response = jsonify(PROJECTS)
    response.headers["Cache-Control"] = "no-store"
    return response

@app.route("/health")
def health():
    return jsonify({"status": "ok", "service": "asif-portfolio"})

@app.route("/robots.txt")
def robots():
    return send_from_directory(BASE / "static", "robots.txt", mimetype="text/plain")

@app.route("/sitemap.xml")
def sitemap():
    base_url = request.url_root.rstrip("/")
    urls = [base_url + "/"] + [base_url + f"/projects/{p['slug']}" for p in PROJECTS]
    body = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"
    body += "".join(f"<url><loc>{escape(url)}</loc></url>" for url in urls) + "</urlset>"
    response = make_response(body)
    response.headers["Content-Type"] = "application/xml; charset=utf-8"
    return response

@app.errorhandler(404)
def not_found(_):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
