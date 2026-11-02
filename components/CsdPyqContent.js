'use client';
import {useState} from 'react';
function badgeClass(text) {return /Quiz 1/i.test(text)?'quiz-one':/Quiz 2/i.test(text)?'quiz-two':/End-term/i.test(text)?'end-term':'';}
export default function CsdPyqContent({items}) {
  const [paper,setPaper]=useState('All papers');
  const cards=items.filter(item=>item.type==='pyq');
  const papers=[...new Set(cards.flatMap(card=>card.papers))];
  const shown=cards.filter(card=>paper==='All papers'||card.papers.includes(paper)).length;
  return <div className="lesson-body spg-lesson csd-lesson">
    {cards.length>0&&<section className="pyq-filters" aria-label="Filter past-paper questions"><span className="eyebrow">PAST-PAPER PRACTICE</span><h2>Choose a paper</h2><div className="pyq-filter-chips">{['All papers',...papers].map(name=><button type="button" key={name} aria-pressed={paper===name} onClick={()=>setPaper(name)}>{name}</button>)}</div><p role="status">{shown} of {cards.length} questions shown</p></section>}
    {items.map((item,i)=>item.type!=='pyq'?<div key={i}>{item.content}</div>:<article key={i} className="pyq-card" hidden={paper!=='All papers'&&!item.papers.includes(paper)} aria-label={'Past-paper question: '+item.header}>
      <header className="pyq-card-header"><span className="pyq-card-label">Asked in</span><div className="pyq-badges">{item.badges.map((badge,j)=><span key={j} className={'pyq-badge '+badgeClass(badge)}>{badge}</span>)}{item.keyIssue&&<span className="pyq-badge key-issue">Key issue</span>}</div></header>
      <div className="pyq-question" dangerouslySetInnerHTML={{__html:item.questionHtml}}/>
      {item.figures.length>0&&<div className="pyq-figures">{item.figures.map((figure,j)=><figure key={j}><div dangerouslySetInnerHTML={{__html:figure}}/><figcaption>Question figure</figcaption></figure>)}</div>}
      {item.answerHtml.length>0&&<footer className="pyq-answers">{item.answerHtml.map((html,j)=><div className="pyq-answer" key={j} dangerouslySetInnerHTML={{__html:html}}/>)}</footer>}
      {item.solutionHtml&&<details className="pyq-solution" open><summary>Show solution</summary><div className="pyq-steps" dangerouslySetInnerHTML={{__html:item.solutionHtml}}/></details>}
    </article>)}
  </div>;
}
