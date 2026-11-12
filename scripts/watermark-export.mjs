// Stamp only exported assets. public/ and assets/original-images/ stay unchanged.
import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'out');
const marker = path.join(output, '.watermarked');
try {
  await access(marker);
  throw new Error('Export already watermarked. Run npm run build for a fresh export.');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

function overlay(width, height) {
  // Scale with the original so the mark stays readable when displayed smaller.
  const tileWidth = Math.min(340, Math.max(150, Math.round(width / 3)));
  const tileHeight = Math.round(tileWidth * 160 / 340);
  const fontSize = Math.round(tileWidth * 32 / 340);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><pattern id="bsnotes-export-watermark" width="${tileWidth}" height="${tileHeight}" patternUnits="userSpaceOnUse"><text x="${tileWidth / 2}" y="${tileHeight / 2}" text-anchor="middle" dominant-baseline="middle" transform="rotate(-30 ${tileWidth / 2} ${tileHeight / 2})" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="#20364d" fill-opacity=".18">bsnotes.in</text></pattern></defs><rect width="100%" height="100%" fill="url(#bsnotes-export-watermark)"/></svg>`;
}

async function stamp(file) {
  const source = await readFile(file);
  const meta = await sharp(source, { limitInputPixels: 100_000_000 }).metadata();
  const { width, height } = meta;
  if (!width || !height) throw new Error(`Cannot measure ${file}`);
  const watermark = overlay(width, height);
  if (path.extname(file).toLowerCase() === '.svg') {
    // Nest the original SVG so viewBox transforms cannot move or shrink the mark.
    const original = source.toString().replace(/<\?xml[\s\S]*?\?>/g, '').replace(/<!DOCTYPE[\s\S]*?>/gi, '');
    const inner = original.replace(/<svg\b([^>]*)>/i, (_, attrs) => {
      const cleaned = attrs.replace(/\s(?:x|y|width|height)\s*=\s*(?:"[^"]*"|'[^']*')/gi, '');
      return `<svg${cleaned} x="0" y="0" width="${width}" height="${height}">`;
    });
    await writeFile(file, watermark.replace('<defs>', `${inner}<defs>`));
  } else {
    // Buffer before overwriting: sharp cannot read and write the same file.
    const image = await sharp(source).composite([{ input: Buffer.from(watermark) }]).toBuffer();
    await writeFile(file, image);
  }
}

let count = 0;
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    // Branding is not lesson artwork and must remain byte-for-byte unchanged.
    if (entry.isDirectory()) {
      if (entry.name !== 'brand') await walk(file);
    } else if (/\.(webp|png|jpe?g|svg|avif)$/i.test(entry.name)) {
      await stamp(file);
      count++;
    }
  }
}
await walk(path.join(output, 'images'));
await writeFile(marker, 'bsnotes.in embedded watermarks v1\n');
console.log(`Embedded bsnotes.in watermark in ${count} exported images; originals unchanged.`);
