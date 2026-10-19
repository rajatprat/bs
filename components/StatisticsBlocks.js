import katex from 'katex';
import { headingId } from '../lib/course';
export default function StatisticsBlocks({blocks}) {
 return <div className="lesson-body statistics-lesson">{blocks.map((b,i)=>{
  if(b.type==='equation') return <div key={i} className="math-equation algorithms-equation" dangerouslySetInnerHTML={{__html:katex.renderToString(b.tex,{displayMode:true,throwOnError:true,trust:false,output:'htmlAndMathml'})}}/>;
  if(b.type==='heading'||b.type==='subheading') {const Tag=b.type==='heading'?'h2':'h3';return <Tag key={i} id={headingId(b,i)} className="anchored-heading"><a href={'#'+headingId(b,i)}>{b.text}<span className="heading-link" aria-hidden="true"> #</span></a></Tag>;}
  if(b.type==='table') return <div className="table-wrap" key={i} tabIndex={0} role="region" aria-label="Scrollable statistics table"><table><thead><tr>{b.rows[0].map((c,j)=><th scope="col" key={j}>{c}</th>)}</tr></thead><tbody>{b.rows.slice(1).map((r,j)=><tr key={j}>{r.map((c,k)=><td key={k}>{c}</td>)}</tr>)}</tbody></table></div>;
  if(b.type==='bullet-item') {if(i>0&&blocks[i-1].type==='bullet-item')return null;const items=[];for(let j=i;j<blocks.length&&blocks[j].type==='bullet-item';j++)items.push(<li key={j}>{blocks[j].text}</li>);return <ul key={i}>{items}</ul>;}
  return <p key={i} className={b.type==='note'?'note':undefined}>{b.text}</p>;
 })}</div>;
}
