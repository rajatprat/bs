import {pageMetadata} from '../../../lib/seo';
import data from '../../../data/spg-week-10.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
export const metadata = pageMetadata("/spg/week-10/");
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Subjects</a><span>/</span><a href="/spg/">SPG</a><span>/</span><span>Week 10</span></nav><div className="eyebrow">BSGN3001 · WEEK 10</div><h1>See the whole system.<br/><span>Understand the connections.</span></h1><p className="lead">Explore systems, mental models, feedback loops, delays, and habits for seeing the bigger picture.</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Lesson 1 →</a><WeekSections data={data}/></main>}
