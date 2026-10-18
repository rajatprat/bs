export const courseWeeks = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
export function isResource(section) {
  return section.resource || /revision|test-your-understanding|source-material|source-and-publication-notes|about-the-examples/.test(section.slug);
}
export function studySections(data) { return data.sections.filter(s => !isResource(s)); }
export function resources(data) { return data.sections.filter(isResource); }
export function imageCount(data) { return data.illustrationCount ?? [...data.intro, ...data.sections.flatMap(s => s.blocks)].filter(b => b.type === 'image').length; }
export function headingId(block, index) {
  const label = block.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${label || 'section'}-${index + 1}`;
}
export function headings(blocks) {
  return blocks.flatMap((b, i) => ['heading', 'subheading'].includes(b.type) ? [{ id: headingId(b, i), text: b.text, nested: b.type === 'subheading' }] : []);
}
