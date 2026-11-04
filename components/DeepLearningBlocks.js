import {watermarkImages} from '../lib/image-html';
import Diagram from './Diagram';
import {headingId} from '../lib/course';
import practice from '../data/deep-learning-practice.json';
import DeepLearningContent from './DeepLearningContent';
export default function DeepLearningBlocks({blocks,route}){
 const cards=practice[route]||{},skip=new Set(Object.values(cards).flatMap(c=>c.skip));
 const items=blocks.flatMap((b,i)=>{
  if(skip.has(i))return [];
  if(cards[i]){const c=cards[i];return [{type:'question',...c,figures:c.figures.map((f,j)=><Diagram key={j} block={f}/>)}];}
  let content;
  if(b.type==='image')content=<Diagram block={b}/>;
  else if(['heading','subheading'].includes(b.type)){const H=b.type==='heading'?'h2':'h3';const id=headingId(b,i);content=<H id={id} className="anchored-heading"><a href={'#'+id}>{b.text}<span className="heading-link" aria-hidden="true"> #</span></a></H>;}
  else content=<div dangerouslySetInnerHTML={{__html:watermarkImages(b.html||'')}}/>;
  return [{type:'content',content}];
 });
 return <DeepLearningContent items={items}/>;
}
