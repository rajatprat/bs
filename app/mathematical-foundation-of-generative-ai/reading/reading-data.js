import book from '../../../data/genai-machines-that-imagine.json';
import {bookBase, chapterUrl, unitUrl} from '../../../lib/genai-book';

export const {chapters, introductions} = book;
export const readingUrl = (chapter = '') => bookBase + 'reading/' + (chapter ? chapter + '/' : '');
export const readingWeeks = [
  {label: 'Make and compare two coins', intro: 'Start with a real coin and build a computer version. By the end you’ll be able to compare two batches of tosses using a simple scoring rule.', chapters: ['1','2','3','4','5','6','7','8','9','10']},
  {label: 'Teach a generator with feedback', intro: 'Keep the two coins from Week 1. Learn what the judge looks for, how it scores each toss, and why the judge and generator take turns.', chapters: ['11','12','13','14']},
  {label: 'Make pictures on request', intro: 'Use the generator and judge from Week 2 to make pictures. Learn how to grow a pixel grid and ask for several different drawings of the same digit.', chapters: ['15','16','17']},
  {label: 'Find out what a generator gets wrong', intro: 'Start with two dots to see why a judge can get stuck. Then measure distance, work backward from one picture, and compare batches of images.', chapters: ['18','19','20','21','22']},
];
export const readingOrder = [...readingWeeks.flatMap(week => week.chapters), 'recap'];
export const practiceUrl = chapter => chapterUrl(chapter) + '#try-it';
export const weekPracticeUrl = week => unitUrl('week-' + week) + '#study-review';
