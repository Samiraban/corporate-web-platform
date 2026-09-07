const asyncHandler = require('../utils/asyncHandler');
const { Settings } = require('../models/Misc');
const logAudit = require('../utils/logAudit');

// Settings are stored as flexible key/value documents so Super Admin can
// manage homepage sections, menus, footer, announcement bar, popups,
// social links, and general site info without schema changes
// (Sections 3, 13, 14, 15).

// @desc  Get all settings (or one by key) — public-readable, since the
//        frontend needs these to render the site
// @route GET /api/settings  or  /api/settings/:key
const getSettings = asyncHandler(async (req, res) => {
  if (req.params.key) {
    const setting = await Settings.findOne({ key: req.params.key });
    return res.json({ success: true, data: setting?.value ?? null });
  }
  const all = await Settings.find();
  const map = {};
  all.forEach((s) => { map[s.key] = s.value; });
  res.json({ success: true, data: map });
});

// @desc  Upsert a settings key (Super Admin / Admin only)
// @route PUT /api/settings/:key
const updateSetting = asyncHandler(async (req, res) => {
  const setting = await Settings.findOneAndUpdate(
    { key: req.params.key },
    { value: req.body.value, updatedBy: req.user._id },
    { new: true, upsert: true, runValidators: true }
  );
  await logAudit({
    req,
    action: 'UPDATE',
    module: 'Settings',
    targetId: setting._id,
    description: `Updated setting "${req.params.key}"`,
  });
  res.json({ success: true, data: setting.value });
});

module.exports = { getSettings, updateSetting };
