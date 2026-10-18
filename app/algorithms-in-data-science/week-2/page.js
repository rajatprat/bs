import data from '../../../data/algorithms-week-2.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
import Blocks from '../../../components/AlgorithmsBlocks';
export const metadata={title:'Algorithms in Data Science · Week 2'};
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs"><a href="/">Subjects</a><span>/</span><a href="/algorithms-in-data-science/">{data.subject}</a><span>/</span><span>Week 2</span></nav><div className="eyebrow">WEEK 02</div><h1>Finish the proof.<br/><span>Understand the geometry.</span></h1><p className="lead">Chernoff bounds, preserving every pair, and the SVD view of random projection.</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Begin with the recap →</a><section className="study-note"><Blocks blocks={data.intro}/></section><WeekSections data={data}/></main>}
