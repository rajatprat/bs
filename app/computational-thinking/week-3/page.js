import data from '../../../data/computational-thinking-week-3.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
import {pageMetadata} from '../../../lib/seo';
export const metadata=pageMetadata('/computational-thinking/week-3/');
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs"><a href="/">Subjects</a><span>/</span><a href="/computational-thinking/">Computational Thinking</a><span>/</span><span>Week 3</span></nav><div className="eyebrow">FOUNDATION · WEEK 03</div><h1>{data.title}</h1><p className="lead">{data.description} Build on the card-processing patterns from Weeks 1 and 2.</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Week 3 →</a><WeekSections data={data}/></main>}
