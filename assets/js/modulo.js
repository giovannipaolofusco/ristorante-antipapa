const modulo = document.querySelector('.modulo__form');

if (modulo) {
  const esito = document.getElementById('esito-modulo');

  const inglese = document.documentElement.lang === 'en';

  const messaggi = inglese ? {
    nome: 'We need a name, so we know who we are replying to.',
    email: 'Please check the email address: without it we cannot reply.',
    telefono: 'That number does not look valid. You can also leave it empty.',
    messaggio: 'Tell us what you need, even in one line.',
    privacy: 'To send the message we need your consent to process the data.'
  } : {
    nome: 'Serve un nome per sapere a chi rispondere.',
    email: 'Controlla l\'indirizzo email: senza, non possiamo risponderti.',
    telefono: 'Il numero non sembra valido. Puoi anche lasciarlo vuoto.',
    messaggio: 'Scrivici cosa ti serve, anche in una riga.',
    privacy: 'Per inviare il messaggio serve il consenso al trattamento dei dati.'
  };

  const campoValido = (campo) => {
    if (campo.name === 'telefono' && campo.value.trim() !== '') {
      return /^[+\d][\d\s().-]{5,}$/.test(campo.value.trim());
    }
    return campo.checkValidity();
  };

  const mostraErrore = (campo) => {
    const spazio = document.getElementById('errore-' + campo.name);
    if (!spazio) return true;
    const valido = campoValido(campo);
    spazio.textContent = valido ? '' : (messaggi[campo.name] || 'Controlla questo campo.');
    campo.setAttribute('aria-invalid', String(!valido));
    return valido;
  };

  const daControllare = () => Array.from(modulo.querySelectorAll('[name]'))
    .filter((campo) => campo.name !== 'bot-field' && campo.name !== 'form-name');

  daControllare().forEach((campo) => {
    campo.addEventListener('blur', () => mostraErrore(campo));
    campo.addEventListener('input', () => {
      if (campo.getAttribute('aria-invalid') === 'true') mostraErrore(campo);
    });
  });

  modulo.addEventListener('submit', (evento) => {
    const campi = daControllare();
    const invalidi = campi.filter((campo) => !mostraErrore(campo));

    if (invalidi.length === 0) return;

    evento.preventDefault();
    invalidi[0].focus();

    if (esito) {
      esito.hidden = false;
      esito.className = 'modulo__esito modulo__esito--ko';
      if (inglese) {
        esito.textContent = invalidi.length === 1
          ? 'One field is missing: please check the one flagged above.'
          : `${invalidi.length} fields are missing: please check the ones flagged above.`;
      } else {
        esito.textContent = invalidi.length === 1
          ? 'Manca un campo: controlla quello segnalato qui sopra.'
          : `Mancano ${invalidi.length} campi: controlla quelli segnalati qui sopra.`;
      }
    }
  });
}
