# OS GROUP OF COMPANY — Website & Admin Panel (MERN Stack)

A corporate website + CMS-style admin panel for a multi-company group,
built on MongoDB, Express, React, and Node.js — following
`OS_GROUP_OF_COMPANY_Complete_Website_Requirements.docx`.

## Quick start

You need Node.js 18+ and a MongoDB instance (local or Atlas).

```bash
# 1. Backend
cd backend
cp .env.example .env        # edit with your Mongo URI, JWT secret, etc.
npm install
npm run seed                 # creates the first Super Admin
npm run dev                  # http://localhost:5000

# 2. Frontend (in a second terminal)
cd frontend
npm install
npm run dev                  # http://localhost:5173
```

Visit `http://localhost:5173` for the public site, and
`http://localhost:5173/admin/login` for the admin panel (log in with the
Super Admin credentials from `backend/.env`).

## What's built

**Backend** — full REST API: JWT auth with role-based access control
(Super Admin, Admin, Content Manager, Editor, HR), Mongoose models and
CRUD endpoints for every content type in the spec (companies, industries,
services, projects, blog, news, team, awards, partners, testimonials,
FAQs, document center with versioning, media library, careers + job
applications, contact/business inquiries, newsletter), global search,
dashboard stats, and an audit log that records every admin write.

**Frontend** — public marketing site (home, about, companies, industries,
services, projects, blog, news, team, careers with apply forms, document
center, contact forms, search) and an admin panel (dashboard, CRUD screens
for every module, file uploads, careers/application review, inquiry
triage, admin user management, audit log viewer) — all built to a shared
ink-navy + brass design system rather than generic template styling.

See `backend/README.md` and `frontend/README.md` for details on each half.

## What's not done yet (by design, for a first pass)

- **No live database/hosting connection** — this was built in a sandboxed
  environment with no internet access, so nothing has been run against a
  real MongoDB instance or tested in a browser. Syntax was verified for
  every file, but you should run both `npm install`s and smoke-test locally
  before deploying.
- **File storage is local disk**, not S3/Cloudinary — fine for development,
  should be swapped for production (noted in `backend/README.md`).
- **Rich text editing** is a plain textarea for HTML — swap in a WYSIWYG
  editor for real content editors.
- **Relational pickers** (e.g., assigning a Company to a Project from a
  dropdown) aren't wired into the admin forms yet; the API supports it,
  the UI needs a select component added.
- **SEO fields, versioned document history UI, org chart, homepage section
  builder, and a few other advanced spec items** (Sections 14, 15, 17) have
  backend support (schema + API) but no dedicated admin screen yet.
- Payment/e-commerce, multi-language, and PWA/app-shell items mentioned as
  optional/future in the spec were intentionally left out of this pass.

## Suggested next steps

1. `npm install` both halves and get them running against a local MongoDB.
2. Smoke-test the admin login flow and create your first few Companies/Services.
3. Pick 2–3 of the "not done yet" items above based on priority and I can build those next.
