import dimensions from '../data/image-dimensions.json';
export default function Diagram({ block }) {
  const size = dimensions[block.src] || {};
  return <figure className="course-figure">
    <span className="watermarked-media"><img src={block.src} width={block.width || size.width} height={block.height || size.height} decoding="async" alt={block.alt || block.caption || 'Course diagram'} loading="lazy" /></span>
    {(block.caption || block.qualityNote) && <figcaption>{block.captionHtml ? <span dangerouslySetInnerHTML={{__html:block.captionHtml}}/> : block.caption}{block.qualityNote && <p className="diagram-quality-note"><strong>Diagram clarification: </strong>{block.qualityNote}</p>}</figcaption>}
  </figure>;
}
