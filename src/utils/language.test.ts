import { describe, expect, it } from 'vitest';
import { resolveInitialLanguage } from './language';

describe('resolveInitialLanguage', () => {
  it('prefers a supported stored language', () => {
    expect(resolveInitialLanguage('it', ['fr-CH', 'de-CH'])).toBe('it');
  });

  it('uses the first supported browser language including regional variants', () => {
    expect(resolveInitialLanguage(null, ['es-ES', 'fr-CH', 'de-CH'])).toBe('fr');
  });

  it('falls back to German when no supported language is available', () => {
    expect(resolveInitialLanguage('es', ['pt-BR', 'nl-NL'])).toBe('de');
  });
});
