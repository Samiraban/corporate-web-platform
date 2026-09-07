import { useEffect } from 'react';

const SITE_NAME = 'OS Group of Company';
const DEFAULT_DESCRIPTION =
  'OS Group of Company — a diversified group of companies operating across multiple industries.';
const DEFAULT_IMAGE = '/og-image.jpg';

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Sets document title + meta description/canonical/Open Graph/Twitter tags
 * for the current route. This is a plain DOM-based stand-in for
 * react-helmet-async (no extra dependency needed) — it runs client-side
 * only, so it improves link previews/tab titles and helps crawlers that
 * execute JS (e.g. Googlebot), but it is NOT a substitute for real SSR/
 * prerendering if social-media unfurlers or non-JS crawlers matter for
 * this site (see SEO report).
 */
export default function SEO({ title, description = DEFAULT_DESCRIPTION, image = DEFAULT_IMAGE, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:url', window.location.href);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setLink('canonical', window.location.origin + window.location.pathname);
  }, [title, description, image, noindex]);

  return null;
}
