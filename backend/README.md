# OS GROUP OF COMPANY — Backend API

Node.js / Express / MongoDB (Mongoose) REST API powering the OS Group of
Company corporate website and admin panel.

## Setup

```bash
cd backend
cp .env.example .env      # then edit .env with real values
npm install
npm run seed               # creates the first Super Admin from .env
npm run dev                 # starts on http://localhost:5000 (nodemon)
```

Requires a running MongoDB instance (local `mongod` or a connection
string from MongoDB Atlas) in `MONGO_URI`.

## Project structure

```
backend/
  config/db.js          Mongo connection
  models/                Mongoose schemas (Company, Service, Project, Blog, News,
                          Document, Media, TeamMember, Career, Inquiry, User, AuditLog…)
  controllers/            Route handlers; factory.js provides generic CRUD
                          for simple modules (Industry, Award, FAQ, etc.)
  routes/                 Express routers, mounted in server.js
  middleware/              auth (JWT + RBAC), upload (multer), errorHandler
  utils/                   asyncHandler, ApiError, sendEmail, logAudit, seed.js
  uploads/                 documents/ media/ applications/ (served at /uploads)
  server.js                app entry point
```

## Roles (Section 15 of the requirements doc)

- `super_admin` — 360° authority, bypasses all role checks, only role
  that can create/delete other admins
- `admin` — manages most content and settings
- `content_manager` — companies, services, industries, projects, team,
  awards, partners, testimonials, FAQs
- `editor` — blogs, news, projects
- `hr` — job postings and applications

## Key API groups

| Base path | Purpose |
|---|---|
| `/api/auth` | login, logout, current user, change password |
| `/api/users` | Super Admin manages admin/staff accounts |
| `/api/companies` `/api/industries` `/api/services` | group structure |
| `/api/projects` | portfolio / case studies |
| `/api/blogs` `/api/news` | content publishing (draft→review→published workflow) |
| `/api/team` | leadership & staff profiles |
| `/api/awards` `/api/partners` `/api/testimonials` `/api/faqs` | supporting content |
| `/api/documents` | Document Center — upload, versioning, download tracking |
| `/api/media` | media library assets + galleries/albums |
| `/api/careers` | job postings + applications (CV upload) |
| `/api/inquiries` `/api/newsletter` | contact/business forms, subscribers |
| `/api/search` | global site search across all content types |
| `/api/dashboard` | admin stats + audit log |
| `/api/settings` | flexible key/value store for menus, footer, announcement bar, popups |

Every write action on admin-managed content is recorded to
`AuditLog` (`/api/dashboard/audit-logs`).

## Notes / production TODOs

- File uploads currently use local disk storage (`uploads/`). Swap
  `middleware/upload.js` for an S3/Cloudinary adapter before deploying
  to a multi-instance/production environment.
- Configure real SMTP credentials in `.env` for contact-form and
  application-notification emails to actually send.
- Set a long, random `JWT_SECRET` in production.
