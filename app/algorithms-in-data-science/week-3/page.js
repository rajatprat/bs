import { pageMetadata } from '../../../lib/seo';
import data from '../../../data/algorithms-week-3.json';
import WeekSections, { WeekStats } from '../../../components/WeekSections';
import AlgorithmsBlocks from '../../../components/AlgorithmsBlocks';

export const metadata = pageMetadata(data.base);

export default function Week() {
  return (
    <main id="main" className="week-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Subjects</a><span>/</span>
        <a href="/algorithms-in-data-science/">{data.subject}</a><span>/</span>
        <span>Week 3</span>
      </nav>
      <div className="eyebrow">WEEK 03</div>
      <h1>Find nearby points.<br/><span>Search fewer candidates.</span></h1>
      <p className="lead">Use locality-sensitive hashing to give nearby points a better chance of landing in the same bucket.</p>
      <WeekStats data={data}/>
      <a className="primary" href={data.base + data.sections[0].slug + '/'}>Start with nearest neighbours →</a>
      <section className="study-note"><AlgorithmsBlocks blocks={data.intro}/></section>
      <WeekSections data={data}/>
    </main>
  );
}
