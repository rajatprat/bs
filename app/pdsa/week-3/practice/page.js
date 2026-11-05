import PDSAWeekPractice from '../../../../components/PDSAWeekPractice';
import {pageMetadata} from '../../../../lib/seo';
import {weekThreePracticeQuestions} from '../../../../data/pdsa-week-3-practice';
export const metadata={...pageMetadata('/pdsa/week-3/practice/'),title:'Week 3 PDSA PYQ Practice | BSNotes'};
export default function Page(){return <main className="week-page"><PDSAWeekPractice week={3} questions={weekThreePracticeQuestions}/></main>}
