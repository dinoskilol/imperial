import { describe, expect, it } from 'vitest';
import { buildReservationMailto } from './mailto';

describe('mailto builders', () => {
  it('encodes a localized reservation request', () => {
    const url = buildReservationMailto('reservation@imperial.example', 'fr', {
      name: 'Zoë Rossi',
      email: 'zoe@example.com',
      phone: '+41 79 000 00 00',
      date: '2026-07-04',
      time: '19:30',
      guests: '4',
      message: 'Table près de la fenêtre',
    });

    expect(url).toContain('subject=Demande%20de%20r%C3%A9servation');
    expect(decodeURIComponent(url)).toContain('Personnes: 4');
    expect(decodeURIComponent(url)).toContain('Zoë Rossi');
  });
});
