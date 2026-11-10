import book from '../../../data/genai-machines-that-imagine.json';
import {bookBase, chapterUrl, unitUrl} from '../../../lib/genai-book';

export const {chapters, introductions} = book;
export const readingUrl = (chapter = '') => bookBase + 'reading/' + (chapter ? chapter + '/' : '');
export const readingWeeks = [
  {label: 'The big idea', chapters: ['1','2','3','4','5','6','7','8','9','10']},
  {label: 'Training the generator and judge', chapters: ['11','12','13','14']},
  {label: 'Making pictures on request', chapters: ['15','16','17']},
  {label: 'Distance, inversion, and evaluation', chapters: ['18','19','20','21','22']},
];
export const readingOrder = [...readingWeeks.flatMap(week => week.chapters), 'recap'];
export const practiceUrl = chapter => chapterUrl(chapter) + '#try-it';
export const weekPracticeUrl = week => unitUrl('week-' + week) + '#study-review';
