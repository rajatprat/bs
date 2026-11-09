import {bookBase, chapterUrl, chapters, subject, units, unitUrl, weekKeys} from '../../lib/genai-book';

export function BookBreadcrumbs({unit, chapter, archive}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Subjects</a><span aria-hidden="true">/</span>
      <a href={bookBase}>{subject}</a>
      {unit && <><span aria-hidden="true">/</span>{chapter
        ? <a href={unitUrl(unit)}>{units[unit].label}</a>
        : <span aria-current="page">{units[unit].label}</span>}</>}
      {archive && <><span aria-hidden="true">/</span><span aria-current="page">Original notes</span></>}
    </nav>
  );
}

export function ChapterLinks({items}) {
  return <ul className="genai-chapter-links">
    {items.map(chapter => <li key={chapter.slug}>
      <a href={chapterUrl(chapter.slug)}>
        <span>{chapter.title}</span>
      </a>
    </li>)}
  </ul>;
}

export function BookUnit({unit}) {
  const {label, title, description, groups, primers} = units[unit];
  const items = chapters.filter(chapter => chapter.unit === unit);
  const index = weekKeys.indexOf(unit);
  let offset = 0;
  const lessonGroups = groups.map(([heading, count]) => {
    const lessons = items.slice(offset, offset + count);
    offset += count;
    return {heading, lessons};
  });
  return (
    <main id="main" className="week-page genai-unit">
      <BookBreadcrumbs unit={unit}/>
      <div className="eyebrow">Generative AI from Scratch · {label}</div>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
      <div className="genai-actions">
        <a className="primary" href={chapterUrl(items[0].slug)}>Start {index < 0 ? 'foundations' : label} →</a>
        <a href="#study-review">{index < 0 ? 'Jump to revision' : 'Jump to practice and revision'}</a>
      </div>
      {primers && <aside className="genai-prereqs">
        <h2>Refresh a prerequisite</h2>
        <ChapterLinks items={primers.map(slug => chapters.find(chapter => chapter.slug === slug))}/>
      </aside>}
      {lessonGroups.map(({heading, lessons}, i) => <section className="genai-group" key={heading}>
        <div className="eyebrow">Step {i + 1}</div>
        <h2>{heading}</h2>
        <ChapterLinks items={lessons}/>
      </section>)}
      <section className="genai-group" id="study-review">
        <h2>{index < 0 ? 'Check your foundations' : 'Practise and revise'}</h2>
        <ChapterLinks items={items.slice(offset)}/>
      </section>
      <nav className="week-pagination" aria-label="Course weeks">
        <a href={index > 0 ? unitUrl(weekKeys[index - 1]) : bookBase}>{index > 0 ? '← Previous week' : '← Course overview'}</a>
        {index < weekKeys.length - 1 && <a href={unitUrl(weekKeys[index + 1])}>{index < 0 ? 'Go to Week 1' : 'Next week'} →</a>}
      </nav>
      {index >= 0 && index < 2 && <p className="genai-archive-link"><a href={bookBase + 'archive/' + unit + '/'}>Open the original {label} notes</a></p>}
    </main>
  );
}
