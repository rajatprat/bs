import {computationalThinkingWeeks} from '../lib/computational-thinking';
import {stats1Weeks} from '../lib/stats-1';
import dl1 from '../data/deep-learning-week-1.json';
import dl2 from '../data/deep-learning-week-2.json';
import dl3 from '../data/deep-learning-week-3.json';
import dl4 from '../data/deep-learning-week-4.json';
import csd1 from '../data/csd-week-1.json';
import csd2 from '../data/csd-week-2.json';
import csd3 from '../data/csd-week-3.json';
import csd4 from '../data/csd-week-4.json';
export const metadata = pageMetadata("/");
import {pageMetadata} from '../lib/seo';
import spg1 from '../data/spg-week-1.json';
import spg12 from '../data/spg-week-12.json';
import spg11 from '../data/spg-week-11.json';
import spg10 from '../data/spg-week-10.json';
import spg9 from '../data/spg-week-9.json';
import spg8 from '../data/spg-week-8.json';
import spg7 from '../data/spg-week-7.json';
import spg6 from '../data/spg-week-6.json';
import spg5 from '../data/spg-week-5.json';
import spg4 from '../data/spg-week-4.json';
import spg3 from '../data/spg-week-3.json';
import spg from '../data/spg-week-2.json';
import StudyDashboard, {ContinueReading} from '../components/StudyDashboard';
import AcademicProgress from '../components/AcademicProgress';
import {CourseProgress} from '../components/StudyTools';
import Icon from '../components/Icon';
import {studySections} from '../lib/course';
import w1 from '../data/week-1.json';import w2 from '../data/week-2.json';import w3 from '../data/week-3.json';import w4 from '../data/week-4.json';import w5 from '../data/week-5.json';import w7 from '../data/week-7.json';import w8 from '../data/week-8.json';import w9 from '../data/week-9.json';import w10 from '../data/week-10.json';import w11 from '../data/week-11.json';
import {chapters as genaiChapters} from '../lib/genai-book';
import a1 from '../data/algorithms-week-1.json';import a2 from '../data/algorithms-week-2.json';import st from '../data/statistics-week-1.json';
const allCourses=[{slug:'computational-thinking',title:'Computational Thinking',icon:'code',tag:'LEARN TO THINK IN STEPS',description:'Start with data cards and build clear procedures through easy explanations, diagrams and practice.',weeks:7,topics:'Data · Lists · Dictionaries · Relationships',data:computationalThinkingWeeks,color:'teal'},{slug:'stats-1',title:'Statistics 1 · Foundation',icon:'chart',tag:'START WITH THE BASICS',description:'Build your foundation with easy English, visual explanations, worked examples and practice questions.',weeks:4,topics:'Data · Charts · Numerical summaries · Association',data:stats1Weeks,color:'rose'},{slug:'pdsa',title:'Programming, Data Structures and Algorithms',icon:'code',tag:'BUILD ALGORITHMIC THINKING',description:'Learn Python fluency and the foundations of efficient algorithms.',weeks:4,illustrations:59,topics:'Python · Sorting · Graphs · Algorithms',data:[{sections:Array(31).fill({})}],color:'amber'},{slug:'deep-learning',title:'Deep Learning',icon:'spark',tag:'UNDERSTAND NEURAL NETWORKS',description:'Build intuition for neurons, learning, backpropagation and optimization.',weeks:4,topics:'Perceptrons · Gradient descent · Backpropagation',data:[dl1,dl2,dl3,dl4],color:'blue'},{slug:'computer-system-design',title:'Computer System Design',icon:'code',tag:'UNDERSTAND DIGITAL CIRCUITS',description:'Build intuition for logic gates, Boolean algebra, timing and combinational circuits.',weeks:4,topics:'Logic gates · Boolean algebra · MUX · Decoders',data:[csd1,csd2,csd3,csd4],color:'blue'},{slug:'spg',title:'Strategies for Professional Growth',icon:'book',tag:'COMMUNICATE & GROW',description:'Build clearer communication and purposeful listening through practical examples.',weeks:12,topics:'Communication · Barriers · 10 C’s · Listening',data:[spg1,spg,spg3,spg4,spg5,spg6,spg7,spg8,spg9,spg10,spg11,spg12],color:'teal'},{slug:'software-engineering',title:'Software Engineering',icon:'code',tag:'BUILD & COLLABORATE',description:'From understanding requirements to building, testing and deploying software.',weeks:10,topics:'Requirements · Design · Git · Testing',data:[w1,w2,w3,w4,w5,w7,w8,w9,w10,w11],color:'teal'},{slug:'mathematical-foundation-of-generative-ai',title:'Mathematical Foundation of Generative AI',icon:'spark',tag:'UNDERSTAND THE FOUNDATIONS',description:'Build intuition for distributions, convexity and the mathematics behind generative models.',weeks:4,topics:'Divergences · GANs · Wasserstein · FID',data:[{sections:genaiChapters.filter(chapter=>chapter.unit.startsWith('week-') && !/^(practice|rev)/.test(chapter.slug)).map(()=>({}))}],color:'blue'},{slug:'algorithms-in-data-science',title:'Algorithms in Data Science',icon:'chart',tag:'THINK THROUGH THE PROBLEM',description:'Explore probability bounds, random projections and dimensionality reduction.',weeks:2,topics:'Probability · Random projections · JL',data:[a1,a2],color:'amber'},{slug:'statistics',hidden:true,title:'Statistics',icon:'book',tag:'MAKE SENSE OF UNCERTAINTY',description:'Understand random variables and distributions through worked examples and practice.',weeks:1,topics:'Random variables · PMF · PDF · CDF',data:[st],color:'rose'}];
const courses=allCourses.filter(course=>!course.hidden);
export default function Home(){
 const courseOrder=['pdsa','software-engineering','stats-1','spg','deep-learning','computer-system-design','mathematical-foundation-of-generative-ai','algorithms-in-data-science','computational-thinking'];
 const ordered=courseOrder.map(slug=>courses.find(c=>c.slug===slug));
 const levels=[
  {name:'Foundation',description:'Build the core mathematical base.',slugs:['stats-1','computational-thinking']},
  {name:'Diploma',description:'Develop programming, technical understanding and problem-solving.',slugs:['pdsa']},
  {name:'Degree',description:'Apply your foundation to software, communication and advanced AI.',slugs:['software-engineering','spg','deep-learning','computer-system-design','mathematical-foundation-of-generative-ai','algorithms-in-data-science']}
 ];
 const total=courses.reduce((sum,c)=>sum+c.data.reduce((n,d)=>n+studySections(d).length,0),0);
 const figures=courses.reduce((sum,c)=>sum+c.data.reduce((n,d)=>n+JSON.stringify(d).split('"type":"image"').length-1,0),0);
 return <main id="main" className="home academic-home">
 <section className="academic-hero" aria-labelledby="hero-title">
 <div className="academic-hero-art" role="img" aria-label="An imagined domed academic library surrounded by a peaceful garden"/>
 <div className="academic-hero-copy"><span className="eyebrow">FOR IIT MADRAS BS STUDENTS <span className="gold-rule"/></span><h1 id="hero-title">A Focused Space for<br/>Deeper Learning.</h1><p>Clear notes, thoughtful diagrams, and worked examples.<br className="desktop-break"/> A little more understanding, one subject at a time.</p><div className="hero-actions"><a className="primary" href="#subjects">Explore Subjects <Icon name="arrow" size={18}/></a><a className="academic-secondary" href="#study-space"><Icon name="bookmark" size={18}/> My Study Space</a></div><span className="hero-footnote">Open to explore. Made by a student, for students.</span></div>
 </section>
 <div className="academic-stats" aria-label="The learning library"><div><Icon name="book" size={28}/><p><strong>{courses.length}</strong><span>Available subjects</span></p></div><div><Icon name="layers" size={28}/><p><strong>{total}</strong><span>Study sections</span></p></div><div><Icon name="image" size={28}/><p><strong>{figures}+</strong><span>Diagrams & illustrations</span></p></div><div><Icon name="graduation" size={30}/><p><strong>At your pace</strong><span>For IITM BS students</span></p></div></div>
 <form className="academic-search" action="/search/" role="search"><Icon name="search" size={23}/><label className="sr-only" htmlFor="library-search">Search all course notes</label><input id="library-search" name="q" type="search" placeholder="Search notes, topics, diagrams, questions…"/><button type="submit">Search <kbd>⌘ K</kbd></button></form>
 <ContinueReading/>
 <section id="subjects" aria-labelledby="subjects-title"><div className="section-label"><div><span className="eyebrow">THE LEARNING COLLECTION</span><h2 id="subjects-title">Available Subjects <span className="gold-rule"/></h2></div><span>{courses.length} subjects <span className="separator">·</span> Structured <span className="separator">·</span> Ready when you are</span></div>{levels.map(level=><section className="subject-level" key={level.name} aria-labelledby={'level-'+level.name.toLowerCase()}><div className="subject-level-heading"><div><span className="eyebrow">{level.name.toUpperCase()} LEVEL</span><h3 id={'level-'+level.name.toLowerCase()}>{level.name}</h3></div><p>{level.description}</p></div><div className="subject-grid">{level.slugs.map(slug=>{const c=courses.find(course=>course.slug===slug),i=courseOrder.indexOf(slug),count=c.data.reduce((n,d)=>n+studySections(d).length,0),figureCount=c.illustrations??c.data.reduce((n,d)=>n+JSON.stringify(d).split('"type":"image"').length-1,0);return <article key={c.slug} className={'library-subject academic-subject subject-'+i}><a className="subject-main" href={'/'+c.slug+'/'}><div className="subject-top"><span className="subject-symbol"><Icon name={c.slug==='computational-thinking'?'code':['code','chart','growth','brain','chip','sigma','algorithm'][i]} size={29}/></span><span className="availability"><b>{c.weeks} {c.weeks===1?'week':'weeks'}</b><small>{count} sections · {figureCount} illustrations</small></span></div><span className="subject-landscape" aria-hidden="true"><i/><i/><i/></span><h3>{c.title}</h3><p className="subject-description">{c.description}</p><span className="subject-topics">{c.topics}</span><span className="subject-open">Explore subject <span><Icon name="arrow" size={17}/></span></span></a><CourseProgress base={'/'+c.slug+'/'} total={count}/></article>;})}</div></section>)}</section>
 <AcademicProgress total={total}/>
 <div id="study-space"><StudyDashboard/></div>
 <section className="academic-promise"><span className="eyebrow">A LITTLE CLARITY GOES A LONG WAY</span><h2>Make room for understanding.</h2><p>Browse a subject, follow the ideas, and return whenever you need a clearer view.</p><a href="/search/">Find your next topic <Icon name="arrow" size={18}/></a></section>
 </main>;
}
