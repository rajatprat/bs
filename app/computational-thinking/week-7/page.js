import data from '../../../data/computational-thinking-week-7.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
import {pageMetadata} from '../../../lib/seo';
export const metadata=pageMetadata('/computational-thinking/week-7/');
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs"><a href="/">Subjects</a><span>/</span><a href="/computational-thinking/">Computational Thinking</a><span>/</span><span>Week 7</span></nav><div className="eyebrow">FOUNDATION · WEEK 07</div><h1>{data.title}</h1><p className="lead">{data.description} Reuse course datasets and choose keys and values that answer the next question.</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Week 7 →</a><WeekSections data={data}/></main>}
