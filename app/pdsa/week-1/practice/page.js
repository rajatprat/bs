import PDSAWeekPractice from '../../../../components/PDSAWeekPractice';
import {pageMetadata} from '../../../../lib/seo';
import {weekOnePracticeQuestions} from '../../../../data/pdsa-week-1-practice';
export const metadata={...pageMetadata('/pdsa/week-1/practice/'),title:'Week 1 PDSA PYQ Practice | BSNotes'};
export default function Page(){return <main className="week-page"><PDSAWeekPractice week={1} questions={weekOnePracticeQuestions}/></main>}
