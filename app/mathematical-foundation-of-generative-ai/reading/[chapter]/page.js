import {notFound} from 'next/navigation';
import {bookMetadata} from '../../../../lib/genai-book';
import {BookBreadcrumbs} from '../../book-ui';
import GenAIExplorer from '../../genai-explorer';
import GenAIIntroQuiz from '../../genai-intro-quiz';
import GenAIStoryLab from '../../genai-story-lab';
import TopicFigure from '../../genai-topic-figure';
import {beginnerLessons} from '../beginner-lessons';
import {chapters, practiceUrl, readingOrder, readingUrl, readingWeeks, weekPracticeUrl} from '../reading-data';

const explorers = {log:'log', critic:'week-1', judge:'week-2', digits:'week-3', transport:'week-4'};
const exercises = {
  1:['genai'], 2:['numbers'], 3:['probability','density'], 4:['problem'], 5:['recipe'],
  6:['recipe','pushforward'], 7:['expectation','log','convex'], 8:['famous'], 9:['obstacle'],
  10:['conjugate','bound'], 11:['twonets'], 12:['activation','sigmoid'], 13:['judge','ganf'],
  14:['gd','training'], 15:['guided','likelihood'], 16:['dcgan'], 17:['cgan','inference'],
  18:['saturation'], 19:['transport','wgan'], 20:['inversion','bigan','latreg'], 21:['dann'], 22:['fid'],
};
const exerciseNames = {
  genai:'Tell a generator from a classifier', numbers:'Count the numbers in a picture',
  probability:'Work with coin chances', density:'Read chances on a line', problem:'Count pictures and pixels',
  recipe:'Make samples with a rule', pushforward:'Follow a seed through a rule', expectation:'Find an average score',
  log:'Find a missing power', convex:'Compare a line with a curve', famous:'Compare two coins using KL',
  obstacle:'Find points per toss', conjugate:'Find the input with the highest score', bound:'Compare two scoring rules',
  twonets:'Follow a round of GAN training', activation:'Read the judge’s three numbers', sigmoid:'Turn a number into a chance',
  judge:'Work out where a toss came from', ganf:'Score the judge’s answer', gd:'Take one downhill step',
  training:'Follow feedback through a fixed judge', guided:'See how a fixed judge can be fooled',
  likelihood:'Compare the chances of a sequence', dcgan:'Build a bigger grid', cgan:'Ask for a specific digit',
  inference:'Draw a new sample after training', saturation:'Find when the score stops changing',
  transport:'Calculate the cost of moving sand', wgan:'Check the judge’s speed limit',
  inversion:'Work backward from a target', bigan:'Match a picture with its code',
  latreg:'Score a guess at a code', dann:'Keep the digit and hide the source', fid:'Compare centre and spread',
};

function Activity({kind}) {
  if (kind === 'intro') return <GenAIIntroQuiz/>;
  if (kind === 'recipe') return <GenAIStoryLab stage="recipe"/>;
  if (kind === 'wasserstein') return <GenAIStoryLab stage="week-4"/>;
  return <GenAIExplorer kind={explorers[kind]}/>;
}

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(chapters).map(chapter => ({chapter}));
}

export async function generateMetadata({params}) {
  const {chapter} = await params;
  if (!Object.hasOwn(chapters, chapter)) notFound();
  return bookMetadata(beginnerLessons[chapter]?.question ?? chapters[chapter].title, 'Study the foundations of generative AI on BS Notes.', readingUrl(chapter));
}

export default async function ReadingChapter({params}) {
  const {chapter} = await params;
  if (!Object.hasOwn(chapters, chapter)) notFound();
  const {title, body, activity} = chapters[chapter];
  const week = readingWeeks.findIndex(part => part.chapters.includes(chapter)) + 1;
  const lesson = beginnerLessons[chapter];
  const index = readingOrder.indexOf(chapter);
  const previous = readingOrder[index - 1];
  const next = readingOrder[index + 1];
  return <main id="main" className="week-page genai-reader">
    <BookBreadcrumbs unit={week ? 'week-' + week : undefined} chapter/>
    <nav className="genai-actions" aria-label="Reading resources">
      <a href={readingUrl() + (week ? '#week-' + week : '')}>← All lessons</a>
      {chapter !== 'glossary' && <a href={readingUrl('glossary')}>Glossary and symbols</a>}
    </nav>
    <div className="genai-topic-heading">
      <div className="eyebrow">Generative AI from Scratch{week ? ' · Week ' + week : ''}</div>
      <h1>{lesson?.question ?? title}</h1>
    </div>
    <article className="genai-book-body">
      {lesson && <>
        <section className="genai-group">
          <p>{lesson.setup}</p>
          <h2>Work through an example</h2>
          <ol>{lesson.steps.map(step => <li key={step}>{step}</li>)}</ol>
          <TopicFigure slug={lesson.figure}/>
        </section>
        <section className="genai-group">
          <h2>Try it yourself</h2>
          <ol>{lesson.practice.map(([question, answer]) => <li key={question}>
            <p>{question}</p>
            <details><summary>Show answer</summary><p>{answer}</p></details>
          </li>)}</ol>
        </section>
        {activity && <details className="genai-full-explanation">
          <summary>Try the interactive activity</summary>
          <Activity kind={activity}/>
        </details>}
        {lesson.math && <details className="genai-full-explanation">
          <summary>Why the maths works</summary>
          <p>{lesson.math}</p>
          {lesson.secondMath && <p>{lesson.secondMath}</p>}
        </details>}
      </>}
      {lesson ? <details className="genai-full-explanation">
        <summary>Read the detailed explanation</summary>
        <div className="machines-text" dangerouslySetInnerHTML={{__html:body.join('')}}/>
      </details> : <div className="machines-text" dangerouslySetInnerHTML={{__html:body.join('')}}/>}
    </article>
    {exercises[chapter] && <section className="genai-group">
      <h2>More practice on BS Notes</h2>
      <ul className="genai-chapter-links">
        {exercises[chapter].map(topic => <li key={topic}><a href={practiceUrl(topic)}>{exerciseNames[topic]} →</a></li>)}
      </ul>
      <p><a href={weekPracticeUrl(week)}>More Week {week} practice and revision</a></p>
    </section>}
    {lesson && <p>{lesson.next}</p>}
    <nav className="week-pagination" aria-label="Lesson navigation">
      <a href={readingUrl(previous)}>{previous ? '← ' + (beginnerLessons[previous]?.question ?? chapters[previous].title) : '← All lessons'}</a>
      {next && <a href={readingUrl(next)}>{beginnerLessons[next]?.question ?? chapters[next].title} →</a>}
    </nav>
  </main>;
}
