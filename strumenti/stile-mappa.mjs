/**
 * Rigenera /assets/mappa/stile.json dallo stile Protomaps.
 * Da rilanciare solo quando si aggiorna @protomaps/basemaps.
 *   npm install --no-save @protomaps/basemaps && node strumenti/stile-mappa.mjs
 */
import { writeFileSync } from 'node:fs';
import { layers, namedFlavor } from '@protomaps/basemaps';

const ATTRIBUZIONE =
  '<a href="https://openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>' +
  ' &middot; <a href="https://protomaps.com" target="_blank" rel="noopener noreferrer">Protomaps</a>';

// @protomaps/basemaps 5.7.2 referenzia l'icona "townhall", che non esiste in nessuno
// sprite di basemaps-assets: senza questa sostituzione MapLibre emette un warning in
// console ad ogni caricamento della mappa. "townspot" è l'icona più vicina fra quelle
// realmente presenti. Da rimuovere quando lo sprite upstream includerà "townhall".
const sostituisciIconaMancante = (valore) => {
  if (typeof valore === 'string') return valore === 'townhall' ? 'townspot' : valore;
  if (Array.isArray(valore)) return valore.map(sostituisciIconaMancante);
  if (valore && typeof valore === 'object') {
    return Object.fromEntries(Object.entries(valore).map(([k, v]) => [k, sostituisciIconaMancante(v)]));
  }
  return valore;
};

const stile = {
  version: 8,
  name: 'Antipapa — Fondi',
  glyphs: '/assets/libs/basemaps/fonts/{fontstack}/{range}.pbf',
  sprite: '/assets/libs/basemaps/sprites/light',
  sources: {
    protomaps: {
      type: 'vector',
      url: 'pmtiles:///assets/mappa/fondi.pmtiles',
      attribution: ATTRIBUZIONE
    }
  },
  layers: sostituisciIconaMancante(layers('protomaps', namedFlavor('light'), { lang: 'it' }))
};

writeFileSync('assets/mappa/stile.json', JSON.stringify(stile));
console.log(`stile.json rigenerato: ${stile.layers.length} layer`);
