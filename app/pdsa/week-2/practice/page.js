import PDSAWeekPractice from '../../../../components/PDSAWeekPractice';
import {pageMetadata} from '../../../../lib/seo';
import {weekTwoPracticeQuestions} from '../../../../data/pdsa-week-2-practice';
export const metadata={...pageMetadata('/pdsa/week-2/practice/'),title:'Week 2 PDSA PYQ Practice | BSNotes'};
export default function Page(){return <main className="week-page"><PDSAWeekPractice week={2} questions={weekTwoPracticeQuestions}/></main>}
