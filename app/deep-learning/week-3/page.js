import DeepLearningPreparation from '../../../components/DeepLearningPreparation';
import data from '../../../data/deep-learning-week-3.json';
import {pageMetadata} from '../../../lib/seo';
import WeekSections,{WeekStats} from '../../../components/WeekSections';
export const metadata=pageMetadata('/deep-learning/week-3/');
export default function Week(){return <main id="main" className="week-page"><nav className="breadcrumbs"><a href="/">Subjects</a><span>/</span><a href="/deep-learning/">Deep Learning</a><span>/</span><span>Week 3</span></nav><div className="eyebrow">DEEP LEARNING · WEEK 3</div><h1>Feedforward networks and backpropagation.</h1><p className="lead">Learn through illustrated explanations, worked examples, practice questions and quick revision.</p><WeekStats data={data}/><DeepLearningPreparation week={3}/><a className="primary" href={data.base+data.sections[0].slug+'/'}>Start Lesson 1 →</a><WeekSections data={data}/></main>}
