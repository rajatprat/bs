import data from '../../../../data/genai-week-2.json';
import Lesson from '../../../../components/Lesson';
import {pageMetadata} from '../../../../lib/seo';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return data.sections.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}){const {slug}=await params;return pageMetadata(data.base+slug+'/');}
export default async function Page({params}){const {slug}=await params;if(!data.sections.some(s=>s.slug===slug))notFound();return <Lesson data={data} slug={slug}/>;}
