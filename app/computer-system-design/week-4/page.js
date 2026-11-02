import data from '../../../data/csd-week-4.json';
import {pageMetadata} from '../../../lib/seo';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
export const metadata=pageMetadata('/computer-system-design/week-4/');
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs"><a href="/">Subjects</a><span>/</span><a href="/computer-system-design/">Computer System Design</a><span>/</span><span>Week 4</span></nav><div className="eyebrow">CS3031 · WEEK 4</div><h1>Combinational building blocks.</h1><p className="lead">Understand digital circuits with illustrated explanations, worked examples, past-paper discussions and revision questions.</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Lesson 1 →</a><WeekSections data={data}/></main>}
