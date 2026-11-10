import {bookBase, bookMetadata, chapters, chapterUrl, subject, units, unitUrl, weekKeys} from '../../lib/genai-book';
import {ChapterLinks} from './book-ui';

export const metadata = bookMetadata(subject, 'Study the first four weeks through worked examples, illustrated lessons, practice questions, and optional math foundations.', bookBase);

export default function Subject() {
  return (
    <main id="main" className="home genai-course">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Subjects</a><span aria-hidden="true">/</span><span>{subject}</span></nav>
      <div className="eyebrow">BS Course · Generative AI from Scratch</div>
      <h1>Mathematical Foundation<br/><span>of Generative AI.</span></h1>
      <p className="lead">Choose the original illustrated notes for Weeks 1 and 2 or the BS Notes study plan for Weeks 1–4.</p>
      <div className="genai-actions">
        <a className="primary" href={bookBase + 'archive/'}>Open original illustrated notes →</a>
        <a href="#genai-weeks">Open the four-week study plan</a>
      </div>
      <section aria-labelledby="genai-weeks">
        <div className="section-label"><h2 id="genai-weeks">BS Notes four-week study plan</h2><span>Adversarial learning</span></div>
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
        <h2>Course resources</h2>
        <p>Use the <a href={chapterUrl('start')}>reading guide</a> to get oriented, or open the <a href={unitUrl('foundations')}>optional math foundations</a> to review a topic.</p>
        <ChapterLinks items={chapters.filter(chapter => chapter.unit === 'reference' && chapter.slug !== 'start')}/>
      </section>
    </main>
  );
}
