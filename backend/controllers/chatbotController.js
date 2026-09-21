const Company = require('../models/Company');
const Industry = require('../models/Industry');
const { Service } = require('../models/Service');
const Project = require('../models/Project');
const { Blog } = require('../models/Blog');
const News = require('../models/News');
const { Job } = require('../models/Career');
const TeamMember = require('../models/TeamMember');
const { FAQ } = require('../models/Misc');

function cleanText(value) {
  if (value === undefined || value === null) {
    return '';
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => cleanText(item))
      .filter(Boolean)
      .join(', ');
  }

  if (typeof value === 'object') {
    return Object.values(value)
      .map((item) => cleanText(item))
      .filter(Boolean)
      .join(', ');
  }

  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getValue(...values) {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ''
    ) {
      return value;
    }
  }

  return '';
}

async function buildKnowledge() {
  const [
    companies,
    industries,
    services,
    projects,
    blogs,
    news,
    jobs,
    team,
    faqs,
  ] = await Promise.all([
    Company.find({ status: 'published' }).lean(),

    Industry.find({ status: 'published' })
      .sort({ order: 1 })
      .lean(),

    Service.find({ status: 'published' })
      .sort({ order: 1 })
      .lean(),

    Project.find({ publishStatus: 'published' })
      .sort({ order: 1 })
      .lean(),

    Blog.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(20)
      .lean(),

    News.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(20)
      .lean(),

    Job.find({ status: 'published' })
      .sort({ deadline: 1 })
      .lean(),

    TeamMember.find({ status: 'published' })
      .sort({ order: 1 })
      .lean(),

    FAQ.find({ isPublished: true })
      .sort({ order: 1 })
      .lean(),
  ]);

  const knowledge = {
    companies: companies.map((company) => ({
      name: cleanText(company.name),
      tagline: cleanText(company.tagline),
      overview: cleanText(company.overview),
      description: cleanText(company.description),
      history: cleanText(company.history),
      industry: cleanText(
        getValue(company.industryType, company.industry)
      ),
      headquarters: cleanText(company.headquarters),
      email: cleanText(company.email),
      phone: cleanText(company.phone),
      website: cleanText(company.website),
    })),

    industries: industries.map((industry) => ({
      name: cleanText(industry.name),
      description: cleanText(industry.description),
    })),

    services: services.map((service) => ({
      title: cleanText(
        getValue(service.title, service.name)
      ),
      description: cleanText(
        getValue(service.description, service.shortDescription)
      ),
      shortDescription: cleanText(service.shortDescription),
      benefits: cleanText(service.benefits),
      process: cleanText(service.process),
    })),

    projects: projects.map((project) => ({
      name: cleanText(
        getValue(project.name, project.title)
      ),
      client: cleanText(project.client),
      category: cleanText(project.category),
      location: cleanText(project.location),
      description: cleanText(project.description),
      objectives: cleanText(project.objectives),
      challenge: cleanText(project.challenge),
      solution: cleanText(project.solution),
      results: cleanText(project.results),
    })),

    blogs: blogs.map((blog) => ({
      title: cleanText(blog.title),
      excerpt: cleanText(blog.excerpt),
      content: cleanText(blog.content),
      tags: cleanText(blog.tags),
    })),

    news: news.map((item) => ({
      title: cleanText(item.title),
      excerpt: cleanText(item.excerpt),
      content: cleanText(item.content),
      type: cleanText(item.type),
    })),

    jobs: jobs.map((job) => ({
      position: cleanText(
        getValue(job.position, job.title, job.name)
      ),
      department: cleanText(job.department),
      location: cleanText(job.location),
      employmentType: cleanText(job.employmentType),
      experience: cleanText(job.experience),
      salary: cleanText(job.salary),
      deadline: job.deadline
        ? new Date(job.deadline).toLocaleDateString()
        : '',
      responsibilities: cleanText(job.responsibilities),
      requirements: cleanText(job.requirements),
      skills: cleanText(job.skills),
      benefits: cleanText(job.benefits),
      vacancies: cleanText(job.vacancies),
    })),

    team: team.map((member) => ({
      name: cleanText(member.name),
      designation: cleanText(member.designation),
      biography: cleanText(member.biography),
      experience: cleanText(member.experience),
      responsibilities: cleanText(member.responsibilities),
      education: cleanText(member.education),
    })),

    faqs: faqs.map((faq) => ({
      category: cleanText(faq.category),
      question: cleanText(faq.question),
      answer: cleanText(faq.answer),
    })),
  };

  return knowledge;
}

