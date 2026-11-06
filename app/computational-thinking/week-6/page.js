import data from '../../../data/computational-thinking-week-6.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
import {pageMetadata} from '../../../lib/seo';
export const metadata=pageMetadata('/computational-thinking/week-6/');
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs"><a href="/">Subjects</a><span>/</span><a href="/computational-thinking/">Computational Thinking</a><span>/</span><span>Week 6</span></nav><div className="eyebrow">FOUNDATION · WEEK 06</div><h1>{data.title}</h1><p className="lead">{data.description} Build on Week 5 lists and use ordered, structured results for new questions.</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Week 6 →</a><WeekSections data={data}/></main>}
