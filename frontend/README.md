# OS GROUP OF COMPANY — Frontend

React (Vite) + Tailwind CSS frontend: the public marketing site plus the
admin panel, both consuming the backend REST API.

## Setup

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173, proxies /api to http://localhost:5000
```

Make sure the backend is running first (`cd ../backend && npm run dev`).

## Structure

```
src/
  components/     Header, Footer, shared UI (SectionHeading, Loading, PageHero…)
  layouts/         PublicLayout wraps every public page
  pages/           Public site pages (Home, Companies, Services, Projects,
                   Blog, News, Careers, Documents, Contact, Team, Search…)
  context/         AuthContext — admin login/session state
  services/api.js  Axios instance with JWT interceptor
  admin/
    AdminLayout.jsx        Sidebar + topbar shell for /admin/*
    ProtectedRoute.jsx     Redirects to /admin/login if not authenticated
    components/
      ResourceManager.jsx  Generic list+create/edit-modal CRUD screen,
                           configured per module via a `fields`/`columns` schema
      StatusBadge.jsx
    pages/
      Login.jsx, Dashboard.jsx
      CompaniesAdmin.jsx, ServicesAdmin.jsx, ProjectsAdmin.jsx,
      BlogAdmin.jsx, NewsAdmin.jsx           — built on ResourceManager
      SimpleModulesAdmin.jsx                  — Industries, Awards, Partners,
                                                Testimonials, FAQs, Team via
                                                one config-driven component
      DocumentsAdmin.jsx, MediaAdmin.jsx      — file upload flows
      CareersAdmin.jsx                        — jobs (CRUD) + applications (review)
      InquiriesAdmin.jsx                      — contact/business form submissions
      UsersAdmin.jsx                          — Super Admin manages admin accounts
      AuditLogAdmin.jsx                       — read-only activity feed
```

## Adding a new admin module quickly

Most content types are simple CRUD (name + a few fields). Instead of
writing a new page, add a config block to `CONFIGS` in
`admin/pages/SimpleModulesAdmin.jsx` and a route in `App.jsx`:

```jsx
<Route path="my-module" element={<SimpleModulesAdmin module="myModule" />} />
```

Only reach for a dedicated page (like `CompaniesAdmin.jsx`) when a module
needs custom behavior — file uploads, tabs, or relational pickers.

## Design system

- Colors: deep ink-navy (`ink-900` #12203A) + brass/gold accent (`brass-500`
  #B8863C) on a warm off-white canvas (#F7F6F2) — see `tailwind.config.js`.
- Type: "Source Serif 4" for headings, Inter for body/UI.
- Component classes (`btn-primary`, `btn-outline`, `btn-brass`, `section`,
  `container-page`, `eyebrow`) are defined in `src/index.css`.

## Notes

- The rich-text fields (blog/news `content`) currently take raw HTML in a
  plain textarea. Swap in a WYSIWYG editor (TipTap, Quill, etc.) before
  handing this to non-technical content editors.
- Relational fields (e.g. picking a Company for a Project, or a Category
  for a Service) aren't wired into the admin forms yet — they're supported
  by the API but need a select/picker component added to `ResourceManager`
  or a dedicated form.
