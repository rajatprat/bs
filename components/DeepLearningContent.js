"use client";
import {useState} from 'react';
export default function DeepLearningContent({items}){
 const [paper,setPaper]=useState('All papers');const cards=items.filter(i=>i.type==='question');const papers=[...new Set(cards.map(c=>c.paper))];
 return <div className="lesson-body spg-lesson dl-course-content"><p className="dl-reading-hint">Swipe long formulas, tables or code sideways to see the rest.</p>
 {cards.length>0&&<section className="dl-practice-tools" aria-label="Filter past-paper questions"><h2>Practise past-paper questions</h2><p>Try each question, then reveal the answer and worked solution.</p><div className="dl-paper-filters">{['All papers',...papers].map(p=><button key={p} type="button" aria-pressed={paper===p} onClick={()=>setPaper(p)}>{p}</button>)}</div><p role="status" aria-live="polite">{cards.filter(c=>paper==='All papers'||c.paper===paper).length} of {cards.length} questions</p></section>}
 {items.map((item,i)=>item.type==='content'?<div key={i}>{item.content}</div>:<article key={i} className="dl-question-card" hidden={paper!=='All papers'&&item.paper!==paper} aria-label={item.header}>
 <header><span className="dl-question-label">Past-paper question</span><div className="dl-question-badges">{item.badges.map((b,j)=><span key={j}>{b}</span>)}{item.keyIssue&&<span className="dl-key-issue">Key issue</span>}</div></header>
 <div className="dl-question-body" dangerouslySetInnerHTML={{__html:item.questionHtml}}/>
 {item.figures.length>0&&<div className="dl-question-figures">{item.figures}</div>}
 <details className="dl-question-solution"><summary>Reveal answer and solution</summary><div className="dl-solution-content"><div className="dl-answer" dangerouslySetInnerHTML={{__html:item.answerHtml}}/><div dangerouslySetInnerHTML={{__html:item.solutionHtml}}/></div></details>
 </article>)}
 </div>;
}
