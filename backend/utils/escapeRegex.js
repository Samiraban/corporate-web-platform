// Escapes regex metacharacters in user-supplied search input before it is
// used inside a MongoDB $regex query. Without this, a crafted query string
// (e.g. containing nested quantifiers) can trigger catastrophic
// backtracking (ReDoS) or match unintended documents.
const escapeRegex = (str = '') => String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

module.exports = escapeRegex;
