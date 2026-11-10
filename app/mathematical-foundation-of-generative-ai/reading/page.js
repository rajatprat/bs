import {bookMetadata} from '../../../lib/genai-book';
import {beginnerLessons} from './beginner-lessons';
import {BookBreadcrumbs} from '../book-ui';
import {introductions, readingUrl, readingWeeks, weekPracticeUrl} from './reading-data';

export const metadata = bookMetadata('Generative AI from Scratch', 'Read all four weeks with worked examples, a glossary and interactive BS Notes practice.', readingUrl());

export default function ReadingIndex() {
  return <main id="main" className="week-page genai-reader">
    <BookBreadcrumbs/>
    <div className="genai-topic-heading">
      <div className="eyebrow">Four weeks · A beginner’s reading path</div>
      <h1>Generative AI from Scratch</h1>
      <p className="lead">Start with familiar examples and work up to how a computer learns to make pictures. Each lesson starts with a worked example and questions you can try. Open the detailed explanation when you want to go deeper.</p>
    </div>
    <div className="genai-actions">
      <a className="primary" href={readingUrl('1')}>Start reading →</a>
      <a href={readingUrl('glossary')}>Glossary and symbol sheet</a>
    </div>
    {readingWeeks.map(({label, intro, chapters: slugs}, index) => {
      const bookIntros = introductions.filter(item => slugs.includes(String(item.start)));
      return <section className="genai-group" id={'week-' + (index + 1)} key={label}>
        <div className="eyebrow">Week {index + 1}</div>
        <h2>{label}</h2>
        <p>{intro}</p>
        {bookIntros.length > 0 && <details>
          <summary>More about this week</summary>
          {bookIntros.map(item => <div key={item.start} className="machines-text" dangerouslySetInnerHTML={{__html:item.html}}/>)}
        </details>}
        <ol className="genai-chapter-links" start={Number(slugs[0])}>
          {slugs.map(slug => <li key={slug}><a href={readingUrl(slug)}>{beginnerLessons[slug].question}</a></li>)}
        </ol>
        <p><a href={weekPracticeUrl(index + 1)}>BS Notes practice and revision →</a></p>
      </section>;
    })}
    <p><a href={readingUrl('recap')}>Review the whole journey on one page →</a></p>
  </main>;
}
