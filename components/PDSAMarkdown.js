const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function inline(value) { return escape(value).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/\[([^\]]+)\]\(([^ )]+)\)/g, '<a href="$2">$1</a>'); }
const Html = ({as: Tag='p', value, className}) => <Tag className={className} dangerouslySetInnerHTML={{__html:inline(value)}}/>;
const cells = line => line.trim().replace(/^\||\|$/g, '').replace(/\\\|/g, '§PIPE§').split('|').map(cell => cell.trim().replace(/§PIPE§/g, '|'));
export default function PDSAMarkdown({source}) {
  const lines = source.replace(/\r/g, '').split('\n'); const out=[]; let i=0;
  while (i < lines.length) { const line=lines[i];
    if (!line.trim()) { i++; continue; } if (line.startsWith('# ')) { i++; continue; }
    if (line.startsWith('```')) { const code=[]; i++; while(i<lines.length&&!lines[i].startsWith('```')) code.push(lines[i++]); i++; out.push(<pre className="lesson-code" tabIndex={0} key={i}><code>{code.join('\n')}</code></pre>); continue; }
    if (/^<details>/.test(line)) { out.push(<div className="pdsa-details" key={i} dangerouslySetInnerHTML={{__html:line}}/>); i++; continue; }
    const image=line.match(/^!\[(.*)\]\(([^)]+)\)$/); if (image) { const caption=lines[i+1]?.match(/^\*(.+)\*$/); out.push(<figure className="pdsa-figure" key={i}><span className="watermarked-media"><img src={'/'+image[2].replace(/^\//,'')} alt={image[1]}/></span>{caption&&<figcaption>{caption[1]}</figcaption>}</figure>); i+=caption?2:1; continue; }
    if (line.startsWith('> ')) { const quote=[]; while(i<lines.length&&lines[i].startsWith('> ')) quote.push(lines[i++].slice(2)); out.push(<blockquote key={i}><Html as="p" value={quote.join(' ')}/></blockquote>); continue; }
    const heading=line.match(/^(#{2,3})\s+(.+)$/); if (heading) { const Tag=heading[1].length===2?'h2':'h3'; const id=heading[2].toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); out.push(<Tag key={i} id={id} className="anchored-heading"><a href={'#'+id}>{heading[2]}<span className="heading-link" aria-hidden="true"> #</span></a></Tag>); i++; continue; }
    if (line.startsWith('|') && lines[i+1]?.startsWith('|---')) { const header=cells(line); i+=2; const rows=[]; while(i<lines.length&&lines[i].startsWith('|')) rows.push(cells(lines[i++])); out.push(<div className="table-wrap" tabIndex={0} role="region" aria-label="Scrollable course table" key={i}><table><thead><tr>{header.map((cell,j)=><th key={j} dangerouslySetInnerHTML={{__html:inline(cell)}}/>)}</tr></thead><tbody>{rows.map((row,j)=><tr key={j}>{row.map((cell,k)=><td key={k} dangerouslySetInnerHTML={{__html:inline(cell)}}/>)}</tr>)}</tbody></table></div>); continue; }
    const list=line.match(/^([-*]|\d+\.)\s+(.+)$/); if (list) { const ordered=/^\d+\./.test(list[1]); const items=[]; while(i<lines.length) { const match=lines[i].match(ordered?/^\d+\.\s+(.+)$/:/^[-*]\s+(.+)$/); if(!match) break; items.push(match[1]); i++; } const Tag=ordered?'ol':'ul'; out.push(<Tag key={i}>{items.map((item,j)=><li key={j} dangerouslySetInnerHTML={{__html:inline(item)}}/>)}</Tag>); continue; }
    const paragraph=[line]; i++; while(i<lines.length&&lines[i].trim()&&!/^(#|>|```|\||!\[|<details>|[-*]\s+|\d+\.\s+)/.test(lines[i])) paragraph.push(lines[i++]); out.push(<Html key={i} value={paragraph.join(' ')}/>);
  } return <div className="lesson-body pdsa-markdown">{out}</div>;
}
