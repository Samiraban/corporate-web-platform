/**
 * Generates frontend/public/sitemap.xml from the live database, covering
 * both static routes and every published slug-based detail page (company,
 * service, project, blog post, news article, open job listing).
 *
 * The static sitemap.xml the site ships with only lists top-level routes —
 * it can't know about entity slugs at build time. Run this script whenever
 * content changes meaningfully, or wire it into a cron/CI step, e.g.:
 *
 *   node backend/scripts/generateSitemap.js
 *
 * Requires MONGO_URI to be set (reads backend/.env).
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const SITE_URL = process.env.SITE_URL || 'https://www.osgroup.example.com';

const STATIC_ROUTES = [
  { loc: '/', priority: '1.0' },
  { loc: '/about/who-we-are' },
  { loc: '/about/our-values' },
  { loc: '/about/how-we-work' },
  { loc: '/about/our-network' },
  { loc: '/companies' },
  { loc: '/industries' },
  { loc: '/services' },
  { loc: '/projects' },
  { loc: '/blog' },
  { loc: '/news' },
  { loc: '/team' },
  { loc: '/team/culture' },
  { loc: '/careers' },
  { loc: '/documents' },
  { loc: '/contact' },
];

function urlTag({ loc, lastmod, priority }) {
  return [
    '  <url>',
    `    <loc>${SITE_URL}${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    priority ? `    <priority>${priority}</priority>` : null,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
}

async function main() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not set — cannot connect to the database.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const { Blog } = require('../models/Blog');
  const News = require('../models/News');
  const Company = require('../models/Company');
  const { Service } = require('../models/Service');
  const Project = require('../models/Project');
  const { Job } = require('../models/Career');

  const [companies, services, projects, blogs, news, jobs] = await Promise.all([
    Company.find({ status: 'published' }).select('slug updatedAt'),
    Service.find({ status: 'published' }).select('slug updatedAt'),
    Project.find({ publishStatus: 'published' }).select('slug updatedAt'),
    Blog.find({ status: 'published' }).select('slug updatedAt'),
    News.find({ status: 'published' }).select('slug updatedAt'),
    Job.find({ status: 'open' }).select('slug updatedAt'),
  ]);

  const dynamic = [
    ...companies.map((c) => ({ loc: `/companies/${c.slug}`, lastmod: c.updatedAt?.toISOString().slice(0, 10) })),
    ...services.map((s) => ({ loc: `/services/${s.slug}`, lastmod: s.updatedAt?.toISOString().slice(0, 10) })),
    ...projects.map((p) => ({ loc: `/projects/${p.slug}`, lastmod: p.updatedAt?.toISOString().slice(0, 10) })),
    ...blogs.map((b) => ({ loc: `/blog/${b.slug}`, lastmod: b.updatedAt?.toISOString().slice(0, 10) })),
    ...news.map((n) => ({ loc: `/news/${n.slug}`, lastmod: n.updatedAt?.toISOString().slice(0, 10) })),
    ...jobs.map((j) => ({ loc: `/careers/${j.slug}`, lastmod: j.updatedAt?.toISOString().slice(0, 10) })),
  ];

  const allUrls = [...STATIC_ROUTES, ...dynamic];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allUrls
    .map(urlTag)
    .join('\n')}\n</urlset>\n`;

  const outPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log(`Wrote ${allUrls.length} URLs to ${outPath}`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
