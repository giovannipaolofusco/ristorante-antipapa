CookieConsent.run({
  cookie: {
    name: 'cc_cookie',
    expiresAfterDays: 186
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
    default: document.documentElement.lang === 'en' ? 'en' : 'it',
    translations: {
      it: {
        consentModal: {
          title: 'Questo sito usa solo cookie tecnici',
          description: 'Usiamo un unico cookie, che serve a ricordare questa tua scelta e a non riproporti il banner ad ogni visita. Non usiamo cookie di profilazione, non raccogliamo statistiche e non carichiamo contenuti di terze parti. Trovi tutto nella <a href="/ristorante-antipapa/privacy.html">Privacy &amp; Cookie Policy</a>.',
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
                headers: { name: 'Nome', domain: 'Dominio', desc: 'Finalità', exp: 'Durata' },
                body: [
                  { name: 'cc_cookie', domain: 'antipapafondi.it', desc: 'Memorizza la scelta espressa sul banner cookie.', exp: '6 mesi' }
                ]
              }
            },
            {
              title: 'I tuoi diritti',
              description: 'Puoi rivedere questa scelta in qualsiasi momento dal pulsante in fondo alla <a href="/ristorante-antipapa/privacy.html">Privacy &amp; Cookie Policy</a>, e cancellare i cookie già memorizzati dalle impostazioni del browser.'
            }
          ]
        }
      },
      en: {
        consentModal: {
          title: 'This site uses technical cookies only',
          description: 'We use a single cookie, which remembers this choice of yours so the banner is not shown to you on every visit. We use no profiling cookies, we collect no analytics and we load no third-party content. It is all set out in our <a href="/ristorante-antipapa/en/privacy.html">Privacy &amp; Cookie Policy</a>.',
          acceptAllBtn: 'Accept',
          acceptNecessaryBtn: 'Decline',
          showPreferencesBtn: 'Manage preferences',
          closeIconLabel: 'Decline and close'
        },
        preferencesModal: {
          title: 'Cookie preferences',
          acceptAllBtn: 'Accept',
          acceptNecessaryBtn: 'Decline',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'How we use cookies',
              description: 'This website sets technical cookies only, which Article 122 of the Italian Privacy Code does not make subject to prior consent. There are no profiling cookies, tracking pixels or analytics tools.'
            },
            {
              title: 'Strictly necessary cookies',
              description: 'These are needed for the site to work and cannot be switched off. At present there is only one: the cookie storing the choice you make in this panel, which lasts six months.',
              linkedCategory: 'necessari',
              cookieTable: {
                headers: { name: 'Name', domain: 'Domain', desc: 'Purpose', exp: 'Duration' },
                body: [
                  { name: 'cc_cookie', domain: 'antipapafondi.it', desc: 'Stores the choice made in the cookie banner.', exp: '6 months' }
                ]
              }
            },
            {
              title: 'Your rights',
              description: 'You can review this choice at any time from the button at the foot of the <a href="/ristorante-antipapa/en/privacy.html">Privacy &amp; Cookie Policy</a>, and delete cookies already stored through your browser settings.'
            }
          ]
        }
      }
    }
  }
});