function createKnowledgeText(knowledge) {
  const parts = [];

  parts.push('OS GROUP COMPANIES');

  for (const company of knowledge.companies) {
    parts.push(
      [
        `Name: ${company.name}`,
        `Tagline: ${company.tagline}`,
        `Overview: ${company.overview}`,
        `Description: ${company.description}`,
        `History: ${company.history}`,
        `Industry: ${company.industry}`,
        `Headquarters: ${company.headquarters}`,
        `Email: ${company.email}`,
        `Phone: ${company.phone}`,
        `Website: ${company.website}`,
      ].join('\n')
    );
  }

  parts.push('OS GROUP INDUSTRIES');

  for (const industry of knowledge.industries) {
    parts.push(
      [
        `Name: ${industry.name}`,
        `Description: ${industry.description}`,
      ].join('\n')
    );
  }

  parts.push('OS GROUP SERVICES');

  for (const service of knowledge.services) {
    parts.push(
      [
        `Service: ${service.title}`,
        `Short description: ${service.shortDescription}`,
        `Description: ${service.description}`,
        `Benefits: ${service.benefits}`,
        `Process: ${service.process}`,
      ].join('\n')
    );
  }

  parts.push('OS GROUP PROJECTS');

  for (const project of knowledge.projects) {
    parts.push(
      [
        `Project: ${project.name}`,
        `Client: ${project.client}`,
        `Category: ${project.category}`,
        `Location: ${project.location}`,
        `Description: ${project.description}`,
        `Objectives: ${project.objectives}`,
        `Challenge: ${project.challenge}`,
        `Solution: ${project.solution}`,
        `Results: ${project.results}`,
      ].join('\n')
    );
  }

  parts.push('OS GROUP CAREERS');

  for (const job of knowledge.jobs) {
    parts.push(
      [
        `Position: ${job.position}`,
        `Department: ${job.department}`,
        `Location: ${job.location}`,
        `Employment type: ${job.employmentType}`,
        `Experience: ${job.experience}`,
        `Salary: ${job.salary}`,
        `Deadline: ${job.deadline}`,
        `Responsibilities: ${job.responsibilities}`,
        `Requirements: ${job.requirements}`,
        `Skills: ${job.skills}`,
        `Benefits: ${job.benefits}`,
        `Vacancies: ${job.vacancies}`,
      ].join('\n')
    );
  }

  parts.push('OS GROUP TEAM');

  for (const member of knowledge.team) {
    parts.push(
      [
        `Name: ${member.name}`,
        `Designation: ${member.designation}`,
        `Biography: ${member.biography}`,
        `Experience: ${member.experience}`,
        `Responsibilities: ${member.responsibilities}`,
        `Education: ${member.education}`,
      ].join('\n')
    );
  }

  parts.push('OS GROUP FAQS');

  for (const faq of knowledge.faqs) {
    parts.push(
      [
        `Category: ${faq.category}`,
        `Question: ${faq.question}`,
        `Answer: ${faq.answer}`,
      ].join('\n')
    );
  }

  parts.push('OS GROUP BLOG');

  for (const blog of knowledge.blogs) {
    parts.push(
      [
        `Title: ${blog.title}`,
        `Excerpt: ${blog.excerpt}`,
        `Content: ${blog.content}`,
        `Tags: ${blog.tags}`,
      ].join('\n')
    );
  }

  parts.push('OS GROUP NEWS');

  for (const item of knowledge.news) {
    parts.push(
      [
        `Title: ${item.title}`,
        `Type: ${item.type}`,
        `Excerpt: ${item.excerpt}`,
        `Content: ${item.content}`,
      ].join('\n')
    );
  }

  return parts.join('\n\n--------------------\n\n');
}

