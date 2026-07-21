import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, Smile, Zap, Pill, FileText, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

const MOODS = [
  { key: "great", emoji: "😄", label: "Great" },
  { key: "good", emoji: "🙂", label: "Good" },
  { key: "okay", emoji: "😐", label: "Okay" },
  { key: "low", emoji: "😔", label: "Low" },
  { key: "rough", emoji: "😣", label: "Rough" },
];

const ENERGY_LEVELS = [
  { key: "high", label: "High", color: "bg-green-100 text-green-700 border-green-200" },
  { key: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { key: "low", label: "Low", color: "bg-red-100 text-red-700 border-red-200" },
];

const COMMON_SYMPTOMS = [
  "Thirst", "Frequent urination", "Blurry vision", "Fatigue",
  "Headache", "Shakiness", "Sweating", "Numbness/tingling",
  "Slow healing", "Nausea"
];

export default function CheckInModal({ user, medications, onClose, onSaved }) {
  const [step, setStep] = useState(0);
  const [bloodSugar, setBloodSugar] = useState("");
  const [unit, setUnit] = useState("mg/dL");
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [medsTaken, setMedsTaken] = useState([]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  function toggleSymptom(s) {
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }
  function toggleMed(m) {
    setMedsTaken(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  }

  async function finish() {
    setSaving(true);
    try {
      // Generate AI summary
      const prompt = `You are DiabetesHub AI Care Companion. A patient just completed their daily check-in.

Blood sugar: ${bloodSugar || "not recorded"} ${unit}
Mood: ${mood || "not recorded"}
Energy: ${energy || "not recorded"}
Symptoms: ${symptoms.length ? symptoms.join(", ") : "none"}
Medications taken: ${medsTaken.length ? medsTaken.join(", ") : "none noted"}
Notes: ${notes || "none"}

Write a warm, empathetic 2-3 sentence care summary. Note anything that needs attention (e.g. high/low blood sugar, symptoms). End with one actionable tip for today. Keep it under 80 words.`;

      const summary = await base44.integrations.Core.InvokeLLM({ prompt });
      setAiSummary(summary);

      if (user) {
        await base44.entities.CareLog.create({
          user_id: user.id,
          date: new Date().toISOString().split("T")[0],
          blood_sugar: bloodSugar ? parseFloat(bloodSugar) : undefined,
          blood_sugar_unit: unit,
          mood,
          energy,
          symptoms,
          medications_taken: medsTaken,
          notes,
          ai_summary: summary,
        });
      }
      setStep(4); // summary step
    } catch (e) {
      setAiSummary("Great job completing today's check-in! Keep monitoring your levels and stay consistent with your medications.");
      setStep(4);
    } finally {
      setSaving(false);
    }
  }

  const steps = [
    // Step 0: Blood sugar
    <div key="bs" className="space-y-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Blood Sugar Reading</p>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="e.g. 120"
          value={bloodSugar}
          onChange={e => setBloodSugar(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select value={unit} onChange={e => setUnit(e.target.value)} className="px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none">
          <option>mg/dL</option>
          <option>mmol/L</option>
        </select>
      </div>
      {bloodSugar && (
        <div className={`text-sm px-3 py-2 rounded-lg font-medium ${
          unit === "mg/dL"
            ? parseFloat(bloodSugar) < 70 ? "bg-red-100 text-red-700" :
              parseFloat(bloodSugar) <= 180 ? "bg-green-100 text-green-700" :
              "bg-orange-100 text-orange-700"
            : parseFloat(bloodSugar) < 3.9 ? "bg-red-100 text-red-700" :
              parseFloat(bloodSugar) <= 10 ? "bg-green-100 text-green-700" :
              "bg-orange-100 text-orange-700"
        }`}>
          {unit === "mg/dL"
            ? parseFloat(bloodSugar) < 70 ? "⚠️ Low — consider having a fast-acting carb" :
              parseFloat(bloodSugar) <= 180 ? "✅ In target range" :
              "⚠️ Above target — note your last meal and activity"
            : parseFloat(bloodSugar) < 3.9 ? "⚠️ Low — consider having a fast-acting carb" :
              parseFloat(bloodSugar) <= 10 ? "✅ In target range" :
              "⚠️ Above target — note your last meal and activity"
          }
        </div>
      )}
      <p className="text-xs text-gray-400">Skip if you haven't tested yet today.</p>
    </div>,

    // Step 1: Mood & Energy
    <div key="mood" className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">How are you feeling?</p>
        <div className="flex gap-2 flex-wrap">
          {MOODS.map(m => (
            <button key={m.key} onClick={() => setMood(m.key)}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border-2 transition-all ${mood === m.key ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" : "border-gray-200 dark:border-gray-700 hover:border-blue-300"}`}>
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{m.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Energy Level</p>
        <div className="flex gap-2">
          {ENERGY_LEVELS.map(e => (
            <button key={e.key} onClick={() => setEnergy(e.key)}
              className={`flex-1 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${energy === e.key ? "border-blue-500 " + e.color : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-300"}`}>
              {e.label}
            </button>
          ))}
        </div>
      </div>
    </div>,

    // Step 2: Symptoms
    <div key="symptoms" className="space-y-3">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Any symptoms today?</p>
      <div className="flex flex-wrap gap-2">
        {COMMON_SYMPTOMS.map(s => (
          <button key={s} onClick={() => toggleSymptom(s)}
            className={`text-sm px-3 py-1.5 rounded-full border transition-all ${symptoms.includes(s) ? "bg-blue-600 border-blue-600 text-white" : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400"}`}>
            {s}
          </button>
        ))}
      </div>
      {medications?.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Medications taken today?</p>
          <div className="space-y-2">
            {medications.map(med => (
              <button key={med.name} onClick={() => toggleMed(med.name)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 text-left transition-all ${medsTaken.includes(med.name) ? "border-green-400 bg-green-50 dark:bg-green-900/20" : "border-gray-200 dark:border-gray-700 hover:border-green-300"}`}>
                <Pill className={`w-4 h-4 ${medsTaken.includes(med.name) ? "text-green-600" : "text-gray-400"}`} />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{med.name}</p>
                  <p className="text-xs text-gray-400">{med.dose}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>,

    // Step 3: Notes
    <div key="notes" className="space-y-3">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Anything else to note?</p>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="e.g. ate late, skipped gym, feeling stressed about work…"
        rows={4}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <p className="text-xs text-gray-400">This helps your AI companion identify patterns over time.</p>
    </div>,
  ];

  const STEP_TITLES = ["Blood Sugar", "Mood & Energy", "Symptoms", "Notes"];

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
          className="bg-white dark:bg-gray-900 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">Daily Check-In</h2>
              {step < 4 && <p className="text-xs text-gray-400 mt-0.5">{STEP_TITLES[step]} · {step + 1} of 4</p>}
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Progress bar */}
          {step < 4 && (
            <div className="px-5 pt-3">
              <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${((step + 1) / 4) * 100}%` }} className="h-full bg-blue-500 rounded-full transition-all duration-300" />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {step < 4 ? steps[step] : (
              // AI Summary step
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Check-in Complete!</p>
                    <p className="text-xs text-gray-400">Here's your AI care summary</p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
                  <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">{aiSummary}</p>
                </div>

                {/* Quick recap */}
                <div className="grid grid-cols-2 gap-2">
                  {bloodSugar && <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3"><p className="text-xs text-gray-400">Blood Sugar</p><p className="font-bold text-gray-900 dark:text-white">{bloodSugar} {unit}</p></div>}
                  {mood && <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3"><p className="text-xs text-gray-400">Mood</p><p className="font-bold text-gray-900 dark:text-white capitalize">{mood}</p></div>}
                  {energy && <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3"><p className="text-xs text-gray-400">Energy</p><p className="font-bold text-gray-900 dark:text-white capitalize">{energy}</p></div>}
                  {symptoms.length > 0 && <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 col-span-2"><p className="text-xs text-gray-400">Symptoms</p><p className="font-semibold text-gray-900 dark:text-white text-sm">{symptoms.join(", ")}</p></div>}
                </div>

                {!user && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
                    <p className="text-xs text-amber-800 dark:text-amber-300">💡 <strong>Create an account</strong> to save your check-in history and get personalized insights over time.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 pb-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex gap-3">
            {step > 0 && step < 4 && (
              <button onClick={() => setStep(s => s - 1)} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-colors">
                Back
              </button>
            )}
            {step < 3 && (
              <button onClick={() => setStep(s => s + 1)} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-semibold text-white transition-colors">
                Continue
              </button>
            )}
            {step === 3 && (
              <button onClick={finish} disabled={saving} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating summary…</> : "Complete Check-In ✓"}
              </button>
            )}
            {step === 4 && (
              <button onClick={() => { onSaved?.(); onClose(); }} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-semibold text-white transition-colors">
                Done
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}