import images from '../data/seo-images.json';
import pages from '../data/seo-pages.json';
import {siteUrl} from '../lib/seo';
export const dynamic = 'force-static';
export default function sitemap() {return Object.keys(pages).map(path=>({url:siteUrl+path, ...(images[path] ? {images:images[path].map(src=>siteUrl+src)} : {})}));}
