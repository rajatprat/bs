import data from '../../../data/genai-week-3.json';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
import {pageMetadata} from '../../../lib/seo';
export const metadata=pageMetadata(data.overview);
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs"><a href="/">Subjects</a><span>/</span><a href="/mathematical-foundation-of-generative-ai/">{data.subject}</a><span>/</span><span>Week 3</span></nav><div className="eyebrow">WEEK 03 · ILLUSTRATED LESSONS</div><h1>{data.title}</h1><p className="lead">{data.description}</p><WeekStats data={data}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Topic 1 →</a><WeekSections data={data}/></main>}