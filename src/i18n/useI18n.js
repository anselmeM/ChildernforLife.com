import { createContext, useContext } from 'react';
import { translations } from './translations';

// Without a provider (e.g. tests rendering a component directly), t() resolves
// to the English dictionary — the site's default language.
export const I18nContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => translations.en[key] ?? key,
});

export function useI18n() {
  return useContext(I18nContext);
}
