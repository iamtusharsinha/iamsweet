import React, { useState } from "react";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

const DIABETES_TYPES = ["Type 1", "Type 2", "Prediabetes", "Gestational", "LADA", "MODY", "Other"];
const MODES = ["Video Call", "Phone Call", "Chat", "Any"];
const URGENCY = [
  { value: "routine", label: "Routine — within a week" },
  { value: "soon", label: "Soon — within 1–2 days" },
  { value: "urgent", label: "Urgent — as soon as possible" },
];

export default function ConsultationRequestModal({ doctor, onClose }) {
  const [form, setForm] = useState({
    patient_name: "", patient_email: "", patient_country: "",
    diabetes_type: "Type 2", message: "",
    preferred_mode: "Any", preferred_time: "", urgency: "routine",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function set(field, value) { setForm(f => ({ ...f, [field]: value })); }

  async function submit(e) {
    e.preventDefault();
    if (!form.patient_name || !form.patient_email || !form.message) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await base44.entities.ConsultationRequest.create({
        ...form,
        doctor_id: doctor.id,
        doctor_name: doctor.full_name,
      });
      setSent(true);
    } catch (err) {
      setError("Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white text-base">Request Consultation</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">with {doctor.full_name} · {doctor.role}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Request Sent!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {doctor.full_name} will review your request and contact you at <strong>{form.patient_email}</strong> shortly.
            </p>
            <button onClick={onClose} className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Your Full Name *</label>
                <input
                  value={form.patient_name} onChange={e => set("patient_name", e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Email Address *</label>
                <input
                  type="email" value={form.patient_email} onChange={e => set("patient_email", e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Your Country</label>
                <input
                  value={form.patient_country} onChange={e => set("patient_country", e.target.value)}
                  placeholder="e.g. United States"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Diabetes Type</label>
                <select value={form.diabetes_type} onChange={e => set("diabetes_type", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {DIABETES_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Your Message *</label>
              <textarea
                value={form.message} onChange={e => set("message", e.target.value)}
                placeholder="Describe your situation, questions, or what you're hoping to discuss in the consultation…"
                rows={4}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Preferred Mode</label>
                <select value={form.preferred_mode} onChange={e => set("preferred_mode", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {MODES.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Urgency</label>
                <select value={form.urgency} onChange={e => set("urgency", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {URGENCY.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Preferred Date/Time (optional)</label>
              <input
                value={form.preferred_time} onChange={e => set("preferred_time", e.target.value)}
                placeholder="e.g. Weekday mornings, anytime after 3pm EST"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl px-3 py-2">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 text-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {loading ? "Sending…" : "Send Consultation Request"}
            </button>

            <p className="text-center text-xs text-gray-400">The provider will contact you directly at your email.</p>
          </form>
        )}
      </div>
    </div>
  );
}