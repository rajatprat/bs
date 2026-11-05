import {stats1ByWeek as weeks} from '../../../../lib/stats-1';
import Lesson from '../../../../components/Lesson';
import {pageMetadata} from '../../../../lib/seo';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return Object.entries(weeks).flatMap(([week,d])=>d.sections.map(s=>({week,slug:s.slug})));}
export async function generateMetadata({params}){const {week,slug}=await params;return pageMetadata('/stats-1/'+week+'/'+slug+'/');}
export default async function Page({params}){const {week,slug}=await params;const data=weeks[week];if(!data||!data.sections.some(s=>s.slug===slug))notFound();return <Lesson data={data} slug={slug}/>;}
