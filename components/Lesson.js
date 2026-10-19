import StatisticsBlocks from './StatisticsBlocks';
import { additionsFor } from '../lib/review-additions';
import Blocks from './Blocks';
import AlgorithmsBlocks from './AlgorithmsBlocks';
import MathLesson from './MathLesson';
import { headings, isResource, studySections, resources, courseWeeks } from '../lib/course';
function SectionLinks({ sections, week, current, base, resource = false }) {
  return <nav aria-label={resource ? `Week ${week} revision and practice` : `Week ${week} study sections`}>{sections.map((s, i) => <a key={s.slug} aria-current={s.slug === current ? 'page' : undefined} className={s.slug === current ? 'active' : ''} href={base+s.slug+'/'}><span>{resource ? '↗' : String(i + 1).padStart(2, '0')}</span>{s.title}</a>)}</nav>;
}
export default function Lesson({ data, slug }) {
  const week = data.week;
  const weeks = data.courseWeeks || courseWeeks;
  const nextWeek = weeks[weeks.indexOf(week)+1];
  const subjectPath = '/' + (data.subjectSlug || 'software-engineering') + '/';
  const section = data.sections.find(s => s.slug === slug);
  const studies = studySections(data), extras = resources(data);
  const sequence = isResource(section) ? extras : studies;
  const index = sequence.findIndex(s => s.slug === slug);
  const contents = headings(section.blocks);
  const base = data.base || `/software-engineering/week-${week}/`;
  const navigation = <><SectionLinks sections={studies} week={week} current={slug} base={base}/>{extras.length > 0 && <><h3 className="resource-label">Revision and practice</h3><SectionLinks sections={extras} week={week} current={slug} base={base} resource/></>}</>;
  return <div className={`reading-layout${data.subjectSlug === 'algorithms-in-data-science' ? ' algorithms-reading-layout' : ''}`}><aside className="course-sidebar">
    <a className="back-week" href={base}>← {data.part ? `Part ${data.part}` : `Week ${week}`} overview</a><div className="eyebrow">{data.subject}</div><h2>Week {String(week).padStart(2, '0')}{data.part ? ` · Part ${data.part}` : ''}</h2>
    <div className="desktop-week-nav">{navigation}</div><details className="mobile-week-nav"><summary>Browse this week</summary>{navigation}</details>
  </aside><main id="main" className="lesson">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Subjects</a><span aria-hidden="true">/</span><a href={subjectPath}>{data.subject}</a><span aria-hidden="true">/</span><a href={data.part ? `${subjectPath}week-${week}/` : base}>Week {week}</a>{data.part && <><span aria-hidden="true">/</span><a href={base}>Part {data.part}</a></>}</nav>
    <div className="eyebrow">{isResource(section) ? 'REVISION AND PRACTICE' : `SECTION ${String(index + 1).padStart(2, '0')} / ${studies.length}`}</div><h1>{section.title}</h1>
    {contents.length > 0 && <details className="lesson-contents" open={data.subjectSlug !== 'algorithms-in-data-science'}><summary>On this page <span>{contents.length} headings</span></summary><nav aria-label="On this page"><ol>{contents.map(item => <li key={item.id} className={item.nested ? 'nested' : ''}><a href={`#${item.id}`}>{item.text}</a></li>)}</ol></nav></details>}
    {data.subjectSlug === 'statistics' ? <StatisticsBlocks blocks={section.blocks}/> : data.subjectSlug === 'algorithms-in-data-science' ? <AlgorithmsBlocks blocks={section.blocks}/> : data.subjectSlug === 'mathematical-foundation-of-generative-ai' ? <MathLesson blocks={section.blocks}/> : <Blocks blocks={section.blocks} additions={data.subjectSlug ? [] : additionsFor(week,slug,section.blocks)}/>}
    <a className="back-top" href="#main">Back to top ↑</a>
    <nav className="lesson-pagination" aria-label="Previous and next sections">
      {index > 0 ? <a href={base + sequence[index-1].slug + '/'}><small>PREVIOUS SECTION</small>{sequence[index-1].title}</a> : <a href={base}><small>START HERE</small>{data.part ? `Part ${data.part}` : `Week ${week}`} overview</a>}
      {index < sequence.length-1 ? <a href={base + sequence[index+1].slug + '/'}><small>NEXT SECTION</small>{sequence[index+1].title}</a> : !isResource(section) && extras.length ? <a href={base + extras[0].slug + '/'}><small>REVIEW THIS WEEK</small>{extras[0].title}</a> : data.part === 1 ? <a href={base.replace('part-1','part-2')}><small>CONTINUE WEEK 1</small>Part 2 · Convex conjugates and variational optimization</a> : nextWeek ? <a href={`${subjectPath}week-${nextWeek}/`}><small>NEXT WEEK</small>Week {nextWeek} overview</a> : <a href={subjectPath}><small>COURSE LIBRARY</small>All weeks</a>}
    </nav>
  </main></div>;
}
