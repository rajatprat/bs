import { Fragment } from 'react';
import ReviewAddition from './ReviewAddition';
import Diagram from './Diagram';
import { headingId } from '../lib/course';
export default function Blocks({ blocks, additions = [] }) { let questionNumber=0; return <div className="lesson-body">{blocks.map((b,i) => { const contentNode = (() => {
if(b.type==='links') return <nav key={i} aria-label={b.text || 'Related lessons'} className="lesson-related"><ul>{b.links.map(link=><li key={link.href}><a href={link.href}>{link.text} →</a></li>)}</ul></nav>;
if(b.type==='code') return <pre key={i} className="lesson-code" tabIndex={0}><code>{b.text}</code></pre>;
if(b.type==='image') return <Diagram key={i} block={b}/>;
if(b.type==='table' && b.rows.every(r=>r.length===1)) return <div key={i}>{b.rows.map((r,j)=><p className="note" key={j}>{r[0]}</p>)}</div>;
if(b.type==='table') return <div className="table-wrap" key={i} tabIndex={0} role="region" aria-label="Scrollable course table"><table><thead><tr>{b.rows[0].map((c,j)=><th scope="col" key={j}>{c}</th>)}</tr></thead><tbody>{b.rows.slice(1).map((row,j)=><tr key={j}>{row.map((c,k)=><td key={k}>{c}</td>)}</tr>)}</tbody></table></div>;
if(b.type==='bullet-item') { if(i > 0 && blocks[i-1].type==='bullet-item') return null; const items=[]; for(let j=i;j<blocks.length && blocks[j].type==='bullet-item';j++) items.push(<li key={j}>{blocks[j].text}</li>); return <ul key={i}>{items}</ul>; }
if(b.type==='list-item') return <p key={i}><strong>{++questionNumber}. </strong>{b.text}</p>;
if(b.type==='subheading') return <h3 key={i} id={headingId(b,i)} className="anchored-heading"><a href={'#'+headingId(b,i)}>{b.text}<span className="heading-link" aria-hidden="true"> #</span></a></h3>;
if(b.type==='heading') return <h2 key={i} id={headingId(b,i)} className="anchored-heading"><a href={'#'+headingId(b,i)}>{b.text}<span className="heading-link" aria-hidden="true"> #</span></a></h2>;
const content=b.runs?.length ? b.runs.map((r,j)=>r.bold?<strong key={j}>{r.text}</strong>:r.italic?<em key={j}>{r.text}</em>:r.text):b.text;
return <p key={i} className={b.type==='note'?'note':b.text.startsWith('REMEMBER')?'remember':''}>{content}</p>;
})(); return <Fragment key={i}>{contentNode}{additions.filter(n=>n.afterIndex===i).map(n=><ReviewAddition key={n.id} note={n}/>)}</Fragment>; })}</div>; }