function fallbackReply(message, knowledge) {
  const text = message.toLowerCase().trim();

  if (
    /^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(
      text
    )
  ) {
    return (
      'Hello! 👋 I’m the OS Group AI Assistant. ' +
      'I can help you explore our companies, services, industries, ' +
      'projects, careers, team, FAQs, news and contact information. ' +
      'What would you like to know?'
    );
  }

  if (
    text.includes('thank') ||
    text.includes('thanks')
  ) {
    return 'You’re welcome! 😊 Feel free to ask me anything about OS Group.';
  }

  if (
    text.includes('what is os group') ||
    text.includes('who is os group') ||
    text.includes('about os group') ||
    text.includes('what is this website') ||
    text.includes('what is this company') ||
    text.includes('who are you')
  ) {
    if (knowledge.companies.length > 0) {
      const companyNames = knowledge.companies
        .map((company) => company.name)
        .filter(Boolean)
        .join(', ');

      if (companyNames) {
        return (
          `OS Group of Company is a diversified group with ` +
          `businesses operating across multiple areas. ` +
          `The published group companies include: ${companyNames}. ` +
          `I can tell you more about any of them.`
        );
      }
    }

    return (
      'OS Group of Company is a diversified business group. ' +
      'I can help you explore its companies, services, industries, ' +
      'projects, people, careers and latest updates.'
    );
  }

  if (
    text.includes('service') ||
    text.includes('services') ||
    text.includes('what do you do') ||
    text.includes('what do you offer')
  ) {
    if (knowledge.services.length > 0) {
      const serviceNames = knowledge.services
        .map((service) => service.title)
        .filter(Boolean)
        .join(', ');

      return (
        `OS Group currently has these published services: ` +
        `${serviceNames}. ` +
        `Ask me about a specific service and I can provide more information.`
      );
    }

    return (
      'I can help you explore the services offered by OS Group. ' +
      'Please open the Services section of the website for the published service information.'
    );
  }

  if (
    text.includes('company') ||
    text.includes('companies') ||
    text.includes('group companies')
  ) {
    if (knowledge.companies.length > 0) {
      const names = knowledge.companies
        .map((company) => company.name)
        .filter(Boolean)
        .join(', ');

      return `The published OS Group companies are: ${names}.`;
    }

    return 'I can help you explore the companies that form OS Group.';
  }

  if (
    text.includes('industry') ||
    text.includes('industries') ||
    text.includes('sector')
  ) {
    if (knowledge.industries.length > 0) {
      const names = knowledge.industries
        .map((industry) => industry.name)
        .filter(Boolean)
        .join(', ');

      return `OS Group has published information covering these industries: ${names}.`;
    }

    return 'I can help you explore the industries in which OS Group operates.';
  }

  if (
    text.includes('project') ||
    text.includes('projects')
  ) {
    if (knowledge.projects.length > 0) {
      const names = knowledge.projects
        .map((project) => project.name)
        .filter(Boolean)
        .join(', ');

      return `Published OS Group projects include: ${names}. Ask me about a specific project for more details.`;
    }

    return 'I can help you explore OS Group projects and their available details.';
  }

  if (
    text.includes('career') ||
    text.includes('careers') ||
    text.includes('job') ||
    text.includes('jobs') ||
    text.includes('vacancy') ||
    text.includes('vacancies') ||
    text.includes('work with')
  ) {
    if (knowledge.jobs.length > 0) {
      const positions = knowledge.jobs
        .map((job) => job.position)
        .filter(Boolean)
        .join(', ');

      return `The currently published opportunities include: ${positions}. Please visit the Careers section for application details.`;
    }

    return 'Please visit the Careers section to see current OS Group opportunities.';
  }

  if (
    text.includes('contact') ||
    text.includes('email') ||
    text.includes('phone') ||
    text.includes('reach')
  ) {
    const contacts = knowledge.companies
      .map((company) => {
        const details = [];

        if (company.name) {
          details.push(company.name);
        }

        if (company.email) {
          details.push(`Email: ${company.email}`);
        }

        if (company.phone) {
          details.push(`Phone: ${company.phone}`);
        }

        if (company.headquarters) {
          details.push(`Headquarters: ${company.headquarters}`);
        }

        return details.join(' | ');
      })
      .filter(Boolean);

    if (contacts.length > 0) {
      return (
        `Here is the published contact information I found:\n\n` +
        contacts.join('\n')
      );
    }

    return 'Please visit the Contact page for the latest OS Group contact information.';
  }

  if (
    text.includes('team') ||
    text.includes('people') ||
    text.includes('leadership')
  ) {
    if (knowledge.team.length > 0) {
      const members = knowledge.team
        .map((member) => {
          if (!member.name) {
            return '';
          }

          return member.designation
            ? `${member.name} — ${member.designation}`
            : member.name;
        })
        .filter(Boolean)
        .join(', ');

      return `Our published team information includes: ${members}.`;
    }

    return 'You can explore the OS Group People section to learn about our team and leadership.';
  }

  if (
    text.includes('faq') ||
    text.includes('frequently asked')
  ) {
    if (knowledge.faqs.length > 0) {
      return `I found ${knowledge.faqs.length} published FAQs in the OS Group knowledge base. Ask me a specific question and I’ll try to answer it.`;
    }

    return 'Please visit the FAQ section for commonly asked questions about OS Group.';
  }

  return (
    'I can help you with OS Group information. Try asking me about ' +
    'our companies, services, industries, projects, careers, team, ' +
    'FAQs, news or contact information.'
  );
}

async function chat(req, res, next) {
  try {
    const message = req.body?.message || req.body?.question;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid message.',
      });
    }

    const cleanMessage = message.trim();

    if (!cleanMessage) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a message.',
      });
    }

    if (cleanMessage.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be 1000 characters or less.',
      });
    }

    const knowledge = await buildKnowledge();

    const knowledgeText = createKnowledgeText(knowledge);

    console.log(
      `Chatbot request received: "${cleanMessage}"`
    );

    console.log(
      `Chatbot knowledge loaded: ${knowledgeText.length} characters`
    );

    /*
     * Current stage:
     * The chatbot is database-grounded and uses OS Group
     * information for its responses.
     *
     * An external AI provider can be connected here later
     * using a server-side API key. The key must NEVER be placed
     * inside the React frontend.
     */

    const reply = fallbackReply(
      cleanMessage,
      knowledge
    );

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error(
      'CHATBOT ERROR:',
      error.message
    );

    console.error(error.stack);

    return next(error);
  }
}

module.exports = {
  chat,
};