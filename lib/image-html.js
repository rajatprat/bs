// Apply the same static image treatment to imported lesson HTML.
export function watermarkImages(html = '') {
  return html.replace(/<a\b[^>]*>\s*(<img\b[^>]*>)\s*<\/a>/gi, '$1')
    .replace(/<img\b[^>]*>/gi, image => '<span class="watermarked-media">' + image + '</span>');
}
