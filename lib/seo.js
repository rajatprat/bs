import pages from '../data/seo-pages.json';
export const siteUrl = 'https://bs-content.17goel.workers.dev';
export function pageMetadata(path) {
  const page = pages[path];
  if (!page) return {};
  return {title:{absolute:page.title+' | BSNotes.in'}, description:page.description,
    alternates:{canonical:siteUrl+path},
    openGraph:{type:'website',siteName:'BSNotes.in',url:siteUrl+path,title:page.title,description:page.description},
    twitter:{card:'summary',title:page.title,description:page.description}};
}
export function jsonLd(value) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
