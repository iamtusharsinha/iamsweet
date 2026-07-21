import React, { useState } from "react";
import { X, Loader2, CheckCircle, UserPlus } from "lucide-react";
import { base44 } from "@/api/base44Client";

const ROLES = ["Doctor", "Nurse", "Nurse Practitioner", "Diabetes Educator", "Dietitian", "Endocrinologist"];
const DIABETES_TYPES_OPTIONS = ["Type 1", "Type 2", "Prediabetes", "Gestational", "LADA", "MODY", "All Types"];
const MODES_OPTIONS = ["Video Call", "Phone Call", "Chat"];
const LANGUAGES_COMMON = ["English", "Spanish", "French", "Arabic", "Mandarin", "Hindi", "Portuguese", "German", "Swahili", "Japanese"];

function MultiSelect({ options, value, onChange, label }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 block">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const selected = value.includes(opt);
          return (
            <button key={opt} type="button"
              onClick={() => onChange(selected ? value.filter(v => v !== opt) : [...value, opt])}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                selected ? "bg-blue-600 border-blue-600 text-white" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400"
              }`}>{opt}</button>
          );
        })}
      </div>
    </div>
  );
}

export default function ProviderRegistrationModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    full_name: "", role: "Doctor", credentials: "", license_number: "",
    specialty: "", bio: "", email: "", phone: "",
    country: "", city: "", timezone: "",
    languages: [], diabetes_types: [], consultation_modes: [],
    years_experience: "", availability: "", accepting_patients: true,
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function set(field, value) { setForm(f => ({ ...f, [field]: value })); }

  async function submit(e) {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.country) {
      setError("Name, email, and country are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await base44.entities.DoctorProfile.create({
        ...form,
        years_experience: form.years_experience ? Number(form.years_experience) : undefined,
        status: "pending",
        verified: false,
      });
      setDone(true);
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-xl shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-base">Join as a Provider</h2>
              <p className="text-xs text-gray-400">Step {step} of 2</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Registration Submitted!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Your profile is under review. You'll be notified at <strong>{form.email}</strong> once approved and listed in the directory.
            </p>
            <button onClick={onClose} className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm">Done</button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-5 space-y-5">
            {step === 1 && (
              <>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Personal & Professional Info</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input value={form.full_name} onChange={e => set("full_name", e.target.value)} placeholder="Dr. Jane Doe" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Role *</label>
                    <select value={form.role} onChange={e => set("role", e.target.value)} className={inputClass}>
                      {ROLES.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Credentials / Degree</label>
                    <input value={form.credentials} onChange={e => set("credentials", e.target.value)} placeholder="MD, FACP, CDE" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>License Number</label>
                    <input value={form.license_number} onChange={e => set("license_number", e.target.value)} placeholder="e.g. CA-MD-123456" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Specialty</label>
                  <input value={form.specialty} onChange={e => set("specialty", e.target.value)} placeholder="e.g. Endocrinology, Diabetes Management" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Short Bio</label>
                  <textarea value={form.bio} onChange={e => set("bio", e.target.value)} rows={3} placeholder="Tell patients about your experience and approach…" className={`${inputClass} resize-none`} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="doctor@example.com" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+1 555 000 0000" className={inputClass} />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)}
                  className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm">
                  Next →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Location & Practice Details</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Country *</label>
                    <input value={form.country} onChange={e => set("country", e.target.value)} placeholder="e.g. United States" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>City</label>
                    <input value={form.city} onChange={e => set("city", e.target.value)} placeholder="e.g. New York" className={inputClass} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Timezone</label>
                    <input value={form.timezone} onChange={e => set("timezone", e.target.value)} placeholder="e.g. EST (UTC-5)" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Years of Experience</label>
                    <input type="number" min="0" max="60" value={form.years_experience} onChange={e => set("years_experience", e.target.value)} placeholder="e.g. 10" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Availability</label>
                  <input value={form.availability} onChange={e => set("availability", e.target.value)} placeholder="e.g. Mon–Fri 9am–5pm EST, weekends by request" className={inputClass} />
                </div>
                <MultiSelect label="Languages Spoken" options={LANGUAGES_COMMON} value={form.languages} onChange={v => set("languages", v)} />
                <MultiSelect label="Diabetes Types You Treat" options={DIABETES_TYPES_OPTIONS} value={form.diabetes_types} onChange={v => set("diabetes_types", v)} />
                <MultiSelect label="Consultation Modes" options={MODES_OPTIONS} value={form.consultation_modes} onChange={v => set("consultation_modes", v)} />

                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
                  <input type="checkbox" id="accepting" checked={form.accepting_patients} onChange={e => set("accepting_patients", e.target.checked)} className="w-4 h-4 accent-blue-600" />
                  <label htmlFor="accepting" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">Currently accepting new patients</label>
                </div>

                {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl px-3 py-2">{error}</p>}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm">← Back</button>
                  <button type="submit" disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 text-sm">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {loading ? "Submitting…" : "Submit Registration"}
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}