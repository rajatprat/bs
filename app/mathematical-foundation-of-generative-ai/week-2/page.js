import data from '../../../data/genai-week-2.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
import {pageMetadata} from '../../../lib/seo';
export const metadata=pageMetadata('/mathematical-foundation-of-generative-ai/week-2/');
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs"><a href="/">Subjects</a><span>/</span><a href="/mathematical-foundation-of-generative-ai/">{data.subject}</a><span>/</span><span>Week 2</span></nav><div className="eyebrow">WEEK 02 · TOPIC 01 AVAILABLE</div><h1>{data.title}</h1><p className="lead">{data.description}</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Topic 1 →</a><WeekSections data={data}/></main>}
