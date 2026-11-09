import {bookBase, bookMetadata, chapters, chapterUrl, subject, units, unitUrl, weekKeys} from '../../lib/genai-book';
import {ChapterLinks} from './book-ui';

export const metadata = bookMetadata(subject, 'Study the first four weeks through worked examples, illustrated lessons, practice questions, and optional math foundations.', bookBase);

export default function Subject() {
  return (
    <main id="main" className="home genai-course">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Subjects</a><span aria-hidden="true">/</span><span>{subject}</span></nav>
      <div className="eyebrow">BS Course · Generative AI from Scratch</div>
      <h1>Mathematical Foundation<br/><span>of Generative AI.</span></h1>
      <p className="lead">Start with distributions and work up to training, adapting, and evaluating GANs. Each week includes worked examples, practice, and revision.</p>
      <div className="genai-actions">
        <a className="primary" href={unitUrl('week-1')}>Start Week 1 →</a>
        <a href={unitUrl('foundations')}>Refresh the math first</a>
      </div>
      <section aria-labelledby="genai-weeks">
        <div className="section-label"><h2 id="genai-weeks">Your four-week study plan</h2><span>Book 1 · Adversarial learning</span></div>
        {weekKeys.map((unit, i) => {
          const {label, title, description} = units[unit];
          return <a className="week-card" href={unitUrl(unit)} key={unit}>
            <span className="week-number">0{i + 1}</span>
            <div><span className="eyebrow">{label}</span><h2>{title}</h2><p>{description}</p></div>
            <span className="open-label">Open week →</span>
          </a>;
        })}
      </section>
      <section className="genai-group" id="book-resources">
        <h2>Book resources</h2>
        <p>Use the <a href={chapterUrl('start')}>reading guide</a> to get oriented, or open the <a href={unitUrl('foundations')}>optional math foundations</a> to review a topic.</p>
        <ChapterLinks items={chapters.filter(chapter => chapter.unit === 'reference' && chapter.slug !== 'start')}/>
      </section>
      <p className="genai-archive-link"><a href={bookBase + 'archive/'}>Browse the original Week 1 and Week 2 notes</a></p>
    </main>
  );
}
