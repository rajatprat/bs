import review from '../data/review-additions.json';
export function additionsFor(week, slug, blocks) {
  return review.notes.filter(n=>n.week===week && n.slug===slug).map(note=>{
    let afterIndex=blocks.length-1;
    if(note.anchor){
      const start=blocks.findIndex(b=>['heading','subheading'].includes(b.type) && b.text===note.anchor);
      if(start<0) throw new Error(`Missing review anchor: ${note.id} ${note.anchor}`);
      const next=blocks.findIndex((b,i)=>i>start && ['heading','subheading'].includes(b.type));
      afterIndex=next<0?blocks.length-1:next-1;
    }
    return {...note,afterIndex};
  });
}
