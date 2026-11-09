import { pageMetadata } from '../../../lib/seo';
import data from '../../../data/algorithms-week-4.json';
import WeekSections, { WeekStats } from '../../../components/WeekSections';
import AlgorithmsBlocks from '../../../components/AlgorithmsBlocks';

export const metadata = pageMetadata(data.base);

export default function Week() {
  return (
    <main id="main" className="week-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Subjects</a><span>/</span>
        <a href="/algorithms-in-data-science/">{data.subject}</a><span>/</span>
        <span>Week 4</span>
      </nav>
      <div className="eyebrow">WEEK 04</div>
      <h1>Find the main directions.<br/><span>Work with a smaller matrix.</span></h1>
      <p className="lead">Learn how SVD and PCA describe data, then use random sketches to approximate a large matrix.</p>
      <WeekStats data={data}/>
      <a className="primary" href={data.base + data.sections[0].slug + '/'}>Start with the visual detour →</a>
      <section className="study-note"><AlgorithmsBlocks blocks={data.intro}/></section>
      <WeekSections data={data}/>
    </main>
  );
}
