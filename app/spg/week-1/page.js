import {pageMetadata} from '../../../lib/seo';
import data from '../../../data/spg-week-1.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
export const metadata = pageMetadata("/spg/week-1/");
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Subjects</a><span>/</span><a href="/spg/">SPG</a><span>/</span><span>Week 1</span></nav><div className="eyebrow">BSGN3001 · WEEK 1</div><h1>Work together.<br/><span>Grow as a team.</span></h1><p className="lead">Explore outbound training, teamwork, the 10 C’s, and continuous improvement through practical examples.</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Lesson 1 →</a><WeekSections data={data}/></main>}
