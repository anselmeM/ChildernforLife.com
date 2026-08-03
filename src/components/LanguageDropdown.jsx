import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { LANGUAGES } from '../i18n/translations';

export default function LanguageDropdown() {
  const { language, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // Close when clicking outside.
  useEffect(() => {
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Language"
        className="hover:text-[#008cb3] transition-colors flex items-center cursor-pointer whitespace-nowrap"
      >
        <span className="mr-1">🌐</span> {current.label}
        <ChevronDown size={13} className={`ml-0.5 text-[#005a74] stroke-[2.5] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        role="menu"
        className={`absolute left-0 mt-2 w-[150px] bg-white border border-[#005c7a] rounded-xl shadow-xl p-2 flex-col space-y-1 z-50 text-left text-[16.94px] text-[#005c7a] font-bold ${open ? 'flex' : 'hidden'}`}
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            role="menuitem"
            onClick={() => {
              setLanguage(lang.code);
              setOpen(false);
            }}
            className={`text-left px-2 py-1 rounded transition-colors ${
              lang.code === language ? 'bg-[#e1f3f8] hover:underline' : 'hover:underline'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
