const anti = document.querySelector('.bio__anti');

if (anti) {
  const parole = JSON.parse(anti.dataset.parole);
  const variabile = anti.querySelector('.bio__anti-parola');
  const motoRidotto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!motoRidotto && parole.length > 1) {
    const PAUSA = 900;
    const USCITA = 200;
    const ATTESA_INIZIALE = PAUSA + 500;
    let indice = 0;
    let timer = null;

    anti.classList.add('bio__anti--attiva');
    variabile.classList.add('bio__anti-parola--dentro');

    const cambia = () => {
      indice += 1;
      variabile.classList.remove('bio__anti-parola--dentro');
      timer = window.setTimeout(() => {
        variabile.textContent = parole[indice];
        variabile.classList.add('bio__anti-parola--dentro');
        timer = indice < parole.length - 1 ? window.setTimeout(cambia, PAUSA) : null;
      }, USCITA);
    };

    const avvia = () => {
      window.clearTimeout(timer);
      indice = 0;
      variabile.textContent = parole[0];
      variabile.classList.add('bio__anti-parola--dentro');
      timer = window.setTimeout(cambia, ATTESA_INIZIALE);
    };

    avvia();

    if ('IntersectionObserver' in window) {
      let uscito = false;
      const osservatore = new IntersectionObserver((voci) => {
        voci.forEach((voce) => {
          if (!voce.isIntersecting) {
            uscito = true;
          } else if (uscito) {
            uscito = false;
            avvia();
          }
        });
      }, { threshold: 0 });
      osservatore.observe(anti);
    }
  }
}
