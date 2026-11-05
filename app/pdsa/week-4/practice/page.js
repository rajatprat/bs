import PDSAWeekPractice from '../../../../components/PDSAWeekPractice';
import {pageMetadata} from '../../../../lib/seo';
import {weekFourPracticeQuestions} from '../../../../data/pdsa-week-4-practice';
export const metadata={...pageMetadata('/pdsa/week-4/practice/'),title:'Week 4 PDSA PYQ Practice | BSNotes'};
export default function Page(){return <main className="week-page"><PDSAWeekPractice week={4} questions={weekFourPracticeQuestions}/></main>}
