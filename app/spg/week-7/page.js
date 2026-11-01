import {pageMetadata} from '../../../lib/seo';
import data from '../../../data/spg-week-7.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
export const metadata = pageMetadata("/spg/week-7/");
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Subjects</a><span>/</span><a href="/spg/">SPG</a><span>/</span><span>Week 7</span></nav><div className="eyebrow">BSGN3001 · WEEK 7</div><h1>Make sense of money.<br/><span>Plan your future.</span></h1><p className="lead">Study personal finance, cash flow, inflation, compounding, tax, and investing through the course examples.</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Lesson 1 →</a><WeekSections data={data}/></main>}
