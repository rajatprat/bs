import {bookBase, bookMetadata, chapters, chapterUrl, subject, units, unitUrl, weekKeys} from '../../lib/genai-book';
import {ChapterLinks} from './book-ui';

export const metadata = bookMetadata(subject, 'Study the original illustrated notes for GenAI Weeks 1–3, with worked examples and practice questions.', bookBase);

export default function Subject() {
  return (
    <main id="main" className="home genai-course">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Subjects</a><span aria-hidden="true">/</span><span>{subject}</span></nav>
      <div className="eyebrow">BS Course · Generative AI from Scratch</div>
      <h1>Mathematical Foundation<br/><span>of Generative AI.</span></h1>
      <p className="lead">Build the mathematics behind generative models through the original illustrated lessons for Weeks 1–3.</p>
      <section aria-labelledby="genai-week-title" id="genai-weeks">
        <div className="section-label"><h2 id="genai-week-title">Original illustrated lessons</h2><span>3 weeks available</span></div>
        <a className="week-card" href={bookBase + 'archive/week-1/'}>
          <span className="week-number">01</span>
          <div><span className="eyebrow">Week 1</span><h2>Foundations to variational optimization</h2><p>Start with generative models, then work through distributions, divergences, and convex conjugates.</p></div>
          <span className="open-label">Open week →</span>
        </a>
        <a className="week-card" href={bookBase + 'archive/week-2/'}>
          <span className="week-number">02</span>
          <div><span className="eyebrow">Week 2</span><h2>From variational divergence minimization to GANs</h2><p>Learn how the critic and generator take turns, then follow an illustrated tutorial on generating handwritten digits.</p></div>
          <span className="open-label">Open week →</span>
        </a>
        <a className="week-card" href={bookBase + 'week-3/'}><span className="week-number">03</span><div><span className="eyebrow">Week 3</span><h2>GANs, DC-GANs and conditional generation</h2><p>Understand the classifier game, work through the score, grow images and generate a chosen class.</p></div><span className="open-label">Open week →</span></a>
      </section>
      <details className="genai-group">
        <summary>Supplementary study notes</summary>
        {weekKeys.map((unit, i) => {
          const {label, title, description} = units[unit];
          return <a className="week-card" href={unit === 'week-3' ? bookBase + 'supplementary/week-3/' : unitUrl(unit)} key={unit}>
            <span className="week-number">0{i + 1}</span>
            <div><span className="eyebrow">{label}</span><h2>{title}</h2><p>{description}</p></div>
            <span className="open-label">Open week →</span>
          </a>;
        })}
      </details>
      <section className="genai-group" id="book-resources">
        <h2>Course resources</h2>
        <p>Use the <a href={chapterUrl('start')}>reading guide</a> to get oriented, or open the <a href={unitUrl('foundations')}>optional math foundations</a> to review a topic.</p>
        <ChapterLinks items={chapters.filter(chapter => chapter.unit === 'reference' && chapter.slug !== 'start')}/>
      </section>
    </main>
  );
}
