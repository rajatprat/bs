import images from '../data/seo-images.json';
import pages from '../data/seo-pages.json';
import {siteUrl} from '../lib/seo';
import {pdsaSections,pdsaWeek2Sections,pdsaWeek3Sections,pdsaWeek4Sections} from '../lib/pdsa';
export const dynamic = 'force-static';
export default function sitemap() {const core=Object.keys(pages).map(path=>({url:siteUrl+path, ...(images[path] ? {images:images[path].map(src=>siteUrl+src)} : {})})); const pdsa=[...pdsaSections.map(item=>'/pdsa/week-1/'+item.slug+'/'),'/pdsa/week-1/practice/',...pdsaWeek2Sections.map(item=>'/pdsa/week-2/'+item.slug+'/'),...pdsaWeek3Sections.map(item=>'/pdsa/week-3/'+item.slug+'/'),...pdsaWeek4Sections.map(item=>'/pdsa/week-4/'+item.slug+'/')]; return [...core,...pdsa.map(path=>({url:siteUrl+path}))];}
