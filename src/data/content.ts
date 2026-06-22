export const languages = ['de', 'fr', 'it', 'en'] as const;
export type Language = (typeof languages)[number];

export interface Dish {
  name: string;
  description: string;
  price: number;
  vegetarian?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  dishes: Dish[];
}

export interface EventItem {
  number: string;
  cadence: string;
  title: string;
  description: string;
}

export interface LocalizedContent {
  meta: { title: string; description: string };
  nav: { menu: string; events: string; reserve: string; about: string; open: string; close: string };
  hero: { eyebrow: string; title: string; subtitle: string; primary: string; secondary: string; scroll: string };
  about: { eyebrow: string; title: string; body: string; quote: string; detail: string };
  gallery: { eyebrow: string; title: string; intro: string; items: [string, string, string] };
  menu: { eyebrow: string; title: string; intro: string; vegetarian: string; download: string; categories: MenuCategory[] };
  events: { eyebrow: string; title: string; intro: string; recurring: string; reserve: string; items: EventItem[] };
  reserve: {
    eyebrow: string; title: string; intro: string; notice: string; submit: string; status: string;
    fields: { name: string; email: string; phone: string; date: string; time: string; guests: string; message: string };
    placeholders: { name: string; email: string; phone: string; message: string };
  };
  contact: {
    eyebrow: string; title: string; intro: string; address: string; phone: string; email: string; hours: string;
    hoursRows: [string, string][]; submit: string; status: string;
    fields: { name: string; email: string; subject: string; message: string };
    placeholders: { name: string; email: string; subject: string; message: string };
  };
  footer: { tagline: string; navigation: string; contact: string; demo: string; top: string };
}

