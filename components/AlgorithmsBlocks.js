import katex from 'katex';
import {algorithmSegments} from '../lib/algorithms-math';
import { Fragment } from 'react';
import ReviewAddition from './ReviewAddition';
import Diagram from './Diagram';
import { headingId } from '../lib/course';
function FormulaText({text='', display=false}) {
 const parts=algorithmSegments(text);
 const onlyMath=parts.length===1 && parts[0].tex;
 return parts.map((p,i)=>p.tex ? <span key={i} className={display && onlyMath ? 'katex-block' : 'katex-inline'} dangerouslySetInnerHTML={{__html:katex.renderToString(p.tex,{displayMode:Boolean(display && onlyMath),throwOnError:true,trust:false,output:'htmlAndMathml'})}}/> : <Fragment key={i}>{p.text}</Fragment>);
}
export default function AlgorithmsBlocks({ blocks, additions = [] }) { let questionNumber=0; return <div className="lesson-body algorithms-lesson">{blocks.map((b,i) => { const contentNode = (() => {
if(b.type==='equation') return <div className="math-equation algorithms-equation" key={i} dangerouslySetInnerHTML={{__html:katex.renderToString(b.tex,{displayMode:true,throwOnError:true,trust:false,output:'htmlAndMathml'})}}/>;
if(b.type==='html') return <div className="algorithms-html" key={i} dangerouslySetInnerHTML={{__html:b.html}}/>;
if(b.type==='code') return <pre key={i} className="lesson-code" tabIndex={0}><code>{b.text}</code></pre>;
if(b.type==='image') return <Diagram key={i} block={b}/>;
if(b.type==='table' && b.rows.every(r=>r.length===1)) return <div key={i}>{b.rows.map((r,j)=><p className="note" key={j}>{<FormulaText text={r[0]}/>}</p>)}</div>;
if(b.type==='table') return <div className="table-wrap" key={i} tabIndex={0} role="region" aria-label="Scrollable course table"><table><thead><tr>{b.rows[0].map((c,j)=><th scope="col" key={j}>{<FormulaText text={c}/>}</th>)}</tr></thead><tbody>{b.rows.slice(1).map((row,j)=><tr key={j}>{row.map((c,k)=><td key={k}>{<FormulaText text={c}/>}</td>)}</tr>)}</tbody></table></div>;
if(b.type==='bullet-item') { if(i > 0 && blocks[i-1].type==='bullet-item') return null; const items=[]; for(let j=i;j<blocks.length && blocks[j].type==='bullet-item';j++) items.push(<li key={j}>{<FormulaText text={blocks[j].text}/>}</li>); return <ul key={i}>{items}</ul>; }
if(b.type==='list-item') return <p key={i}><strong>{++questionNumber}. </strong>{<FormulaText text={b.text}/>}</p>;
if(b.type==='subheading') return <h3 key={i} id={headingId(b,i)} className="anchored-heading"><a href={'#'+headingId(b,i)}>{<FormulaText text={b.text}/>}<span className="heading-link" aria-hidden="true"> #</span></a></h3>;
if(b.type==='heading') return <h2 key={i} id={headingId(b,i)} className="anchored-heading"><a href={'#'+headingId(b,i)}>{<FormulaText text={b.text}/>}<span className="heading-link" aria-hidden="true"> #</span></a></h2>;
const content=<FormulaText text={b.text} display/>;
return <p key={i} className={b.type==='note'?'note':b.text.startsWith('REMEMBER')?'remember':''}>{content}</p>;
})(); return <Fragment key={i}>{contentNode}{additions.filter(n=>n.afterIndex===i).map(n=><ReviewAddition key={n.id} note={n}/>)}</Fragment>; })}</div>; }
