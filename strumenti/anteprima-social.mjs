import sharp from 'sharp';

const SORGENTE = 'assets/favicon/android-chrome-512x512.png';
const DESTINAZIONE = 'assets/img/antipapa-anteprima.jpg';
const LARGHEZZA = 1200;
const ALTEZZA = 630;
const LATO_MARCHIO = 460;
const FONDO = { r: 0x69, g: 0x0f, b: 0x33 };

const marchio = await sharp(SORGENTE)
  .resize(LATO_MARCHIO, LATO_MARCHIO, { fit: 'contain', background: FONDO })
  .toBuffer();

await sharp({ create: { width: LARGHEZZA, height: ALTEZZA, channels: 3, background: FONDO } })
  .composite([{ input: marchio, gravity: 'centre' }])
  .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
  .toFile(DESTINAZIONE);

const info = await sharp(DESTINAZIONE).metadata();
console.log(`${DESTINAZIONE}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
