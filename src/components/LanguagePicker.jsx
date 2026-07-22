import React, { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const LANGS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export default function LanguagePicker() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = LANGS.find(l => l.code === lang) || LANGS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 transition-all text-sm"
        title="Change language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline text-xs font-semibold text-gray-700 dark:text-gray-300">{current.label}</span>
        <Globe className="w-3 h-3 text-gray-400" />
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden min-w-[140px]">
          {LANGS.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-blue-50 dark:hover:bg-gray-800 transition-all text-left ${lang === l.code ? "bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-gray-300"}`}
            >
              <span className="text-base">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}