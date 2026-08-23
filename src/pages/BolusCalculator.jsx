import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Syringe, AlertCircle, CheckCircle2, RotateCcw,
  Save, Info, ChevronDown, ChevronUp
} from "lucide-react";

const DEFAULT_SETTINGS = {
  icRatio: 10,
  isf: 50,
  targetBG: 100,
  unit: "mg/dL",
};

function toBgMgdl(val, unit) {
  return unit === "mmol/L" ? val * 18.0182 : val;
}
function fromBgMgdl(val, unit) {
  return unit === "mmol/L" ? parseFloat((val / 18.0182).toFixed(1)) : val;
}

export default function BolusCalculator() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("bolus_settings");
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch { return DEFAULT_SETTINGS; }
  });

  const [form, setForm] = useState({
    carbs: "",
    currentBG: "",
    iob: "0",
  });

  const [result, setResult] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [saved, setSaved] = useState(false);

  const unit = settings.unit;
  const bgPlaceholder = unit === "mg/dL" ? "e.g. 160" : "e.g. 8.9";
  const targetDisplay = unit === "mg/dL" ? settings.targetBG : fromBgMgdl(settings.targetBG, "mmol/L");

  function saveSettings() {
    localStorage.setItem("bolus_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function calculate() {
    const carbs = parseFloat(form.carbs) || 0;
    const currentBGRaw = parseFloat(form.currentBG) || 0;
    const iob = parseFloat(form.iob) || 0;

    const currentBGMgdl = toBgMgdl(currentBGRaw, unit);
    const targetBGMgdl = settings.targetBG;

    const carbDose = carbs / settings.icRatio;
    const correctionDose = (currentBGMgdl - targetBGMgdl) / settings.isf;
    const rawDose = carbDose + correctionDose - iob;
    const finalDose = Math.max(0, rawDose);

    setResult({ carbDose, correctionDose, iob, finalDose, rawDose });
  }

  function reset() {
    setForm({ carbs: "", currentBG: "", iob: "0" });
    setResult(null);
  }

  const isValid = form.carbs !== "" || form.currentBG !== "";

  return (
    <div className="min-h-screen bg-[#f5f7ff] dark:bg-[#0a0d1a] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Syringe className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900 dark:text-white leading-none">Bolus Calculator</p>
                <p className="text-xs text-gray-400">Carb dose + correction − IOB</p>
              </div>
            </div>
          </div>
          <div className="flex gap-1.5">
            {["mg/dL", "mmol/L"].map(u => (
              <button key={u} onClick={() => setSettings(s => ({ ...s, unit: u }))}
                className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all ${settings.unit === u ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400"}`}>
                {u}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 space-y-5">

        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            <strong>Educational tool only.</strong> This calculator does not replace medical advice. Always verify insulin doses with your diabetes care team before administering. Do not use if you are unsure of your settings.
          </p>
        </div>

        {/* Settings panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <button onClick={() => setShowSettings(s => !s)}
            className="w-full flex items-center justify-between px-5 py-4 text-left">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">Your Insulin Settings</span>
              <span className="text-xs text-gray-400 hidden sm:inline">— I:C {settings.icRatio}g, ISF {settings.isf}, Target {targetDisplay} {unit}</span>
            </div>
            {showSettings ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>

          <AnimatePresence>
            {showSettings && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="px-5 pb-5 space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Insulin-to-Carb Ratio (I:C)
                        <span className="text-gray-400 font-normal ml-1">g per 1U</span>
                      </label>
                      <input type="number" min="1" max="100" value={settings.icRatio}
                        onChange={e => setSettings(s => ({ ...s, icRatio: parseFloat(e.target.value) || 10 }))}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Insulin Sensitivity Factor (ISF)
                        <span className="text-gray-400 font-normal ml-1">{unit} per 1U</span>
                      </label>
                      <input type="number" min="1" max="500" value={unit === "mmol/L" ? fromBgMgdl(settings.isf, "mmol/L") : settings.isf}
                        onChange={e => {
                          const v = parseFloat(e.target.value) || 50;
                          setSettings(s => ({ ...s, isf: unit === "mmol/L" ? v * 18.0182 : v }));
                        }}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Target Blood Glucose
                      </label>
                      <input type="number" min="60" max="200" value={targetDisplay}
                        onChange={e => {
                          const v = parseFloat(e.target.value) || 100;
                          setSettings(s => ({ ...s, targetBG: unit === "mmol/L" ? v * 18.0182 : v }));
                        }}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <button onClick={saveSettings}
                    className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors">
                    {saved ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Save className="w-4 h-4" />}
                    {saved ? "Settings saved!" : "Save settings to browser"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 space-y-4">
          <h2 className="font-black text-gray-900 dark:text-white text-base flex items-center gap-2">
            <Syringe className="w-4 h-4 text-blue-500" /> Current Meal / Reading
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                Carbohydrates (g)
              </label>
              <input type="number" min="0" max="500" placeholder="e.g. 60"
                value={form.carbs} onChange={e => setForm(f => ({ ...f, carbs: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                Current BG ({unit})
              </label>
              <input type="number" min="0" placeholder={bgPlaceholder}
                value={form.currentBG} onChange={e => setForm(f => ({ ...f, currentBG: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                Active Insulin (IOB) — units
              </label>
              <input type="number" min="0" step="0.1" placeholder="0"
                value={form.iob} onChange={e => setForm(f => ({ ...f, iob: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={calculate} disabled={!isValid}
              className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-600/25 text-sm">
              Calculate Dose
            </button>
            {result && (
              <button onClick={reset}
                className="px-4 py-3.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold rounded-2xl text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="space-y-4"
            >
              {/* Big result card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white text-center shadow-xl shadow-blue-600/30">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Recommended Bolus Dose</p>
                <p className="text-6xl font-black leading-none tracking-tight">
                  {result.finalDose.toFixed(2)}
                </p>
                <p className="text-lg font-semibold opacity-80 mt-1">units of insulin</p>
                {result.rawDose < 0 && (
                  <p className="text-xs mt-3 bg-white/20 rounded-xl px-3 py-2">
                    ⚠️ Raw dose was negative — capped at 0U. Your IOB already covers this meal.
                  </p>
                )}
              </div>

              {/* Breakdown chips */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Dose Breakdown</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Carb Dose</p>
                        <p className="text-xs text-gray-400">{form.carbs}g ÷ I:C {settings.icRatio}</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      +{result.carbDose.toFixed(2)}U
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${result.correctionDose >= 0 ? "bg-amber-500" : "bg-blue-400"}`} />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Correction Dose</p>
                        <p className="text-xs text-gray-400">
                          (BG {form.currentBG} − Target {targetDisplay}) ÷ ISF {unit === "mmol/L" ? fromBgMgdl(settings.isf, "mmol/L") : settings.isf}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-black ${result.correctionDose >= 0 ? "text-amber-600 dark:text-amber-400" : "text-blue-500"}`}>
                      {result.correctionDose >= 0 ? "+" : ""}{result.correctionDose.toFixed(2)}U
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Active Insulin (IOB)</p>
                        <p className="text-xs text-gray-400">Subtracted to avoid stacking</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-rose-600 dark:text-rose-400">
                      −{result.iob.toFixed(2)}U
                    </span>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex items-center justify-between">
                    <span className="text-sm font-black text-gray-900 dark:text-white">Final Dose</span>
                    <span className="text-lg font-black text-blue-700 dark:text-blue-400">{result.finalDose.toFixed(2)}U</span>
                  </div>
                </div>
              </div>

              {/* Formula reference */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
                <p className="text-xs text-gray-400 font-mono leading-relaxed">
                  dose = (carbs ÷ I:C) + ((currentBG − targetBG) ÷ ISF) − IOB
                </p>
              </div>

              <div className="flex gap-3">
                <Link to="/chat" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm text-center hover:bg-blue-700 transition-all">Ask SWEETY about your dose 🤖</Link>
                <Link to="/care" className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm text-center hover:bg-emerald-700 transition-all">Log to Care Diary ❤️</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}