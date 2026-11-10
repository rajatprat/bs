import {bookMetadata} from '../../../lib/genai-book';
import {BookBreadcrumbs} from '../book-ui';
import {chapters, introductions, readingUrl, readingWeeks, weekPracticeUrl} from './reading-data';

export const metadata = bookMetadata('Machines That Imagine', 'Read all four weeks with worked examples, a glossary and interactive BS Notes practice.', readingUrl());

export default function ReadingIndex() {
  return <main id="main" className="week-page genai-reader">
    <BookBreadcrumbs/>
    <div className="genai-topic-heading">
      <div className="eyebrow">Four weeks · A beginner’s reading path</div>
      <h1>Machines That Imagine</h1>
      <p className="lead">Start with everyday examples, then work up to the math behind GANs. Try the book’s questions and use the BS Notes activities to see what changes when you change the numbers.</p>
    </div>
    <div className="genai-actions">
      <a className="primary" href={readingUrl('1')}>Start reading →</a>
      <a href={readingUrl('glossary')}>Glossary and symbol sheet</a>
    </div>
    {readingWeeks.map(({label, chapters: slugs}, index) => {
      const intro = introductions.filter(item => slugs.includes(String(item.start)));
      return <section className="genai-group" id={'week-' + (index + 1)} key={label}>
        <div className="eyebrow">Week {index + 1}</div>
        <h2>{label}</h2>
        {intro.length > 0 && <details>
          <summary>About this part</summary>
          {intro.map(item => <div key={item.start} className="machines-text" dangerouslySetInnerHTML={{__html:item.html}}/>)}
        </details>}
        <ol className="genai-chapter-links" start={Number(slugs[0])}>
          {slugs.map(slug => <li key={slug}><a href={readingUrl(slug)}>{chapters[slug].title}</a></li>)}
        </ol>
        <p><a href={weekPracticeUrl(index + 1)}>BS Notes practice and revision →</a></p>
      </section>;
    })}
    <p><a href={readingUrl('recap')}>Review the whole journey on one page →</a></p>
  </main>;
}
