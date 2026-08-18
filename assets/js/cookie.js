CookieConsent.run({
  cookie: {
    name: 'cc_cookie',
    expiresAfterDays: 182
  },
  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom left',
      equalWeightButtons: true,
      flipButtons: false
    },
    preferencesModal: {
      layout: 'box',
      equalWeightButtons: true,
      flipButtons: false
    }
  },
  categories: {
    necessari: {
      enabled: true,
      readOnly: true
    }
  },
  language: {
    default: 'it',
    translations: {
      it: {
        consentModal: {
          title: 'Questo sito usa solo cookie tecnici',
          description: 'Usiamo un unico cookie, che serve a ricordare questa tua scelta e a non riproporti il banner ad ogni visita. Non usiamo cookie di profilazione, non raccogliamo statistiche e non carichiamo contenuti di terze parti. Trovi tutto nella <a href="/privacy.html">Privacy &amp; Cookie Policy</a>.',
          acceptAllBtn: 'Accetta',
          acceptNecessaryBtn: 'Rifiuta',
          showPreferencesBtn: 'Gestisci preferenze',
          closeIconLabel: 'Rifiuta e chiudi'
        },
        preferencesModal: {
          title: 'Preferenze cookie',
          acceptAllBtn: 'Accetta',
          acceptNecessaryBtn: 'Rifiuta',
          savePreferencesBtn: 'Salva le preferenze',
          closeIconLabel: 'Chiudi',
          serviceCounterLabel: 'Servizio|Servizi',
          sections: [
            {
              title: 'Come usiamo i cookie',
              description: 'Questo sito installa esclusivamente cookie tecnici, che l\'art. 122 del Codice Privacy non sottopone a consenso preventivo. Non ci sono cookie di profilazione, pixel di tracciamento o strumenti di analisi statistica.'
            },
            {
              title: 'Cookie strettamente necessari',
              description: 'Servono al funzionamento del sito e non possono essere disattivati. In questo momento ne esiste uno solo: quello che memorizza la scelta espressa in questo pannello, con durata di sei mesi.',
              linkedCategory: 'necessari',
              cookieTable: {
                headers: {
                  name: 'Nome',
                  domain: 'Dominio',
                  desc: 'Finalità',
                  exp: 'Durata'
                },
                body: [
                  {
                    name: 'cc_cookie',
                    domain: 'antipapafondi.it',
                    desc: 'Memorizza la scelta espressa sul banner cookie.',
                    exp: '6 mesi'
                  }
                ]
              }
            },
            {
              title: 'I tuoi diritti',
              description: 'Puoi rivedere questa scelta in qualsiasi momento dal pulsante in fondo alla <a href="/privacy.html">Privacy &amp; Cookie Policy</a>, e cancellare i cookie già memorizzati dalle impostazioni del browser.'
            }
          ]
        }
      }
    }
  }
});
