import review from '../data/review-additions.json';
export default function ReviewAddition({ note }) {
  return <section className={review.boxed ? 'review-addition' : 'review-explanation'} aria-labelledby={`${note.id}-title`}>
    {review.boxed && <p className="review-addition-label">Added explanation · For review</p>}
    <h3 id={`${note.id}-title`}>{note.title}</h3>
    {note.paragraphs.map((text,i)=><p key={i}>{text}</p>)}
    {note.rows && <div className="table-wrap" tabIndex={0} role="region" aria-label={note.title+' table'}><table><thead><tr>{note.rows[0].map((cell,i)=><th scope="col" key={i}>{cell}</th>)}</tr></thead><tbody>{note.rows.slice(1).map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>}
  </section>;
}
