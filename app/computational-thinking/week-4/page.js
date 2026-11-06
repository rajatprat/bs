import data from '../../../data/computational-thinking-week-4.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
import {pageMetadata} from '../../../lib/seo';
export const metadata=pageMetadata('/computational-thinking/week-4/');
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs"><a href="/">Subjects</a><span>/</span><a href="/computational-thinking/">Computational Thinking</a><span>/</span><span>Week 4</span></nav><div className="eyebrow">FOUNDATION · WEEK 04</div><h1>{data.title}</h1><p className="lead">{data.description} Connect the patterns from Weeks 1–3 and prepare for the four-week review.</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Week 4 →</a><WeekSections data={data}/></main>}
