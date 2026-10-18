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
import genai from '../../data/genai-week-1-part-1.json';
import genai2 from '../../data/genai-week-1-part-2.json';
import { headingId } from '../../lib/course';
import { additionsFor } from '../../lib/review-additions';
export const metadata = { title: 'Search course notes' };
export default function Page() {
  const entries = [];
  for (const data of [week1, week2, week3, week4, week5, week7, week8, week9, week10, week11, genai, genai2, algorithms, algorithms2]) {
    for (const section of data.sections) {
      const base = (data.base || `/software-engineering/week-${data.week}/`) + section.slug + '/';
      const context = {subject: data.subject, subjectSlug: data.subjectSlug || 'software-engineering', part: data.part};
      let entry = { ...context, week: data.week, lesson: section.title, title: section.title, url: base, text: '' };
      entries.push(entry);
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
  return <main id="main" className="home search-page"><div className="eyebrow">YOUR LEARNING LIBRARY</div><h1>Search course notes.</h1><p className="lead">Find topics, explanations, figures, and revision questions across all three subjects.</p><Search entries={entries}/></main>;
}
