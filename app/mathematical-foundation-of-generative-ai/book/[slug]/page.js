import {extraPractice, foundationsPractice} from '../../../../lib/genai-beginner-practice';
import GenAIStoryLab from '../../genai-story-lab';
import TopicFigure from '../../genai-topic-figure';
import GenAIIntroQuiz from '../../genai-intro-quiz';
import MasteryPractice from '../../genai-mastery';
import {mastery} from '../../../../lib/genai-mastery';
import {showReviewAnswers} from '../../../../lib/genai-reading';
import GenAIExplorer from '../../genai-explorer';
import {mathBridges} from '../../../../lib/genai-math-bridges';
import {notFound} from 'next/navigation';
import {bookMetadata, chapterUrl, chapters, units, unitUrl} from '../../../../lib/genai-book';
import {BookBreadcrumbs} from '../../book-ui';

const explorers = {log: 'log', bound: 'week-1', judge: 'week-2', cgan: 'week-3', transport: 'week-4'};

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
  const foundation = foundationsPractice[slug];
  const practice = mastery[slug] || (foundation && {
    goal: foundation[0], example: foundation[1], guided: foundation[2], independent: foundation[3],
  });
  const body = (mathBridges[slug] || []).reduce((content, [marker, heading, explanation]) =>
    content.replace(marker, `<aside class="box idea genai-math-bridge"><p class="box-h">${heading}</p><p>${explanation}</p></aside>${marker}`), html);
  const sequence = chapters.filter(item => item.unit === unit);
  const index = sequence.indexOf(chapter);
  const previous = sequence[index - 1];
  const next = sequence[index + 1];
  const explorer = explorers[slug] && <GenAIExplorer kind={explorers[slug]}/>;
  const activity = slug === 'genai' ? <GenAIIntroQuiz/> : slug === 'recipe' ? <GenAIStoryLab stage="recipe"/> : explorer;
  const explanation = <>
    {sections.length > 0 && <nav className="genai-contents" aria-label="Full explanation contents">
      <p><strong>On this page</strong></p>
      <ul>{sections.map(section => <li key={section.id}><a href={'#' + section.id}>{section.title}</a></li>)}</ul>
    </nav>}
    <article id="formal-lesson" className="genai-book-body" dangerouslySetInnerHTML={{__html: showReviewAnswers(body)}}/>
  </>;
  return (
    <main id="main" className="week-page genai-reader">
      <BookBreadcrumbs unit={unit} chapter/>
      <div className="genai-topic-heading">
        <div className="eyebrow">{units[unit].label}</div>
        <h1>{practice?.goal || title}</h1>
        <a href={unitUrl(unit)}>← Back to {units[unit].label.toLowerCase()}</a>
      </div>
      {practice ? <>
        <MasteryPractice lesson={practice} figure={<TopicFigure slug={slug}/>} activity={activity} questions={extraPractice[slug]}/>
        <details className="genai-full-explanation">
          <summary>Open the full explanation</summary>
          <h2>{title}</h2>
          {explanation}
        </details>
      </> : <>{explorer}{explanation}</>}
      <nav className="week-pagination" aria-label="Topic navigation">
        <a href={previous ? chapterUrl(previous.slug) : unitUrl(unit)}>{previous ? '← ' + previous.title : '← ' + units[unit].label}</a>
        {next && <a href={chapterUrl(next.slug)}>{next.title} →</a>}
      </nav>
    </main>
  );
}
