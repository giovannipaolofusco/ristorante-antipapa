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
  const sopraLaPiega = (elemento) => elemento.getBoundingClientRect().top < window.innerHeight;

  const osservatore = new IntersectionObserver((voci) => {
    voci.forEach((voce) => {
      if (!voce.isIntersecting) return;
      voce.target.classList.add('js-entra--dentro');
      osservatore.unobserve(voce.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  daAnimare.forEach((elemento) => {
    if (sopraLaPiega(elemento)) {
      elemento.classList.add('js-entra--dentro');
      return;
    }
    osservatore.observe(elemento);
  });
}
