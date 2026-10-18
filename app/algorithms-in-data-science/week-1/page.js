import data from '../../../data/algorithms-week-1.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
import Blocks from '../../../components/AlgorithmsBlocks';
export const metadata={title:'Algorithms in Data Science · Week 1'};
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs"><a href="/">Subjects</a><span>/</span><a href="/algorithms-in-data-science/">{data.subject}</a><span>/</span><span>Week 1</span></nav><div className="eyebrow">WEEK 01</div><h1>Probability bounds.<br/><span>Random projections.</span></h1><p className="lead">From controlling uncertainty to preserving distances in fewer dimensions.</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start with the toolkit →</a><section className="study-note"><Blocks blocks={data.intro}/></section><WeekSections data={data}/></main>}
