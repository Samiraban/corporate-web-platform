import DOMPurify from 'dompurify';

/**
 * Sanitizes admin-authored rich-text HTML (blog posts, news articles, etc.)
 * before it is rendered with dangerouslySetInnerHTML. Without this, a
 * compromised or careless admin/editor account could inject a stored XSS
 * payload that executes in every visitor's browser.
 */
export function sanitizeHtml(html) {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li',
      'h2', 'h3', 'h4', 'blockquote', 'img', 'figure', 'figcaption',
      'code', 'pre', 'span', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'class'],
  });
}
