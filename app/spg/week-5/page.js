import {pageMetadata} from '../../../lib/seo';
import data from '../../../data/spg-week-5.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
export const metadata = pageMetadata("/spg/week-5/");
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Subjects</a><span>/</span><a href="/spg/">SPG</a><span>/</span><span>Week 5</span></nav><div className="eyebrow">BSGN3001 · WEEK 5</div><h1>Understand emotions.<br/><span>Resolve conflict.</span></h1><p className="lead">Build emotional intelligence, practise the 6R framework, and choose effective ways to manage conflict.</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Lesson 1 →</a><WeekSections data={data}/></main>}
