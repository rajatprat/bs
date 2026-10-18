import { Fragment } from 'react';
import katex from 'katex';
import { displayMath, mathSegments, displayTex } from '../lib/genai-math';
import Diagram from './Diagram';
import { headingId } from '../lib/course';

function Math({ tex, display = false }) {
  const markup = katex.renderToString(display ? displayTex(tex) : tex, { displayMode: display, throwOnError: true, trust: false, strict: 'error', output: 'htmlAndMathml' });
  return <span className={display ? 'katex-block' : 'katex-inline'} dangerouslySetInnerHTML={{ __html: markup }}/>;
}
function Notation({ text = '' }) {
  return mathSegments(text).map((part,i) => part.tex ? <Math key={i} tex={part.tex}/> : <Fragment key={i}>{part.text}</Fragment>);
}
// Keep short symbols inline; give substantive formulas their own reading space.
function Prose({ text }) {
  const parts=mathSegments(text), nodes=[]; let pending='';
  const flush=()=> { const value=pending.trim().replace(/^[.,;:]\s*/, ''); if(value) nodes.push(<p key={`p-${nodes.length}`}><Notation text={value}/></p>); pending=''; };
  for (let i=0;i<parts.length;i++) {
    const part=parts[i];
    const separate=part.tex && (part.text.length>=35 || (part.text.includes('=') && /[²∫Σ]|argmin|\bln\b|KL\(|JS\(|TV\(|L\(|f\*?\(/.test(part.text)));
    if (!separate) {pending+=part.text;continue;}
    flush();
    let tex=part.tex;
    if(parts[i+1]?.text.startsWith(' nats')) {tex+=String.raw`\,\text{nats}`;parts[i+1]={...parts[i+1],text:parts[i+1].text.slice(5)};}
    nodes.push(<div className="math-equation" key={`m-${nodes.length}`}><Math display tex={tex}/></div>);
  }
  flush();
  return <div className="math-prose">{nodes}</div>;
}
function Paragraph({ block }) {
  const text = block.text || '';
  if (text.startsWith('Under Q, the density ratio R = p(X)/q(X)')) return <div className="math-proof">
    <div className="proof-step"><p>Under <Math tex="Q"/>, define the density ratio:</p><div className="math-equation"><Math display tex={String.raw`R=\frac{p(X)}{q(X)}`}/></div></div>
    <div className="proof-step"><p>Its expectation under <Math tex="Q"/> is one:</p><div className="math-equation"><Math display tex={String.raw`\mathbb{E}_Q[R]=\int q(x)\,\frac{p(x)}{q(x)}\,dx=\int p(x)\,dx=1`}/></div></div>
    <div className="proof-step"><p>Apply Jensen’s inequality to the convex function <Math tex="f"/>:</p><div className="math-equation"><Math display tex={String.raw`\begin{aligned}\mathbb{E}_Q[f(R)]&\geq f\!\left(\mathbb{E}_Q[R]\right)\\&=f(1)\\&=0.\end{aligned}`}/></div></div>
    <div className="proof-conclusion"><p>Therefore:</p><div className="math-equation"><Math display tex={String.raw`D_f(P\,\|\,Q)=\mathbb{E}_Q\!\left[f\!\left(\frac{p(X)}{q(X)}\right)\right]\geq0`}/></div><p>Equality is guaranteed when <Math tex="P=Q"/>; the converse needs stronger assumptions on <Math tex="f"/>.</p></div>
  </div>;
  if (displayMath[text]) return <div className="math-equation"><Math tex={displayMath[text]} display/></div>;
  const exercises = text.split(/(?=Question \d+:)/).filter(Boolean);
  if (exercises.length > 1) return exercises.map((text, i) => <Paragraph key={i} block={{ text }}/>);
  const answer = text.match(/^(.*?)\s*(Solution:|Answer:)\s*([\s\S]+)$/);
  if (answer) return <div className="math-exercise"><p className="exercise-question"><Notation text={answer[1].replace(/^(Question:|Practice:)\s*/, '')}/></p><details className="math-answer"><summary>Show solution</summary><div><Prose text={answer[3]}/></div></details></div>;
  return <div className={block.type === 'note' ? 'math-note' : undefined}><Prose text={text}/></div>;
}
function Content({ blocks }) {
  const nodes = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === 'image') { nodes.push(<Diagram key={i} block={block}/>); continue; }
    if (block.type === 'list-item' || /^\d+\.\s/.test(block.text || '')) {
      const steps = [], key = i;
      while (i < blocks.length && (blocks[i].type === 'list-item' || /^\d+\.\s/.test(blocks[i].text || ''))) { steps.push(blocks[i].text.replace(/^\d+\.\s/, '')); i++; }
      i--;
      nodes.push(<ol className="math-steps" key={key}>{steps.map((step,j) => <li key={j}><Prose text={step}/></li>)}</ol>); continue;
    }
    if (/^•\s/.test(block.text || '')) {
      const items = [], key = i;
      while (i < blocks.length && /^•\s/.test(blocks[i].text || '')) { items.push(blocks[i].text.replace(/^•\s/, '')); i++; }
      i--; nodes.push(<ul className="math-checklist" key={key}>{items.map((text,j)=><li key={j}><Notation text={text}/></li>)}</ul>); continue;
    }
    nodes.push(<Paragraph key={i} block={block}/>);
  }
  return nodes;
}
export default function MathLesson({ blocks }) {
  const groups = [];
  blocks.forEach((block,index) => {
    if (['heading','subheading'].includes(block.type)) groups.push({heading:block,index,blocks:[]});
    else { if (!groups.length) groups.push({blocks:[]}); groups[groups.length-1].blocks.push(block); }
  });
  return <div className="lesson-body math-lesson">{groups.map((group,i) => {
    if (!group.heading) return <div className="math-introduction" key={i}><Content blocks={group.blocks}/></div>;
    const text = group.heading.text;
    const kind = /worked example|extra worked|exam-style solved/i.test(text) ? 'example' : /practice|check yourself|quick exercise|^Question \d/i.test(text) ? 'practice' : /common mistake|conditions and common errors/i.test(text) ? 'caution' : /^Detour/i.test(text) ? 'revision' : 'concept';
    const labels = {example:'Worked example',practice:'Try it yourself',caution:'Watch out',revision:'Prerequisite refresher',concept:'Understand the idea'};
    const title = text.replace(/^(?:Fully worked example|Worked example|Extra worked examples|Exam-style solved example|Practice|Quick exercise)\s*[—:]\s*/i,'').replace(/^Detour [A-Z]\s*[—:]\s*/,'').replace(/\s*\((quick revision|detailed)\)$/,'');
    const displayTitle = title.charAt(0).toUpperCase() + title.slice(1);
    const id = headingId(group.heading,group.index);
    return <section className={`math-section math-${kind}`} key={i} aria-labelledby={id}><div className="math-section-label">{labels[kind]}</div><h2 className="anchored-heading" id={id}><a href={'#'+id}><Notation text={displayTitle}/><span className="heading-link" aria-hidden="true"> #</span></a></h2>{/^Question \d/.test(text) ? <details className="math-answer"><summary>Show solution</summary><Content blocks={group.blocks}/></details> : <Content blocks={group.blocks}/>}</section>;
  })}</div>;
}
