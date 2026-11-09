import {notFound} from 'next/navigation';
import {bookMetadata, chapterUrl, chapters, units, unitUrl} from '../../../../lib/genai-book';
import {BookBreadcrumbs} from '../../book-ui';

export const dynamicParams = false;
export function generateStaticParams() {
  return chapters.map(({slug}) => ({slug}));
}

export async function generateMetadata({params}) {
  const {slug} = await params;
  const chapter = chapters.find(item => item.slug === slug);
  if (!chapter) notFound();
  return bookMetadata(chapter.title, units[chapter.unit].description, chapterUrl(slug));
}

export default async function Chapter({params}) {
  const {slug} = await params;
  const chapter = chapters.find(item => item.slug === slug);
  if (!chapter) notFound();
  const {unit, title, sections, html} = chapter;
  const sequence = chapters.filter(item => item.unit === unit);
  const index = sequence.indexOf(chapter);
  const previous = sequence[index - 1];
  const next = sequence[index + 1];
  return (
    <main id="main" className="week-page genai-reader">
      <BookBreadcrumbs unit={unit} chapter/>
      <header>
        <div className="eyebrow">{units[unit].label}</div>
        <h1>{title}</h1>
        <a href={unitUrl(unit)}>← Back to {units[unit].label.toLowerCase()}</a>
      </header>
      {sections.length > 0 && <details className="genai-contents">
        <summary>On this page</summary>
        <ul>{sections.map(section => <li key={section.id}><a href={'#' + section.id}>{section.title}</a></li>)}</ul>
      </details>}
      <article className="genai-book-body" dangerouslySetInnerHTML={{__html: html}}/>
      <nav className="week-pagination" aria-label="Topic navigation">
        <a href={previous ? chapterUrl(previous.slug) : unitUrl(unit)}>{previous ? '← ' + previous.title : '← ' + units[unit].label}</a>
        {next && <a href={chapterUrl(next.slug)}>{next.title} →</a>}
      </nav>
    </main>
  );
}
