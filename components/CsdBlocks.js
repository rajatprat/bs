import Diagram from './Diagram';
import CsdPyqContent from './CsdPyqContent';
import {headingId} from '../lib/course';
import {renderBooleanHtml} from '../lib/csd-math';
const escape = text => text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
export default function CsdBlocks({blocks}) {
  const items=blocks.map((block,i)=>{
    if(block.type==='pyq')return {...block,questionHtml:renderBooleanHtml(block.questionHtml),answerHtml:block.answerHtml.map(renderBooleanHtml),solutionHtml:renderBooleanHtml(block.solutionHtml)};
    let content;
    if(block.type==='image')content=<Diagram block={{...block,captionHtml:block.caption?renderBooleanHtml(escape(block.caption)):undefined}}/>;
    else if(['heading','subheading'].includes(block.type)){
      const Heading=block.type==='heading'?'h2':'h3';const id=headingId(block,i);
      content=<>{/^Learn the method/i.test(block.text)&&<span className="csd-method-label">Method</span>}<Heading id={id} className="anchored-heading"><a href={'#'+id}>{block.text}<span className="heading-link" aria-hidden="true"> #</span></a></Heading></>;
    }else content=<div dangerouslySetInnerHTML={{__html:renderBooleanHtml(block.html||'')}}/>;
    return {type:'content',content};
  });
  return <CsdPyqContent items={items}/>;
}
