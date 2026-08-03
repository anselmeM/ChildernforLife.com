import { useI18n } from '../i18n/useI18n';
import { LANGUAGES } from '../i18n/translations';

export default function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage } = useI18n();

  return (
    <div className={`flex items-center space-x-1 ${className}`} role="group" aria-label="Language">
      {LANGUAGES.map((lang) => {
        const active = lang.code === language;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            aria-pressed={active}
            className={`px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-colors ${
              active ? 'bg-[#005c7a] text-white' : 'text-gray-500 hover:text-[#005c7a]'
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
