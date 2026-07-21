import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, ChevronRight, ChevronLeft, CheckCircle2, Circle, Clock, Flame, Activity } from "lucide-react";

const GI_INFO = {
  Low: { color: "bg-green-100 text-green-700 border-green-200", bar: "bg-green-500", pct: 30, label: "Low GI (< 55)", desc: "Minimal blood sugar impact — ideal for diabetes." },
  "Low-Medium": { color: "bg-yellow-100 text-yellow-700 border-yellow-200", bar: "bg-yellow-400", pct: 55, label: "Low-Medium GI (55–65)", desc: "Moderate impact — eat with protein or fat to blunt the spike." },
  Medium: { color: "bg-orange-100 text-orange-700 border-orange-200", bar: "bg-orange-400", pct: 68, label: "Medium GI (56–69)", desc: "Moderate impact — portion size matters here." },
  High: { color: "bg-red-100 text-red-700 border-red-200", bar: "bg-red-500", pct: 88, label: "High GI (≥ 70)", desc: "Significant spike — pair carefully with fibre and protein." },
};

export default function RecipeModal({ meal, onClose }) {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [speaking, setSpeaking] = useState(false);
  const synthRef = useRef(null);

  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  if (!meal) return null;

  const steps = meal.steps || [];
  const gi = GI_INFO[meal.glycemic] || GI_INFO["Low"];

  function speakStep(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (speaking) { setSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(`Step ${step + 1}: ${text}`);
    u.lang = "en-US";
    u.rate = 0.95;
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  }

  function speakAll() {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (speaking) { setSpeaking(false); return; }
    const allText = steps.map((s, i) => `Step ${i + 1}: ${s}`).join(". ");
    const u = new SpeechSynthesisUtterance(`Recipe for ${meal.name}. ${allText}`);
    u.lang = "en-US";
    u.rate = 0.9;
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  }

  function toggleComplete(i) {
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Hero image */}
          <div className="relative h-52 flex-shrink-0">
            <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30">{meal.cuisine}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${gi.color}`}>{gi.label}</span>
              </div>
              <h2 className="text-xl font-bold text-white leading-tight">{meal.name}</h2>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {/* Stats bar */}
            <div className="flex items-center gap-6 px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-1.5 text-sm">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="font-semibold text-gray-900 dark:text-white">{meal.calories}</span>
                <span className="text-gray-500 text-xs">cal</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-gray-900 dark:text-white">{meal.prep} min</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Activity className="w-4 h-4 text-green-500" />
                <span className="font-semibold text-gray-900 dark:text-white">GI: {meal.glycemic}</span>
              </div>
              {/* Voice all button */}
              <button
                onClick={speakAll}
                className={`ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${speaking ? "bg-blue-600 border-blue-600 text-white" : "bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600 text-blue-600 hover:bg-blue-50"}`}
              >
                {speaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                {speaking ? "Stop" : "Read All"}
              </button>
            </div>

            <div className="px-5 py-5 space-y-6">
              {/* GI Meter */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Glycaemic Index</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${gi.pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${gi.bar}`}
                    />
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{gi.pct}/100</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">{gi.desc}</p>
              </div>

              {/* Ingredients */}
              {meal.ingredients?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Ingredients</p>
                  <ul className="space-y-1.5">
                    {meal.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Step-by-step */}
              {steps.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Step-by-Step Instructions</p>
                    <span className="text-xs text-gray-400">{completed.size}/{steps.length} done</span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                    <motion.div
                      animate={{ width: `${(completed.size / steps.length) * 100}%` }}
                      className="h-full bg-green-500 rounded-full transition-all duration-300"
                    />
                  </div>

                  {/* Steps */}
                  <div className="space-y-3">
                    {steps.map((s, i) => (
                      <motion.div
                        key={i}
                        layout
                        className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                          completed.has(i)
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            : step === i
                            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                            : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-200"
                        }`}
                        onClick={() => { setStep(i); toggleComplete(i); }}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {completed.has(i)
                            ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                            : <Circle className={`w-5 h-5 ${step === i ? "text-blue-500" : "text-gray-300"}`} />
                          }
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-bold ${completed.has(i) ? "text-green-600" : step === i ? "text-blue-600" : "text-gray-400"}`}>
                              Step {i + 1}
                            </span>
                            <button
                              onClick={e => { e.stopPropagation(); setStep(i); speakStep(s); }}
                              className="w-7 h-7 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                            </button>
                          </div>
                          <p className={`text-sm leading-relaxed ${completed.has(i) ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-300"}`}>{s}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Prev / Next nav */}
                  <div className="flex items-center justify-between mt-4">
                    <button
                      disabled={step === 0}
                      onClick={() => setStep(s => s - 1)}
                      className="flex items-center gap-1 text-sm text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed hover:underline"
                    >
                      <ChevronLeft className="w-4 h-4" /> Prev
                    </button>
                    <span className="text-xs text-gray-400">{step + 1} of {steps.length}</span>
                    <button
                      disabled={step === steps.length - 1}
                      onClick={() => setStep(s => s + 1)}
                      className="flex items-center gap-1 text-sm text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed hover:underline"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Diabetes tip */}
              {meal.diabetesTip && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">💡 Diabetes Tip</p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">{meal.diabetesTip}</p>
                </div>
              )}

              <div className="h-4" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}