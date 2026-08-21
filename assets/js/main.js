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
  const USCITA = 300;
  const timerUscita = new Map();
  const sopraLaPiega = (elemento) =>
    elemento.getBoundingClientRect().top < window.innerHeight * (1 - MARGINE_BASSO);
  const piuAltoDelloSchermo = (voce) =>
    voce.rootBounds !== null && voce.boundingClientRect.height > voce.rootBounds.height * 0.9;

  const fermaTimer = (elemento) => {
    const timer = timerUscita.get(elemento);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timerUscita.delete(elemento);
    }
  };

  const rivela = (elemento) => {
    fermaTimer(elemento);
    elemento.classList.remove('js-entra--esce');
    elemento.classList.add('js-entra--dentro');
  };

  const nascondi = (elemento) => {
    if (!elemento.classList.contains('js-entra--dentro')) return;
    fermaTimer(elemento);
    elemento.classList.remove('js-entra--dentro');
    elemento.classList.add('js-entra--esce');
    timerUscita.set(elemento, window.setTimeout(() => {
      elemento.classList.remove('js-entra--esce');
      timerUscita.delete(elemento);
    }, USCITA));
  };

  const osservatore = new IntersectionObserver((voci) => {
    voci.forEach((voce) => {
      if (voce.intersectionRatio >= SOGLIA || (voce.isIntersecting && piuAltoDelloSchermo(voce))) {
        rivela(voce.target);
      } else if (!voce.isIntersecting) {
        nascondi(voce.target);
      }
    });
  }, { threshold: [0, SOGLIA], rootMargin: `0px 0px -${MARGINE_BASSO * 100}% 0px` });

  daAnimare.forEach((elemento) => {
    if (sopraLaPiega(elemento)) elemento.classList.add('js-entra--dentro');
    osservatore.observe(elemento);
  });
}
