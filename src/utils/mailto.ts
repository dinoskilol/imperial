import type { Language } from '../data/content';

export interface ReservationValues {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message: string;
}

const reservationSubjects: Record<Language, string> = {
  de: 'Reservierungsanfrage',
  fr: 'Demande de réservation',
  it: 'Richiesta di prenotazione',
  en: 'Reservation request',
};

const reservationLabels: Record<Language, string[]> = {
  de: ['Name', 'E-Mail', 'Telefon', 'Datum', 'Uhrzeit', 'Personen', 'Nachricht'],
  fr: ['Nom', 'E-mail', 'Téléphone', 'Date', 'Heure', 'Personnes', 'Message'],
  it: ['Nome', 'E-mail', 'Telefono', 'Data', 'Ora', 'Persone', 'Messaggio'],
  en: ['Name', 'Email', 'Phone', 'Date', 'Time', 'Guests', 'Message'],
};

export function buildReservationMailto(
  recipient: string,
  language: Language,
  values: ReservationValues,
): string {
  const labels = reservationLabels[language];
  const body = [
    `${labels[0]}: ${values.name}`,
    `${labels[1]}: ${values.email}`,
    `${labels[2]}: ${values.phone || '–'}`,
    `${labels[3]}: ${values.date}`,
    `${labels[4]}: ${values.time}`,
    `${labels[5]}: ${values.guests}`,
    '',
    `${labels[6]}:`,
    values.message || '–',
  ].join('\n');

  return `mailto:${recipient}?subject=${encodeURIComponent(reservationSubjects[language])}&body=${encodeURIComponent(body)}`;
}
