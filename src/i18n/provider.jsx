import { useCallback, useEffect, useMemo, useState } from 'react';
import { LANGUAGES, translations } from './translations';
import { I18nContext } from './useI18n';

const STORAGE_KEY = 'cfl-language';
const DEFAULT_LANGUAGE = 'en';

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGUAGES.some((l) => l.code === saved)) return saved;
    } catch {
      // localStorage unavailable (privacy mode / tests) — use default
    }
    return DEFAULT_LANGUAGE;
  });

  const setLanguage = useCallback((code) => {
    if (!LANGUAGES.some((l) => l.code === code)) return;
    setLanguageState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore storage errors
    }
  }, []);

  // Reflect the language in <html lang> for accessibility/SEO.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (key) => translations[language]?.[key] ?? translations.en[key] ?? key,
    [language],
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
