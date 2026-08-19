const anti = document.querySelector('.bio__anti');

if (anti) {
  const parole = JSON.parse(anti.dataset.parole);
  const variabile = anti.querySelector('.bio__anti-parola');
  const motoRidotto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!motoRidotto && parole.length > 1) {
    const PAUSA = 900;
    const USCITA = 200;
    let indice = 0;

    anti.classList.add('bio__anti--attiva');
    variabile.classList.add('bio__anti-parola--dentro');

    const cambia = () => {
      indice += 1;
      variabile.classList.remove('bio__anti-parola--dentro');
      window.setTimeout(() => {
        variabile.textContent = parole[indice];
        variabile.classList.add('bio__anti-parola--dentro');
        if (indice < parole.length - 1) window.setTimeout(cambia, PAUSA);
      }, USCITA);
    };

    window.setTimeout(cambia, PAUSA + 500);
  }
}
