const interruttore = document.querySelector('.intestazione__interruttore');
const navigazione = document.querySelector('.intestazione__nav');

if (interruttore && navigazione) {
  interruttore.addEventListener('click', () => {
    const aperta = navigazione.classList.toggle('intestazione__nav--aperta');
    interruttore.setAttribute('aria-expanded', String(aperta));
    interruttore.setAttribute('aria-label', aperta ? 'Chiudi il menu di navigazione' : 'Apri il menu di navigazione');
  });
}

const daAnimare = document.querySelectorAll('.js-entra');
const motoRidotto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (motoRidotto || !('IntersectionObserver' in window)) {
  daAnimare.forEach((elemento) => elemento.classList.add('js-entra--dentro'));
} else {
  const SOGLIA = 0.15;
  const MARGINE_BASSO = 0.1;
  const sopraLaPiega = (elemento) =>
    elemento.getBoundingClientRect().top < window.innerHeight * (1 - MARGINE_BASSO);
  const piuAltoDelloSchermo = (voce) =>
    voce.rootBounds !== null && voce.boundingClientRect.height > voce.rootBounds.height * 0.9;

  const osservatore = new IntersectionObserver((voci) => {
    voci.forEach((voce) => {
      if (voce.intersectionRatio >= SOGLIA || (voce.isIntersecting && piuAltoDelloSchermo(voce))) {
        voce.target.classList.add('js-entra--dentro');
        osservatore.unobserve(voce.target);
      }
    });
  }, { threshold: [0, SOGLIA], rootMargin: `0px 0px -${MARGINE_BASSO * 100}% 0px` });

  daAnimare.forEach((elemento) => {
    if (sopraLaPiega(elemento)) {
      elemento.classList.add('js-entra--dentro');
      return;
    }
    osservatore.observe(elemento);
  });
}
