import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import sharp from 'sharp';

const CARTELLA = 'strumenti/qr';
const LARGHEZZA_PNG = 1024;
const CORREZIONE = 'Q';
const BORDEAUX = '#6B1330';
const AVORIO = '#F7F3EE';
const NERO = '#000000';
const BIANCO = '#FFFFFF';

const DEFINITIVO = 'https://antipapafondi.it/menu.html';
const ANTEPRIMA = 'https://giovannipaolofusco.github.io/ristorante-antipapa/menu.html';

const richieste = [
  { nome: 'antipapa-menu-qr', url: DEFINITIVO, scuro: BORDEAUX, chiaro: AVORIO, svg: true },
  { nome: 'antipapa-menu-qr-bn', url: DEFINITIVO, scuro: NERO, chiaro: BIANCO, svg: true },
  { nome: 'antipapa-menu-qr-anteprima', url: ANTEPRIMA, scuro: BORDEAUX, chiaro: AVORIO, svg: false }
];

await mkdir(CARTELLA, { recursive: true });

for (const { nome, url, scuro, chiaro, svg } of richieste) {
  const opzioni = { errorCorrectionLevel: CORREZIONE, margin: 4, color: { dark: scuro, light: chiaro } };

  const pngPath = join(CARTELLA, `${nome}.png`);
  await QRCode.toFile(pngPath, url, { ...opzioni, type: 'png', width: LARGHEZZA_PNG });

  if (svg) {
    const disegno = await QRCode.toString(url, { ...opzioni, type: 'svg' });
    await writeFile(join(CARTELLA, `${nome}.svg`), disegno, 'utf8');
  }

  const { data, info } = await sharp(pngPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const letto = jsQR(new Uint8ClampedArray(data), info.width, info.height);

  if (!letto) throw new Error(`${nome}: il QR generato non è rileggibile`);
  if (letto.data !== url) throw new Error(`${nome}: contiene "${letto.data}" invece di "${url}"`);

  console.log(`  ${nome.padEnd(28)} verificato -> ${letto.data}`);
}

console.log(`\nFile scritti in ${CARTELLA}/ — correzione errori ${CORREZIONE}, PNG ${LARGHEZZA_PNG}px.`);
