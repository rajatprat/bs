import GenAIExplorer from '../../genai-explorer';
import TopicFigure from '../../genai-topic-figure';
import {weeklyChecks} from '../../../../lib/genai-mastery';
import GenAIStoryLab from '../../genai-story-lab';
import {notFound} from 'next/navigation';
import {bookBase, bookMetadata, chapterUrl, units, unitUrl, weekKeys} from '../../../../lib/genai-book';
import {firstPass, firstPassUrl} from '../../../../lib/genai-first-pass';
import {BookBreadcrumbs} from '../../book-ui';

const guideFigures = {
  obstacle: 'detail-bound',
  judge: 'detail-judge',
  ganf: 'detail-ganf',
  dcgan: 'dcgan',
  cgan: 'cgan',
  wgan: 'detail-wgan',
  dann: 'detail-dann',
  fid: 'fid',
};

export const dynamicParams = false;
export function generateStaticParams() {
  return weekKeys.map(week => ({week}));
}

export async function generateMetadata({params}) {
  const {week} = await params;
  const guide = firstPass[week];
  if (!guide) notFound();
  return bookMetadata(guide.title, guide.goal, firstPassUrl(bookBase, week));
}

export default async function FirstPass({params}) {
  const {week} = await params;
  const guide = firstPass[week];
  if (!guide) notFound();
  return (
    <main id="main" className="week-page genai-reader">
      <BookBreadcrumbs unit={week} chapter/>
      <div className="eyebrow">{units[week].label} · Worked first pass</div>
      <h1>{guide.title}</h1>
      <p className="lead">{guide.goal}</p>
      {guide.prerequisite && <p><a href={chapterUrl(guide.prerequisite[0])}>{guide.prerequisite[1]} →</a></p>}
      <article className="genai-book-body">
        {guide.steps.map((step, index) => <div key={step.topic}><section className="genai-group">
          <div className="eyebrow">Step {index + 1}</div>
          <h2>{step.title}</h2>
          <p>{step.explanation}</p>
          <TopicFigure slug={guideFigures[step.topic]}/>
          <div className="box idea"><p className="box-h">Why this step helps</p><p>{step.why}</p></div>
          <p><a href={chapterUrl(step.topic) + '#try-it'}>Try this idea with new numbers →</a></p>
        </section>
        {week === 'week-1' && index === 0 && <GenAIStoryLab stage={week}/>}
        </div>)}
        {week !== 'week-1' && <GenAIStoryLab stage={week}/>}
        <details className="genai-full-explanation">
          <summary>Try another interactive example</summary>
          <GenAIExplorer kind={week}/>
        </details>
        <section className="genai-group">
          <h2>Check your understanding</h2>
          <p>{guide.check}</p>
          <details><summary>Show answer</summary><p>{guide.answer}</p></details>
          <h3>Keep going with independent practice</h3>
          <ul>{weeklyChecks[week].map(([slug, label]) =>
            <li key={slug}><a href={chapterUrl(slug) + '#independent-check'}>{label}</a></li>)}</ul>
        </section>
      </article>
      <nav className="week-pagination" aria-label="Continue studying">
        <a href={unitUrl(week) + '#week-topics'}>Continue to the full topics →</a>
      </nav>
    </main>
  );
}
