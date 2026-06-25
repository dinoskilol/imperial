import { isLanguage, type Language } from '../data/content';

export function resolveInitialLanguage(
  storedLanguage: string | null,
  browserLanguages: readonly string[] | string | null | undefined,
): Language {
  if (isLanguage(storedLanguage)) return storedLanguage;

  const candidates = typeof browserLanguages === 'string' ? [browserLanguages] : browserLanguages ?? [];
  for (const candidate of candidates) {
    const baseLanguage = candidate.toLowerCase().split('-')[0];
    if (isLanguage(baseLanguage)) return baseLanguage;
  }

  return 'de';
}
