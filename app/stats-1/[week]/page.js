import {stats1ByWeek as weeks} from '../../../lib/stats-1';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
import {pageMetadata} from '../../../lib/seo';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return Object.keys(weeks).map(week=>({week}));}
export async function generateMetadata({params}){const {week}=await params;return pageMetadata('/stats-1/'+week+'/');}
export default async function Week({params}){const {week}=await params;const data=weeks[week];if(!data)notFound();return <main id="main" className="week-page"><nav className="breadcrumbs"><a href="/">Subjects</a><span>/</span><a href="/stats-1/">Statistics 1 · Foundation</a><span>/</span><span>Week {data.week}</span></nav><div className="eyebrow">FOUNDATION · WEEK 0{data.week}</div><h1>{data.title}</h1><p className="lead">{data.description}</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start this week →</a><WeekSections data={data}/></main>}
