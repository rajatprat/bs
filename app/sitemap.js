import {chapters as genaiBook, chapterUrl, unitUrl} from '../lib/genai-book';
import images from '../data/seo-images.json';
import pages from '../data/seo-pages.json';
import {siteUrl} from '../lib/seo';
import {pdsaSections,pdsaWeek2Sections,pdsaWeek3Sections,pdsaWeek4Sections} from '../lib/pdsa';
export const dynamic = 'force-static';
export default function sitemap() {const core=Object.keys(pages).map(path=>({url:siteUrl+path, ...(images[path] ? {images:images[path].map(src=>siteUrl+src)} : {})})); const pdsa=[...pdsaSections.map(item=>'/pdsa/week-1/'+item.slug+'/'),'/pdsa/week-1/practice/',...pdsaWeek2Sections.map(item=>'/pdsa/week-2/'+item.slug+'/'),'/pdsa/week-2/practice/',...pdsaWeek3Sections.map(item=>'/pdsa/week-3/'+item.slug+'/'),'/pdsa/week-3/practice/',...pdsaWeek4Sections.map(item=>'/pdsa/week-4/'+item.slug+'/'),'/pdsa/week-4/practice/']; const genai=[unitUrl('foundations'),unitUrl('week-3'),unitUrl('week-4'),...genaiBook.map(chapter=>chapterUrl(chapter.slug))]; return [...core,...pdsa.map(path=>({url:siteUrl+path})),...genai.map(path=>({url:siteUrl+path}))];}
