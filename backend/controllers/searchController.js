const asyncHandler = require('../utils/asyncHandler');
const Company = require('../models/Company');
const { Service } = require('../models/Service');
const Industry = require('../models/Industry');
const Project = require('../models/Project');
const { Blog } = require('../models/Blog');
const News = require('../models/News');
const Document = require('../models/Document');
const { Job } = require('../models/Career');
const { FAQ } = require('../models/Misc');
const escapeRegex = require('../utils/escapeRegex');

// @desc  Global site search across pages, companies, services, industries,
//        projects, blogs, news, documents, careers and FAQs (Section 13)
// @route GET /api/search?q=keyword&type=companies,services
const globalSearch = asyncHandler(async (req, res) => {
  const { q = '', type } = req.query;
  if (!q.trim()) {
    return res.json({ success: true, query: q, results: {} });
  }

  const regex = { $regex: escapeRegex(q.trim()), $options: 'i' };
  const wantTypes = type ? type.split(',') : null;
  const include = (name) => !wantTypes || wantTypes.includes(name);
  const results = {};

  const tasks = [];

  if (include('companies')) {
    tasks.push(
      Company.find({ status: 'published', $or: [{ name: regex }, { tagline: regex }] })
        .select('name slug logo tagline')
        .limit(8)
        .then((r) => { results.companies = r; })
    );
  }
  if (include('services')) {
    tasks.push(
      Service.find({ status: 'published', $or: [{ title: regex }, { shortDescription: regex }] })
        .select('title slug icon shortDescription')
        .limit(8)
        .then((r) => { results.services = r; })
    );
  }
  if (include('industries')) {
    tasks.push(
      Industry.find({ status: 'published', name: regex }).select('name slug icon').limit(8)
        .then((r) => { results.industries = r; })
    );
  }
  if (include('projects')) {
    tasks.push(
      Project.find({ publishStatus: 'published', $or: [{ name: regex }, { client: regex }] })
        .select('name slug coverImage client status')
        .limit(8)
        .then((r) => { results.projects = r; })
    );
  }
  if (include('blogs')) {
    tasks.push(
      Blog.find({ status: 'published', $or: [{ title: regex }, { excerpt: regex }] })
        .select('title slug coverImage excerpt')
        .limit(8)
        .then((r) => { results.blogs = r; })
    );
  }
  if (include('news')) {
    tasks.push(
      News.find({ status: 'published', title: regex }).select('title slug coverImage').limit(8)
        .then((r) => { results.news = r; })
    );
  }
  if (include('documents')) {
    tasks.push(
      Document.find({ visibility: 'public', title: regex }).select('title category file').limit(8)
        .then((r) => { results.documents = r; })
    );
  }
  if (include('careers')) {
    tasks.push(
      Job.find({ status: 'open', position: regex }).select('position slug department location').limit(8)
        .then((r) => { results.careers = r; })
    );
  }
  if (include('faqs')) {
    tasks.push(
      FAQ.find({ isPublished: true, $or: [{ question: regex }, { answer: regex }] })
        .select('question answer category')
        .limit(8)
        .then((r) => { results.faqs = r; })
    );
  }

  await Promise.all(tasks);

  const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);
  res.json({ success: true, query: q, totalResults, results });
});

module.exports = { globalSearch };
