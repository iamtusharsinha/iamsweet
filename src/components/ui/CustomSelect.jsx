import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

/**
 * Native-feel custom select — replaces <select> for mobile WebView.
 * Props: value, onChange(value), options: [{value, label}] | string[]
 */
export default function CustomSelect({ value, onChange, options = [], className = "", placeholder = "Select…" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const normalised = options.map(o =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  const selected = normalised.find(o => o.value === value);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <span className={selected ? "" : "text-gray-400"}>{selected?.label || placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden max-h-56 overflow-y-auto">
          {normalised.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
                opt.value === value
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {opt.label}
              {opt.value === value && <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}