export const content: Record<Language, LocalizedContent> = {
  de: {
    meta: {
      title: 'Imperial | Restaurant & Pizzeria',
      description: 'Italienische Lebensfreude, Schweizer Qualität und herzliche Gastfreundschaft am See.',
    },
    nav: { menu: 'Speisekarte', events: 'Events', reserve: 'Reservieren', about: 'Über uns', open: 'Menü öffnen', close: 'Menü schließen' },
    hero: {
      eyebrow: 'Restaurant & Pizzeria · Schweiz',
      title: 'Italienische Seele. Schweizer Haltung.',
      subtitle: 'Eine Tafel für Familie, Freunde und die schönsten Abende am See.',
      primary: 'Tisch reservieren',
      secondary: 'Speisekarte entdecken',
      scroll: 'Entdecken',
    },
    about: {
      eyebrow: 'Passione · Famiglia · Qualità',
      title: 'Wo alpine Ruhe auf italienische Lebensfreude trifft.',
      body: 'Imperial verbindet ehrliche italienische Küche mit jener Sorgfalt, für die die Schweiz bekannt ist. Hausgemachte Pasta, knusprige Pizza und saisonale Zutaten kommen bei uns ohne Umwege auf den Tisch – zum Teilen, Bleiben und Wiederkommen.',
      quote: 'Gute Küche beginnt mit Zeit. Gute Abende mit Menschen.',
      detail: 'Von Hand gemacht · Saisonal gedacht',
    },
    gallery: {
      eyebrow: 'Momenti Imperiali',
      title: 'Handwerk, Wärme und eine lange Tafel.',
      intro: 'Ein Blick hinter die Kulissen und mitten hinein in jene Augenblicke, für die man gerne länger bleibt.',
      items: ['Feuer & Handwerk', 'Zusammen an einem Tisch', 'Dolce zum Schluss'],
    },
    menu: {
      eyebrow: 'La nostra cucina',
      title: 'Ein Blick in unsere Speisekarte',
      intro: 'Klassiker mit Charakter, serviert in Schweizer Franken. Unsere Karte folgt der Saison.',
      vegetarian: 'Vegetarisch',
      download: 'Speisekarte als PDF',
      categories: [
        { id: 'antipasti', label: 'Antipasti', dishes: [
          { name: 'Burrata Imperiale', description: 'Datterini, Basilikumöl, geröstetes Sauerteigbrot', price: 19, vegetarian: true },
          { name: 'Vitello Tonnato', description: 'Kalbfleisch, Thunfischcrème, Kapern, Zitrone', price: 24 },
          { name: 'Polpo alla Griglia', description: 'Oktopus, Kartoffel, Olive, Petersilie', price: 26 },
        ] },
        { id: 'pasta', label: 'Pasta & Risotto', dishes: [
          { name: 'Tagliolini al Tartufo', description: 'Butter, Salbei, Parmesan, schwarzer Trüffel', price: 32, vegetarian: true },
          { name: 'Pappardelle al Ragù', description: 'Geschmortes Rind, Sangiovese, Rosmarin', price: 29 },
          { name: 'Risotto al Limone', description: 'Tessiner Merlot, Zitrone, Kräuter, Mascarpone', price: 28, vegetarian: true },
        ] },
        { id: 'pizza', label: 'Pizza', dishes: [
          { name: 'Margherita Imperiale', description: 'San Marzano, Fior di Latte, Basilikum', price: 21, vegetarian: true },
          { name: 'Tartufo & Funghi', description: 'Fior di Latte, Waldpilze, Trüffelcrème', price: 29, vegetarian: true },
          { name: 'Prosciutto di Parma', description: 'San Marzano, Büffelmozzarella, Rucola', price: 28 },
        ] },
        { id: 'secondi', label: 'Secondi & Dolci', dishes: [
          { name: 'Branzino al Lago', description: 'Wolfsbarsch, Fenchel, Zitrone, Weissweinsud', price: 39 },
          { name: 'Melanzana Affumicata', description: 'Aubergine, Tomate, Pecorino, Pinienkerne', price: 27, vegetarian: true },
          { name: 'Tiramisù della Casa', description: 'Mascarpone, Espresso, Kakao, Amaretto', price: 13, vegetarian: true },
        ] },
      ],
    },
    events: {
      eyebrow: 'Insieme', title: 'Abende, die man teilt',
      intro: 'Wiederkehrende Genussmomente für lange Tafeln, neue Entdeckungen und kleine Traditionen.',
      recurring: 'Wiederkehrend', reserve: 'Platz anfragen',
      items: [
        { number: '01', cadence: 'Jeden ersten Freitag', title: 'Tavolata Italiana', description: 'Vier Gänge in grossen Schüsseln, offene Flaschen und ein Tisch für alle.' },
        { number: '02', cadence: 'Letzter Donnerstag im Monat', title: 'Degustazione di Vini', description: 'Eine geführte Reise durch vier italienische Regionen mit passenden Kleinigkeiten.' },
        { number: '03', cadence: 'Jeden Sonntagmittag', title: 'Domenica in Famiglia', description: 'Entspanntes Familienmenü mit Pasta zum Teilen und Dolci für die ganze Runde.' },
      ],
    },
    reserve: {
      eyebrow: 'La vostra tavola', title: 'Ihr Tisch wartet',
      intro: 'Senden Sie uns Ihre Wunschzeit. Wir melden uns persönlich mit der Bestätigung.',
      notice: 'Die Anfrage ist erst nach unserer Bestätigung verbindlich.', submit: 'Anfrage per E-Mail senden', status: 'Ihr E-Mail-Programm wird geöffnet …',
      fields: { name: 'Name', email: 'E-Mail', phone: 'Telefon', date: 'Datum', time: 'Uhrzeit', guests: 'Personen', message: 'Nachricht' },
      placeholders: { name: 'Vor- und Nachname', email: 'name@beispiel.ch', phone: '+41 …', message: 'Allergien, Anlass oder besondere Wünsche' },
    },
    contact: {
      eyebrow: 'Contatto', title: 'Bleiben wir in Kontakt',
      intro: 'Für Feiern, Gruppen und alle Fragen schreiben Sie uns direkt.',
      address: 'Adresse', phone: 'Telefon', email: 'E-Mail', hours: 'Öffnungszeiten',
      hoursRows: [['Montag', 'Ruhetag'], ['Dienstag – Samstag', '11:30–14:00 · 17:30–23:00'], ['Sonntag', '11:30–21:30']],
      submit: 'Nachricht per E-Mail senden', status: 'Ihr E-Mail-Programm wird geöffnet …',
      fields: { name: 'Name', email: 'E-Mail', subject: 'Betreff', message: 'Nachricht' },
      placeholders: { name: 'Vor- und Nachname', email: 'name@beispiel.ch', subject: 'Worum geht es?', message: 'Ihre Nachricht an uns' },
    },
    footer: { tagline: 'Italienische Seele. Schweizer Haltung.', navigation: 'Navigation', contact: 'Kontakt', demo: 'Demo-Inhalte · Kontaktdaten vor Publikation ersetzen', top: 'Nach oben' },
  },
  fr: {
    meta: {
      title: 'Imperial | Restaurant & Pizzeria',
      description: 'La joie de vivre italienne, la qualité suisse et un accueil chaleureux au bord du lac.',
    },
    nav: { menu: 'La carte', events: 'Événements', reserve: 'Réserver', about: 'À propos', open: 'Ouvrir le menu', close: 'Fermer le menu' },
    hero: {
      eyebrow: 'Restaurant & Pizzeria · Suisse',
      title: "L’âme italienne. L’exigence suisse.",
      subtitle: 'Une table pour la famille, les amis et les plus belles soirées au bord du lac.',
      primary: 'Réserver une table', secondary: 'Découvrir la carte', scroll: 'Découvrir',
    },
    about: {
      eyebrow: 'Passione · Famiglia · Qualità', title: "Quand la sérénité alpine rencontre l’art de vivre italien.",
      body: "Imperial marie une cuisine italienne sincère au soin qui fait la réputation de la Suisse. Pâtes maison, pizzas croustillantes et produits de saison arrivent directement à table – pour partager, rester et revenir.",
      quote: 'La bonne cuisine commence avec du temps. Les belles soirées avec des personnes.', detail: 'Fait main · Inspiré par les saisons',
    },
    gallery: {
      eyebrow: 'Momenti Imperiali',
      title: 'Le geste, la chaleur et une grande tablée.',
      intro: "Un regard en cuisine et au cœur de ces instants qui donnent envie de s'attarder.",
      items: ['Le feu et le geste', 'Ensemble à table', 'Une douceur pour finir'],
    },
    menu: {
      eyebrow: 'La nostra cucina', title: 'Un aperçu de notre carte',
      intro: 'Des classiques de caractère, servis en francs suisses. Notre carte évolue avec les saisons.', vegetarian: 'Végétarien',
      download: 'Télécharger la carte PDF',
      categories: [
        { id: 'antipasti', label: 'Antipasti', dishes: [
          { name: 'Burrata Imperiale', description: 'Datterini, huile de basilic, pain au levain grillé', price: 19, vegetarian: true },
          { name: 'Vitello Tonnato', description: 'Veau, crème de thon, câpres, citron', price: 24 },
          { name: 'Polpo alla Griglia', description: 'Poulpe, pomme de terre, olive, persil', price: 26 },
        ] },
        { id: 'pasta', label: 'Pâtes & Risotto', dishes: [
          { name: 'Tagliolini al Tartufo', description: 'Beurre, sauge, parmesan, truffe noire', price: 32, vegetarian: true },
          { name: 'Pappardelle al Ragù', description: 'Bœuf braisé, Sangiovese, romarin', price: 29 },
          { name: 'Risotto al Limone', description: 'Merlot tessinois, citron, herbes, mascarpone', price: 28, vegetarian: true },
        ] },
        { id: 'pizza', label: 'Pizza', dishes: [
          { name: 'Margherita Imperiale', description: 'San Marzano, fior di latte, basilic', price: 21, vegetarian: true },
          { name: 'Tartufo & Funghi', description: 'Fior di latte, champignons, crème de truffe', price: 29, vegetarian: true },
          { name: 'Prosciutto di Parma', description: 'San Marzano, mozzarella di bufala, roquette', price: 28 },
        ] },
        { id: 'secondi', label: 'Secondi & Desserts', dishes: [
          { name: 'Branzino al Lago', description: 'Bar, fenouil, citron, jus au vin blanc', price: 39 },
          { name: 'Melanzana Affumicata', description: 'Aubergine, tomate, pecorino, pignons', price: 27, vegetarian: true },
          { name: 'Tiramisù della Casa', description: 'Mascarpone, espresso, cacao, amaretto', price: 13, vegetarian: true },
        ] },
      ],
    },
    events: {
      eyebrow: 'Insieme', title: 'Des soirées à partager',
      intro: 'Des rendez-vous gourmands pour les grandes tablées, les découvertes et les petites traditions.', recurring: 'Récurrent', reserve: 'Demander une place',
      items: [
        { number: '01', cadence: 'Chaque premier vendredi', title: 'Tavolata Italiana', description: 'Quatre services à partager, des bouteilles ouvertes et une grande table pour tous.' },
        { number: '02', cadence: 'Dernier jeudi du mois', title: 'Degustazione di Vini', description: 'Un voyage guidé dans quatre régions italiennes, accompagné de petites assiettes.' },
        { number: '03', cadence: 'Chaque dimanche midi', title: 'Domenica in Famiglia', description: 'Menu familial décontracté, pâtes à partager et dolci pour toute la tablée.' },
      ],
    },
    reserve: {
      eyebrow: 'La vostra tavola', title: 'Votre table vous attend', intro: "Envoyez-nous l’horaire souhaité. Nous vous confirmerons personnellement la réservation.",
      notice: "La demande n’est définitive qu’après notre confirmation.", submit: 'Envoyer la demande par e-mail', status: 'Votre messagerie va s’ouvrir…',
      fields: { name: 'Nom', email: 'E-mail', phone: 'Téléphone', date: 'Date', time: 'Heure', guests: 'Personnes', message: 'Message' },
      placeholders: { name: 'Prénom et nom', email: 'nom@exemple.ch', phone: '+41 …', message: 'Allergies, occasion ou souhaits particuliers' },
    },
    contact: {
      eyebrow: 'Contatto', title: 'Restons en contact', intro: 'Pour les fêtes, les groupes et toutes vos questions, écrivez-nous directement.',
      address: 'Adresse', phone: 'Téléphone', email: 'E-mail', hours: 'Horaires',
      hoursRows: [['Lundi', 'Fermé'], ['Mardi – samedi', '11:30–14:00 · 17:30–23:00'], ['Dimanche', '11:30–21:30']],
      submit: 'Envoyer le message par e-mail', status: 'Votre messagerie va s’ouvrir…',
      fields: { name: 'Nom', email: 'E-mail', subject: 'Objet', message: 'Message' },
      placeholders: { name: 'Prénom et nom', email: 'nom@exemple.ch', subject: 'Comment pouvons-nous vous aider ?', message: 'Votre message' },
    },
    footer: { tagline: "L’âme italienne. L’exigence suisse.", navigation: 'Navigation', contact: 'Contact', demo: 'Contenu de démonstration · Remplacer les coordonnées avant publication', top: 'Retour en haut' },
  },
  it: {
    meta: {
      title: 'Imperial | Ristorante & Pizzeria',
      description: 'Gioia di vivere italiana, qualità svizzera e calorosa ospitalità sul lago.',
    },
    nav: { menu: 'Menu', events: 'Eventi', reserve: 'Prenota', about: 'Chi siamo', open: 'Apri il menu', close: 'Chiudi il menu' },
    hero: {
      eyebrow: 'Ristorante & Pizzeria · Svizzera', title: 'Anima italiana. Cura svizzera.',
      subtitle: 'Una tavola per la famiglia, gli amici e le serate più belle sul lago.', primary: 'Prenota un tavolo', secondary: 'Scopri il menu', scroll: 'Scopri',
    },
    about: {
      eyebrow: 'Passione · Famiglia · Qualità', title: "Dove la quiete alpina incontra l’allegria italiana.",
      body: "Imperial unisce una cucina italiana sincera alla cura per cui la Svizzera è conosciuta. Pasta fatta in casa, pizza croccante e ingredienti di stagione arrivano in tavola senza deviazioni – per condividere, restare e tornare.",
      quote: 'La buona cucina comincia con il tempo. Le belle serate con le persone.', detail: 'Fatto a mano · Secondo stagione',
    },
    gallery: {
      eyebrow: 'Momenti Imperiali',
      title: 'Mani, calore e una lunga tavolata.',
      intro: 'Uno sguardo dietro le quinte e dentro quei momenti che fanno venire voglia di restare.',
      items: ['Fuoco e mestiere', 'Insieme a tavola', 'Il dolce finale'],
    },
    menu: {
      eyebrow: 'La nostra cucina', title: 'Uno sguardo al nostro menu', intro: 'Classici con carattere, serviti in franchi svizzeri. Il nostro menu segue le stagioni.', vegetarian: 'Vegetariano',
      download: 'Scarica il menu PDF',
      categories: [
        { id: 'antipasti', label: 'Antipasti', dishes: [
          { name: 'Burrata Imperiale', description: 'Datterini, olio al basilico, pane a lievitazione naturale', price: 19, vegetarian: true },
          { name: 'Vitello Tonnato', description: 'Vitello, crema di tonno, capperi, limone', price: 24 },
          { name: 'Polpo alla Griglia', description: 'Polpo, patata, oliva, prezzemolo', price: 26 },
        ] },
        { id: 'pasta', label: 'Pasta & Risotto', dishes: [
          { name: 'Tagliolini al Tartufo', description: 'Burro, salvia, parmigiano, tartufo nero', price: 32, vegetarian: true },
          { name: 'Pappardelle al Ragù', description: 'Manzo brasato, Sangiovese, rosmarino', price: 29 },
          { name: 'Risotto al Limone', description: 'Merlot ticinese, limone, erbe, mascarpone', price: 28, vegetarian: true },
        ] },
        { id: 'pizza', label: 'Pizza', dishes: [
          { name: 'Margherita Imperiale', description: 'San Marzano, fior di latte, basilico', price: 21, vegetarian: true },
          { name: 'Tartufo & Funghi', description: 'Fior di latte, funghi di bosco, crema al tartufo', price: 29, vegetarian: true },
          { name: 'Prosciutto di Parma', description: 'San Marzano, mozzarella di bufala, rucola', price: 28 },
        ] },
        { id: 'secondi', label: 'Secondi & Dolci', dishes: [
          { name: 'Branzino al Lago', description: 'Branzino, finocchio, limone, salsa al vino bianco', price: 39 },
          { name: 'Melanzana Affumicata', description: 'Melanzana, pomodoro, pecorino, pinoli', price: 27, vegetarian: true },
          { name: 'Tiramisù della Casa', description: 'Mascarpone, espresso, cacao, amaretto', price: 13, vegetarian: true },
        ] },
      ],
    },
    events: {
      eyebrow: 'Insieme', title: 'Serate da condividere', intro: 'Appuntamenti di gusto per lunghe tavolate, nuove scoperte e piccole tradizioni.', recurring: 'Ricorrente', reserve: 'Richiedi un posto',
      items: [
        { number: '01', cadence: 'Ogni primo venerdì', title: 'Tavolata Italiana', description: 'Quattro portate da condividere, bottiglie aperte e una grande tavola per tutti.' },
        { number: '02', cadence: 'Ultimo giovedì del mese', title: 'Degustazione di Vini', description: 'Un viaggio guidato in quattro regioni italiane con piccoli abbinamenti.' },
        { number: '03', cadence: 'Ogni domenica a pranzo', title: 'Domenica in Famiglia', description: 'Menu familiare, pasta da condividere e dolci per tutta la tavolata.' },
      ],
    },
    reserve: {
      eyebrow: 'La vostra tavola', title: 'Il vostro tavolo vi aspetta', intro: "Inviateci l’orario desiderato. Vi risponderemo personalmente con la conferma.",
      notice: 'La richiesta è valida solo dopo la nostra conferma.', submit: 'Invia la richiesta via e-mail', status: 'Si aprirà il vostro programma e-mail…',
      fields: { name: 'Nome', email: 'E-mail', phone: 'Telefono', date: 'Data', time: 'Ora', guests: 'Persone', message: 'Messaggio' },
      placeholders: { name: 'Nome e cognome', email: 'nome@esempio.ch', phone: '+41 …', message: 'Allergie, occasione o richieste particolari' },
    },
    contact: {
      eyebrow: 'Contatto', title: 'Restiamo in contatto', intro: 'Per feste, gruppi e qualsiasi domanda, scriveteci direttamente.',
      address: 'Indirizzo', phone: 'Telefono', email: 'E-mail', hours: 'Orari',
      hoursRows: [['Lunedì', 'Chiuso'], ['Martedì – sabato', '11:30–14:00 · 17:30–23:00'], ['Domenica', '11:30–21:30']],
      submit: 'Invia il messaggio via e-mail', status: 'Si aprirà il vostro programma e-mail…',
      fields: { name: 'Nome', email: 'E-mail', subject: 'Oggetto', message: 'Messaggio' },
      placeholders: { name: 'Nome e cognome', email: 'nome@esempio.ch', subject: 'Come possiamo aiutarvi?', message: 'Il vostro messaggio' },
    },
    footer: { tagline: 'Anima italiana. Cura svizzera.', navigation: 'Navigazione', contact: 'Contatto', demo: 'Contenuti demo · Sostituire i contatti prima della pubblicazione', top: 'Torna su' },
  },
  en: {
    meta: {
      title: 'Imperial | Restaurant & Pizzeria',
      description: 'Italian joy, Swiss quality and heartfelt hospitality by the lake.',
    },
    nav: { menu: 'Menu', events: 'Events', reserve: 'Reserve', about: 'About us', open: 'Open menu', close: 'Close menu' },
    hero: {
      eyebrow: 'Restaurant & Pizzeria · Switzerland', title: 'Italian soul. Swiss care.',
      subtitle: 'A table for family, friends and the loveliest evenings by the lake.', primary: 'Reserve a table', secondary: 'Explore the menu', scroll: 'Explore',
    },
    about: {
      eyebrow: 'Passione · Famiglia · Qualità', title: 'Where alpine calm meets Italian joy.',
      body: 'Imperial pairs honest Italian cooking with the care Switzerland is known for. Handmade pasta, crisp pizza and seasonal ingredients come straight to the table – made for sharing, lingering and returning.',
      quote: 'Good food begins with time. Great evenings begin with people.', detail: 'Made by hand · Guided by the seasons',
    },
    gallery: {
      eyebrow: 'Momenti Imperiali',
      title: 'Craft, warmth and one long table.',
      intro: 'A glimpse behind the scenes and into the moments that make you want to linger.',
      items: ['Fire and craft', 'Together at the table', 'Something sweet to finish'],
    },
    menu: {
      eyebrow: 'La nostra cucina', title: 'A taste of our menu', intro: 'Classics with character, served in Swiss francs. Our menu follows the seasons.', vegetarian: 'Vegetarian',
      download: 'Download menu PDF',
      categories: [
        { id: 'antipasti', label: 'Antipasti', dishes: [
          { name: 'Burrata Imperiale', description: 'Datterini tomatoes, basil oil, toasted sourdough', price: 19, vegetarian: true },
          { name: 'Vitello Tonnato', description: 'Veal, tuna cream, capers, lemon', price: 24 },
          { name: 'Polpo alla Griglia', description: 'Octopus, potato, olive, parsley', price: 26 },
        ] },
        { id: 'pasta', label: 'Pasta & Risotto', dishes: [
          { name: 'Tagliolini al Tartufo', description: 'Butter, sage, parmesan, black truffle', price: 32, vegetarian: true },
          { name: 'Pappardelle al Ragù', description: 'Braised beef, Sangiovese, rosemary', price: 29 },
          { name: 'Risotto al Limone', description: 'Ticino Merlot, lemon, herbs, mascarpone', price: 28, vegetarian: true },
        ] },
        { id: 'pizza', label: 'Pizza', dishes: [
          { name: 'Margherita Imperiale', description: 'San Marzano, fior di latte, basil', price: 21, vegetarian: true },
          { name: 'Tartufo & Funghi', description: 'Fior di latte, wild mushrooms, truffle cream', price: 29, vegetarian: true },
          { name: 'Prosciutto di Parma', description: 'San Marzano, buffalo mozzarella, rocket', price: 28 },
        ] },
        { id: 'secondi', label: 'Secondi & Desserts', dishes: [
          { name: 'Branzino al Lago', description: 'Sea bass, fennel, lemon, white wine jus', price: 39 },
          { name: 'Melanzana Affumicata', description: 'Aubergine, tomato, pecorino, pine nuts', price: 27, vegetarian: true },
          { name: 'Tiramisù della Casa', description: 'Mascarpone, espresso, cocoa, amaretto', price: 13, vegetarian: true },
        ] },
      ],
    },
    events: {
      eyebrow: 'Insieme', title: 'Evenings made to share', intro: 'Recurring moments for long tables, new discoveries and little traditions.', recurring: 'Recurring', reserve: 'Request a seat',
      items: [
        { number: '01', cadence: 'Every first Friday', title: 'Tavolata Italiana', description: 'Four family-style courses, open bottles and one generous table for everyone.' },
        { number: '02', cadence: 'Last Thursday of the month', title: 'Degustazione di Vini', description: 'A guided journey through four Italian regions with thoughtful small plates.' },
        { number: '03', cadence: 'Every Sunday lunch', title: 'Domenica in Famiglia', description: 'A relaxed family menu with pasta to share and dolci for the whole table.' },
      ],
    },
    reserve: {
      eyebrow: 'La vostra tavola', title: 'Your table is waiting', intro: 'Send us your preferred time. We will reply personally with confirmation.',
      notice: 'Your request is only binding after we confirm it.', submit: 'Send request by email', status: 'Your email app will open…',
      fields: { name: 'Name', email: 'Email', phone: 'Phone', date: 'Date', time: 'Time', guests: 'Guests', message: 'Message' },
      placeholders: { name: 'First and last name', email: 'name@example.ch', phone: '+41 …', message: 'Allergies, occasion or special requests' },
    },
    contact: {
      eyebrow: 'Contatto', title: "Let's stay in touch", intro: 'For celebrations, groups and any questions, write to us directly.',
      address: 'Address', phone: 'Phone', email: 'Email', hours: 'Opening hours',
      hoursRows: [['Monday', 'Closed'], ['Tuesday – Saturday', '11:30–14:00 · 17:30–23:00'], ['Sunday', '11:30–21:30']],
      submit: 'Send message by email', status: 'Your email app will open…',
      fields: { name: 'Name', email: 'Email', subject: 'Subject', message: 'Message' },
      placeholders: { name: 'First and last name', email: 'name@example.ch', subject: 'How can we help?', message: 'Your message' },
    },
    footer: { tagline: 'Italian soul. Swiss care.', navigation: 'Navigation', contact: 'Contact', demo: 'Demo content · Replace contact details before publishing', top: 'Back to top' },
  },
};

export function isLanguage(value: string | null): value is Language {
  return value !== null && (languages as readonly string[]).includes(value);
}
