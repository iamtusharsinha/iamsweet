import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function IntakeQuestion({ question, subtitle, options, selected, onSelect, step, totalSteps }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg mx-auto px-4"
    >
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? "w-8 bg-orange-500" : i < step ? "w-2 bg-orange-300" : "w-2 bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      <h2 className="text-2xl md:text-3xl font-heading font-semibold text-gray-900 dark:text-white mb-2 text-center">
        {question}
      </h2>
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8 text-sm">{subtitle}</p>
      )}

      <div className="space-y-3 mt-8">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-4 ${
              selected === opt.value
                ? "border-orange-500 bg-orange-50/90 shadow-md shadow-orange-100/50"
                : "border-orange-100/60 bg-white/70 backdrop-blur-sm hover:border-orange-300 hover:bg-orange-50/50"
            }`}
          >
            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
              selected === opt.value ? "bg-orange-500" : "bg-orange-50/60"
            }`}>
              {selected === opt.value ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span>{opt.emoji}</span>
              )}
            </div>
            <div>
              <p className={`font-medium ${selected === opt.value ? "text-orange-700 dark:text-orange-400" : "text-gray-900 dark:text-white"}`}>
                {opt.label}
              </p>
              {opt.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{opt.description}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}