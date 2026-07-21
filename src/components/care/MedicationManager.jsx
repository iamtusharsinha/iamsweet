import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pill, Trash2, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";

const FREQ_LABELS = {
  once_daily: "Once daily",
  twice_daily: "Twice daily",
  three_times_daily: "3× daily",
  with_meals: "With meals",
  as_needed: "As needed",
};

export default function MedicationManager({ user, medications, onUpdate }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", dose: "", frequency: "once_daily", notes: "" });
  const [saving, setSaving] = useState(false);

  async function addMed() {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      await base44.entities.Medication.create({ ...form, user_id: user.id, active: true });
      setForm({ name: "", dose: "", frequency: "once_daily", notes: "" });
      setAdding(false);
      onUpdate();
    } finally { setSaving(false); }
  }

  async function deleteMed(id) {
    await base44.entities.Medication.delete(id);
    onUpdate();
  }

  if (!user) return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 text-center">
      <Pill className="w-8 h-8 text-gray-300 mx-auto mb-2" />
      <p className="text-sm text-gray-500">Log in to manage your medications</p>
    </div>
  );

  return (
    <div className="space-y-3">
      {medications.map((med, i) => (
        <motion.div key={med.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
          className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
            <Pill className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{med.name}</p>
            <p className="text-xs text-gray-500">{med.dose && `${med.dose} · `}{FREQ_LABELS[med.frequency] || med.frequency}</p>
          </div>
          <button onClick={() => deleteMed(med.id)} className="w-7 h-7 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center transition-colors">
            <Trash2 className="w-3.5 h-3.5 text-gray-300 hover:text-red-500" />
          </button>
        </motion.div>
      ))}

      {adding ? (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 space-y-3">
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Medication name (e.g. Metformin)" className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="flex gap-2">
            <input value={form.dose} onChange={e => setForm(f => ({ ...f, dose: e.target.value }))} placeholder="Dose (e.g. 500mg)" className="flex-1 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <select value={form.frequency} onChange={e => setForm(f => ({ ...f, frequency: e.target.value }))} className="flex-1 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800 text-sm focus:outline-none">
              {Object.entries(FREQ_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setAdding(false)} className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={addMed} disabled={saving || !form.name.trim()} className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-1">
              {saving ? "Saving…" : <><Check className="w-3.5 h-3.5" />Save</>}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-800 text-blue-600 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
          <Plus className="w-4 h-4" /> Add Medication
        </button>
      )}
    </div>
  );
}