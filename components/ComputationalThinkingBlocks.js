import CTWeekSevenLab from './CTWeekSevenLab';
import CTWeekSixLab from './CTWeekSixLab';
import CTWeekFiveLab from './CTWeekFiveLab';
import CTWeekFourLab from './CTWeekFourLab';
import CTWeekThreeLab from './CTWeekThreeLab';
import CTDatasetPlayground from './CTDatasetPlayground';
import katex from 'katex';
import Diagram from './Diagram';
import { headingId } from '../lib/course';
export default function ComputationalThinkingBlocks({blocks}) {
 return <div className="lesson-body ct-lesson">{blocks.map((b,i)=>{
  if(b.type==='week7-lab') return <CTWeekSevenLab key={i} mode={b.mode} explore={b.explore}/>;
  if(b.type==='week6-lab') return <CTWeekSixLab key={i} mode={b.mode} explore={b.explore}/>;
  if(b.type==='week5-lab') return <CTWeekFiveLab key={i} mode={b.mode} explore={b.explore}/>;
  if(b.type==='week4-lab') return <CTWeekFourLab key={i} mode={b.mode} explore={b.explore}/>;
  if(b.type==='week3-lab') return <CTWeekThreeLab key={i} mode={b.mode} explore={b.explore}/>;
  if(b.type==='interactive') return <CTDatasetPlayground key={i} mode={b.mode} explore={b.explore}/>;
  if(b.type==='code') return <pre key={i} className="lesson-code" tabIndex={0}><code>{b.text}</code></pre>;
  if(b.type==='links') return <nav key={i} aria-label={b.text || 'Lesson resources'} className="lesson-related"><ul>{b.links.map(link=><li key={link.href}><a href={link.href} download={link.href.endsWith('.csv')}>{link.text} →</a></li>)}</ul></nav>;
  if(b.type==='image') return <Diagram key={i} block={b}/>;
  if(b.type==='check') return <section key={i} className="stats-quick-check"><h3>Try it yourself</h3><p>{b.question}</p><details><summary>Show explained answer</summary><p>{b.answer}</p></details></section>;
  if(b.type==='equation') return <div key={i} className="math-equation algorithms-equation" dangerouslySetInnerHTML={{__html:katex.renderToString(b.tex,{displayMode:true,throwOnError:true,trust:false,output:'htmlAndMathml'})}}/>;
  if(b.type==='heading'||b.type==='subheading') {const Tag=b.type==='heading'?'h2':'h3';return <Tag key={i} id={headingId(b,i)} className="anchored-heading"><a href={'#'+headingId(b,i)}>{b.text}<span className="heading-link" aria-hidden="true"> #</span></a></Tag>;}
  if(b.type==='table') return <div className="table-wrap" key={i} tabIndex={0} role="region" aria-label="Scrollable computational thinking table"><table><thead><tr>{b.rows[0].map((c,j)=><th scope="col" key={j}>{c}</th>)}</tr></thead><tbody>{b.rows.slice(1).map((r,j)=><tr key={j}>{r.map((c,k)=><td key={k}>{c}</td>)}</tr>)}</tbody></table></div>;
  if(b.type==='bullet-item') {if(i>0&&blocks[i-1].type==='bullet-item')return null;const items=[];for(let j=i;j<blocks.length&&blocks[j].type==='bullet-item';j++)items.push(<li key={j}>{blocks[j].text}</li>);return <ul key={i}>{items}</ul>;}
  return <p key={i} className={b.type==='note'?'note':undefined}>{b.text}</p>;
 })}</div>;
}
