const contenitore = document.getElementById('mappa');

if (contenitore) {
  const COORDINATE = [13.4286531, 41.3586522];
  const ZOOM = 16.5;

  const avvia = async () => {
    const [{ Map, Marker, Popup, NavigationControl, AttributionControl, addProtocol }, stile] = await Promise.all([
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
      minZoom: 12,
      maxZoom: 16,
      attributionControl: false
    });

    mappa.addControl(new NavigationControl({ showCompass: false }), 'top-right');
    mappa.addControl(new AttributionControl({ compact: true }), 'bottom-right');

    const segnaposto = document.createElement('button');
    segnaposto.type = 'button';
    segnaposto.className = 'mappa__marchio';
    const inglese = document.documentElement.lang === 'en';
    segnaposto.setAttribute('aria-label', inglese
      ? 'Antipapa, Via Ippolito Dei Medici 7, Fondi — open details'
      : 'Antipapa, Via Ippolito Dei Medici 7, Fondi — apri i dettagli');

    const marchio = document.createElement('img');
    marchio.src = '/ristorante-antipapa/assets/img/antipapa-logo.jpg';
    marchio.alt = '';
    marchio.width = 48;
    marchio.height = 48;
    segnaposto.appendChild(marchio);

    const scheda = new Popup({ offset: 34, closeButton: true, maxWidth: '250px' }).setHTML(
      '<p class="scheda-mappa__nome">Antipapa</p>' +
      '<p class="scheda-mappa__riga">Via Ippolito Dei Medici 7<br>04022 Fondi (LT)' +
      (inglese ? ', Italy' : '') + '</p>' +
      '<p class="scheda-mappa__riga"><a href="tel:+393514324634">+39 351 432 4634</a></p>' +
      '<p class="scheda-mappa__riga"><a href="https://www.openstreetmap.org/?mlat=41.35865&amp;mlon=13.42865#map=17/41.35865/13.42865" target="_blank" rel="noopener noreferrer">' +
      (inglese ? 'Directions' : 'Indicazioni stradali') + '</a></p>'
    );

    new Marker({ element: segnaposto, anchor: 'bottom' })
      .setLngLat(COORDINATE)
      .setPopup(scheda)
      .addTo(mappa);

    let sorgentePronta = false;
    let rinunciato = false;

    mappa.on('sourcedata', (evento) => {
      if (evento.sourceId === 'protomaps' && evento.isSourceLoaded) sorgentePronta = true;
    });

    mappa.on('error', (evento) => {
      if (sorgentePronta || rinunciato) return;
      if (evento && evento.sourceId && evento.sourceId !== 'protomaps') return;
      rinunciato = true;
      contenitore.remove();
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
