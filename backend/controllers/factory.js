const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const logAudit = require('../utils/logAudit');
const escapeRegex = require('../utils/escapeRegex');

/**
 * Generic CRUD factory used by most simple content modules (Industry,
 * ServiceCategory, Award, Partner, Testimonial, FAQ, TeamMember, etc).
 * Modules with extra logic (auth, documents, careers, inquiries) have
 * their own dedicated controllers.
 *
 * options:
 *  - moduleName: string used in audit logs, e.g. 'Industry'
 *  - searchFields: array of field names supported by ?search=
 *  - populate: mongoose populate string/object passed to find/findById
 *  - defaultSort: default sort string, e.g. '-createdAt'
 */
const buildCrudController = (Model, options = {}) => {
  const { moduleName = Model.modelName, searchFields = [], populate, defaultSort = '-createdAt' } = options;

  const getAll = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, sort, search, ...filters } = req.query;

    const query = { ...filters };
    if (search && searchFields.length) {
      const safeSearch = escapeRegex(search);
      query.$or = searchFields.map((field) => ({
        [field]: { $regex: safeSearch, $options: 'i' },
      }));
    }

    let dbQuery = Model.find(query).sort(sort || defaultSort);
    if (populate) dbQuery = dbQuery.populate(populate);

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      dbQuery.skip(skip).limit(limitNum),
      Model.countDocuments(query),
    ]);

    res.json({
      success: true,
      count: items.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: items,
    });
  });

  const getOne = asyncHandler(async (req, res) => {
    let dbQuery = Model.findById(req.params.id);
    if (populate) dbQuery = dbQuery.populate(populate);
    const item = await dbQuery;
    if (!item) throw new ApiError(404, `${moduleName} not found`);
    res.json({ success: true, data: item });
  });

  const getBySlug = asyncHandler(async (req, res) => {
    let dbQuery = Model.findOne({ slug: req.params.slug });
    if (populate) dbQuery = dbQuery.populate(populate);
    const item = await dbQuery;
    if (!item) throw new ApiError(404, `${moduleName} not found`);
    res.json({ success: true, data: item });
  });

  const createOne = asyncHandler(async (req, res) => {
    const payload = { ...req.body };
    if (req.user) {
      payload.createdBy = req.user._id;
      payload.updatedBy = req.user._id;
    }
    const item = await Model.create(payload);
    await logAudit({
      req,
      action: 'CREATE',
      module: moduleName,
      targetId: item._id,
      description: `Created ${moduleName}`,
    });
    res.status(201).json({ success: true, data: item });
  });

  const updateOne = asyncHandler(async (req, res) => {
    const payload = { ...req.body };
    if (req.user) payload.updatedBy = req.user._id;
    const item = await Model.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!item) throw new ApiError(404, `${moduleName} not found`);
    await logAudit({
      req,
      action: 'UPDATE',
      module: moduleName,
      targetId: item._id,
      description: `Updated ${moduleName}`,
    });
    res.json({ success: true, data: item });
  });

  const deleteOne = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) throw new ApiError(404, `${moduleName} not found`);
    await logAudit({
      req,
      action: 'DELETE',
      module: moduleName,
      targetId: req.params.id,
      description: `Deleted ${moduleName}`,
    });
    res.json({ success: true, data: {} });
  });

  const reorder = asyncHandler(async (req, res) => {
    // body: [{ id, order }, ...]
    const updates = req.body.items || [];
    await Promise.all(
      updates.map(({ id, order }) => Model.findByIdAndUpdate(id, { order }))
    );
    res.json({ success: true, message: 'Order updated' });
  });

  return { getAll, getOne, getBySlug, createOne, updateOne, deleteOne, reorder };
};

module.exports = buildCrudController;
