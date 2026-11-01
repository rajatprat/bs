import data from '../../../data/spg-week-4.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
export const metadata={title:'SPG Week 4 · Leadership and personal growth'};
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Subjects</a><span>/</span><a href="/spg/">SPG</a><span>/</span><span>Week 4</span></nav><div className="eyebrow">BSGN3001 · WEEK 4</div><h1>Lead yourself.<br/><span>Help others grow.</span></h1><p className="lead">Explore values, ownership, resilience, delegation, and how to help others lead themselves.</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Lesson 1 →</a><WeekSections data={data}/></main>}
