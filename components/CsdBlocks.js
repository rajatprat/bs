import SpgBlocks from './SpgBlocks';
import {renderBooleanHtml} from '../lib/csd-math';

export default function CsdBlocks({blocks}) {
  const escape = text => text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const prepared = blocks.map(block => block.html ? {...block, html:renderBooleanHtml(block.html)} : block.caption ? {...block, captionHtml:renderBooleanHtml(escape(block.caption))} : block);
  return <div className="csd-lesson"><SpgBlocks blocks={prepared}/></div>;
}
