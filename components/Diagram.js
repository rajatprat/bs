'use client';
import dimensions from '../data/image-dimensions.json';
import { useRef, useState } from 'react';
export default function Diagram({ block }) {
  const dialog = useRef(null);
  const size = dimensions[block.src] || {};
  const [actualSize, setActualSize] = useState(false);
  const label = block.caption || block.alt || 'Course diagram';
  function open() { setActualSize(false); dialog.current.showModal(); }
  return <figure className="course-figure">
    <button type="button" className="diagram-preview" onClick={open} aria-label={`Enlarge ${label}`}>
      <img src={block.src} width={block.width || size.width} height={block.height || size.height} decoding="async" alt={block.alt || block.caption || 'Course diagram'} loading="lazy" />
      <span className="diagram-hint" aria-hidden="true">Enlarge diagram ↗</span>
    </button>
    <noscript><a href={block.src} target="_blank" rel="noreferrer">Open full size diagram ↗</a></noscript>
    {(block.caption || block.qualityNote) && <figcaption>{block.captionHtml ? <span dangerouslySetInnerHTML={{__html:block.captionHtml}}/> : block.caption}{block.qualityNote && <p className="diagram-quality-note"><strong>Diagram clarification: </strong>{block.qualityNote}</p>}</figcaption>}
    <dialog ref={dialog} className="diagram-dialog" aria-label={label} onClick={e => { if (e.target === e.currentTarget) dialog.current.close(); }}>
      <div className="diagram-toolbar"><span>{block.captionHtml ? <span dangerouslySetInnerHTML={{__html:block.captionHtml}}/> : label}</span><div>
        <button type="button" aria-pressed={actualSize} onClick={() => setActualSize(v => !v)}>{actualSize ? 'Fit to screen' : 'Actual size'}</button>
        <a href={block.src} target="_blank" rel="noreferrer">Open image ↗</a>
        <button type="button" onClick={() => dialog.current.close()} aria-label="Close diagram">Close ✕</button>
      </div></div>
      <div className={`diagram-canvas${actualSize ? ' actual-size' : ''}`} tabIndex={0} aria-label="Diagram viewing area. Scroll to explore when using actual size.">
        <img src={block.src} width={block.width || size.width} height={block.height || size.height} decoding="async" alt={block.alt || block.caption || 'Course diagram'} loading="lazy" />
      </div>
    </dialog>
  </figure>;
}
