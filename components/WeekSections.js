import { resources, studySections, imageCount, courseWeeks } from '../lib/course';
export function WeekStats({ data }) { return <div className="pills"><span>{studySections(data).length} study sections</span><span>{imageCount(data)} illustrations</span><span>{resources(data).length} {resources(data).length === 1 ? 'resource' : 'resources'}</span></div>; }
export default function WeekSections({ data }) {
  const subjectPath = '/' + (data.subjectSlug || 'software-engineering') + '/';
  const base = data.base || `/software-engineering/week-${data.week}/`;
  const weeks = data.courseWeeks || courseWeeks;
  const extras = resources(data);
  const position = weeks.indexOf(data.week), previous = weeks[position-1], next = weeks[position+1];
  return <><div className="section-label"><h2>Study sections</h2><span>Follow the order or choose a section</span></div><div className="topic-grid">{studySections(data).map((s, i) => {
    const preview = s.blocks.find(b => ['paragraph', 'bullet-item', 'html'].includes(b.type))?.text?.replace(/^The idea\s*/, '') || '';
    return <a className="topic-card" key={s.slug} href={base+s.slug+'/'}><span className="topic-number">{String(i+1).padStart(2,'0')}</span><h3>{s.title}</h3><p>{preview.length > 135 ? preview.slice(0,135).trimEnd()+'…' : preview}</p><span className="topic-meta">{s.blocks.reduce((n,b)=>n+(b.type==='image'?1:b.type==='html'?(b.html.match(/<img /g)||[]).length:0),0)} illustrations <span aria-hidden="true">· Open section →</span></span></a>;
  })}</div>{extras.length > 0 && <section className="week-resources" aria-labelledby="resource-title"><div className="section-label"><h2 id="resource-title">Revision and practice</h2><span>Review and practice material</span></div><div className="resource-grid">{extras.map(s=><a className="resource-card" key={s.slug} href={base+s.slug+'/'}><h3>{s.title}</h3><span>Open resource →</span></a>)}</div></section>}
  <nav className="week-pagination" aria-label="Course weeks">{data.part === 2 && <a href={base.replace('part-2','part-1')}>← Part 1</a>}{previous ? <a href={`${subjectPath}week-${previous}/`}>← Week {previous}</a> : <a href={subjectPath}>← All weeks</a>}{data.part === 1 && <a href={base.replace('part-1','part-2')}>Continue to Part 2 →</a>}{next && <a href={`${subjectPath}week-${next}/`}>Week {next} →</a>}</nav></>;
}
