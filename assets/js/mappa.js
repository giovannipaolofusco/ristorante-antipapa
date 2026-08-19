const contenitore = document.getElementById('mappa');

if (contenitore) {
  const COORDINATE = [13.4288228, 41.3585599];
  const ZOOM = 16.5;
  const LIMITI = [[13.4, 41.34], [13.46, 41.38]];
  const INDICAZIONI = 'https://www.openstreetmap.org/?mlat=41.3585599&mlon=13.4288228#map=18/41.35856/13.42882';

  const avvia = async () => {
    const [{ Map, Marker, NavigationControl, AttributionControl, addProtocol }, stile] = await Promise.all([
      import('/ristorante-antipapa/assets/libs/maplibre/maplibre-gl.mjs'),
      fetch('/ristorante-antipapa/assets/mappa/stile.json').then((r) => r.json())
    ]);

    stile.sprite = window.location.origin + '/ristorante-antipapa/assets/libs/basemaps/sprites/light';

    const protocollo = new pmtiles.Protocol();
    addProtocol('pmtiles', protocollo.tile);

    const archivio = stile.sources.protomaps.url.replace('pmtiles://', '');
    const assaggio = await fetch(archivio, { headers: { Range: 'bytes=0-15' } });

    if (assaggio.status !== 206) {
      const copia = await assaggio.blob();
      protocollo.add(new pmtiles.PMTiles({
        getKey: () => archivio,
        getBytes: async (inizio, lunghezza) => ({
          data: await copia.slice(inizio, inizio + lunghezza).arrayBuffer()
        })
      }));
    }

    const mappa = new Map({
      container: 'mappa',
      style: stile,
      center: COORDINATE,
      zoom: ZOOM,
      minZoom: 14,
      maxZoom: 17,
      maxBounds: LIMITI,
      attributionControl: false
    });

    mappa.addControl(new NavigationControl({ showCompass: false }), 'top-right');
    mappa.addControl(new AttributionControl({ compact: true }), 'bottom-right');

    const inglese = document.documentElement.lang === 'en';

    const segnaposto = document.createElement('a');
    segnaposto.className = 'mappa__marchio';
    segnaposto.href = INDICAZIONI;
    segnaposto.target = '_blank';
    segnaposto.rel = 'noopener noreferrer';
    segnaposto.setAttribute('aria-label', inglese
      ? 'Antipapa, Via Ippolito Dei Medici 7, Fondi — open directions in a new tab'
      : 'Antipapa, Via Ippolito Dei Medici 7, Fondi — apri le indicazioni stradali in una nuova scheda');

    const marchio = document.createElement('img');
    marchio.src = '/ristorante-antipapa/assets/img/antipapa-logo.jpg';
    marchio.alt = '';
    marchio.width = 48;
    marchio.height = 48;
    segnaposto.appendChild(marchio);

    new Marker({ element: segnaposto, anchor: 'bottom' })
      .setLngLat(COORDINATE)
      .addTo(mappa);

    const ATTESA_PRIMA_DI_RINUNCIARE = 5000;
    let sorgentePronta = false;
    let verdetto = null;

    mappa.on('sourcedata', (evento) => {
      if (evento.sourceId !== 'protomaps' || !evento.isSourceLoaded) return;
      sorgentePronta = true;
      if (verdetto) {
        window.clearTimeout(verdetto);
        verdetto = null;
      }
    });

    mappa.on('error', (evento) => {
      if (sorgentePronta || verdetto) return;
      if (evento && evento.sourceId && evento.sourceId !== 'protomaps') return;
      verdetto = window.setTimeout(() => {
        if (sorgentePronta) return;
        contenitore.remove();
      }, ATTESA_PRIMA_DI_RINUNCIARE);
    });

    mappa.on('load', () => contenitore.classList.add('mappa--pronta'));
  };

  if ('IntersectionObserver' in window) {
    const osservatore = new IntersectionObserver((voci) => {
      if (!voci[0].isIntersecting) return;
      osservatore.disconnect();
      avvia();
    }, { rootMargin: '250px' });
    osservatore.observe(contenitore);
  } else {
    avvia();
  }
}
