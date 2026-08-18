import { readdir, stat } from 'node:fs/promises';
import { join, extname, basename, dirname } from 'node:path';
import sharp from 'sharp';

const RADICE = 'dist/assets/img';
const RASTER = new Set(['.jpg', '.jpeg', '.png']);
const LARGHEZZA_MASSIMA = 1600;

async function percorsi(cartella) {
  const trovati = [];
  for (const voce of await readdir(cartella, { withFileTypes: true })) {
    const completo = join(cartella, voce.name);
    if (voce.isDirectory()) trovati.push(...await percorsi(completo));
    else if (RASTER.has(extname(voce.name).toLowerCase())) trovati.push(completo);
  }
  return trovati;
}

const file = await percorsi(RADICE);
let convertite = 0;

for (const originale of file) {
  const immagine = sharp(originale);
  const info = await immagine.metadata();
  const destinazione = join(dirname(originale), basename(originale, extname(originale)) + '.webp');

  await immagine
    .resize({ width: Math.min(info.width, LARGHEZZA_MASSIMA), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(destinazione);

  const prima = (await stat(originale)).size;
  const dopo = (await stat(destinazione)).size;
  console.log(`  ${basename(originale)} -> ${basename(destinazione)}  ${Math.round(prima / 1024)} KB -> ${Math.round(dopo / 1024)} KB`);
  convertite += 1;
}

console.log(`Varianti WebP generate: ${convertite}`);
