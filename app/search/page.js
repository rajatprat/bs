import {chapters as genaiBook, chapterUrl, subject as genaiSubject} from '../../lib/genai-book';
import {computationalThinkingWeeks} from '../../lib/computational-thinking';
import {stats1Weeks} from '../../lib/stats-1';
import numberExamples from '../../data/deep-learning-number-examples.json';
import dl1 from '../../data/deep-learning-week-1.json';
import dl2 from '../../data/deep-learning-week-2.json';
import dl3 from '../../data/deep-learning-week-3.json';
import dl4 from '../../data/deep-learning-week-4.json';
import csd1 from '../../data/csd-week-1.json';
import csd2 from '../../data/csd-week-2.json';
import csd3 from '../../data/csd-week-3.json';
import csd4 from '../../data/csd-week-4.json';
import spg1 from '../../data/spg-week-1.json';
import spg12 from '../../data/spg-week-12.json';
import spg11 from '../../data/spg-week-11.json';
import spg10 from '../../data/spg-week-10.json';
import spg9 from '../../data/spg-week-9.json';
import spg8 from '../../data/spg-week-8.json';
import spg7 from '../../data/spg-week-7.json';
import spg6 from '../../data/spg-week-6.json';
import spg5 from '../../data/spg-week-5.json';
import spg4 from '../../data/spg-week-4.json';
import spg3 from '../../data/spg-week-3.json';
import spg from '../../data/spg-week-2.json';
import algorithms2 from '../../data/algorithms-week-2.json';
import algorithms from '../../data/algorithms-week-1.json';
import Search from '../../components/Search';
import week1 from '../../data/week-1.json';
import week2 from '../../data/week-2.json';
import week3 from '../../data/week-3.json';
import week4 from '../../data/week-4.json';
import week5 from '../../data/week-5.json';
import week7 from '../../data/week-7.json';
import week8 from '../../data/week-8.json';
import week9 from '../../data/week-9.json';
import week10 from '../../data/week-10.json';
import week11 from '../../data/week-11.json';
import genai3 from '../../data/genai-week-2.json';
import genai from '../../data/genai-week-1-part-1.json';
import genai2 from '../../data/genai-week-1-part-2.json';
import { headingId } from '../../lib/course';
import { additionsFor } from '../../lib/review-additions';
import {pdsaSections,pdsaWeek2Sections,pdsaWeek3Sections,pdsaWeek4Sections} from '../../lib/pdsa';
export const metadata = {title:'Search course notes', robots:{index:false, follow:true}};
export default function Page() {
  const entries = [];
  for (const chapter of genaiBook) {
    if (!chapter.unit.startsWith('week-')) continue;
    const url = chapterUrl(chapter.slug);
    const context = {subject: genaiSubject, subjectSlug: 'mathematical-foundation-of-generative-ai', week: Number(chapter.unit.slice(5)), lesson: chapter.title};
    entries.push({...context, title: chapter.title, url, text: chapter.sections.map(section => section.title).join(' ')});
    for (const section of chapter.sections) {
      entries.push({...context, title: section.title, url: url + '#' + section.id, text: ''});
    }
  }
  for (const data of [...computationalThinkingWeeks, ...stats1Weeks, dl1, dl2, dl3, dl4, csd1, csd2, csd3, csd4, week1, week2, week3, week4, week5, week7, week8, week9, week10, week11, genai, genai2, genai3, algorithms, algorithms2, spg1, spg, spg3, spg4, spg5, spg6, spg7, spg8, spg9, spg10, spg11, spg12]) {
    for (const section of data.sections) {
      const base = (data.base || `/software-engineering/week-${data.week}/`) + section.slug + '/';
      const context = {subject: data.subject, subjectSlug: data.subjectSlug || 'software-engineering', part: data.part};
      let entry = { ...context, week: data.week, lesson: section.title, title: section.title, url: base, text: '' };
      entries.push(entry);
      const numeric=numberExamples[base];
      if(numeric)entries.push({...context,week:data.week,lesson:section.title,title:numeric.title,url:base+'#dl-number-example-title',text:[numeric.setup,...numeric.steps.map(s=>s.text),numeric.meaning,numeric.question,numeric.answer].join(' ')});
      const additions = data.subjectSlug ? [] : additionsFor(data.week, section.slug, section.blocks);
      section.blocks.forEach((block, index) => {
        if (['heading', 'subheading'].includes(block.type)) {
          entry = { ...context, week: data.week, lesson: section.title, title: block.text, url: `${base}#${headingId(block, index)}`, text: '' };
          entries.push(entry);
        } else {
          entry.text += ' ' + (block.text || [block.caption, block.qualityNote].filter(Boolean).join(' ') || block.rows?.map(row => row.join(' · ')).join(' ') || '');
        }
        for (const note of additions.filter(note => note.afterIndex === index)) {
          entry.text += ' ' + [note.title, ...note.paragraphs, ...(note.rows || []).map(row => row.join(' · '))].join(' ');
        }
      });
    }
  }
  for (const [week,sections] of [[1,pdsaSections],[2,pdsaWeek2Sections],[3,pdsaWeek3Sections],[4,pdsaWeek4Sections]]) for(const section of sections) entries.push({subject:'Programming, Data Structures and Algorithms',subjectSlug:'pdsa',week,lesson:section.title,title:section.title,url:`/pdsa/week-${week}/${section.slug}/`,text:`PDSA Week ${week} ${section.section||''} ${section.title}`});
  return <main id="main" className="home search-page"><div className="eyebrow">YOUR LEARNING LIBRARY</div><h1>Search course notes.</h1><p className="lead">Find topics, explanations, figures, and revision questions across all subjects.</p><Search entries={entries}/></main>;
}
