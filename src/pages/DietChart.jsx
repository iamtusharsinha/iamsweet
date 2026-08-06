import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Activity, Scale, Loader2, ChefHat, AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";

const SYMPTOMS = [
  "Frequent urination", "Excessive thirst", "Fatigue", "Blurred vision",
  "Slow healing wounds", "Tingling in hands/feet", "Unexplained weight loss",
  "Frequent infections", "High blood pressure", "High cholesterol",
  "Kidney issues", "Heart disease", "Sleep problems", "Stress/anxiety",
];

const DIABETES_TYPES = ["Type 1", "Type 2", "Prediabetes", "Gestational", "Not sure"];
const ACTIVITY_LEVELS = ["Sedentary (desk job, little exercise)", "Light (1-3 days/week)", "Moderate (3-5 days/week)", "Active (6-7 days/week)"];
const MEAL_PREFS = ["No restriction", "Vegetarian", "Vegan", "Low-carb / Keto", "Mediterranean", "South Asian", "Middle Eastern"];

function getBMICategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" };
  if (bmi < 25) return { label: "Normal weight", color: "text-green-600", bg: "bg-green-50 border-green-200" };
  if (bmi < 30) return { label: "Overweight", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" };
  return { label: "Obese", color: "text-red-600", bg: "bg-red-50 border-red-200" };
}

function getGlucoseCategory(glucose, unit) {
  const mgdl = unit === "mmol/L" ? glucose * 18 : glucose;
  if (mgdl < 70) return { label: "Low (Hypoglycemia)", color: "text-blue-600", bg: "bg-blue-50 border-blue-200", icon: "⬇️" };
  if (mgdl < 100) return { label: "Normal (Fasting)", color: "text-green-600", bg: "bg-green-50 border-green-200", icon: "✅" };
  if (mgdl < 126) return { label: "Prediabetes range", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", icon: "⚠️" };
  return { label: "High (Diabetes range)", color: "text-red-600", bg: "bg-red-50 border-red-200", icon: "🔴" };
}

export default function DietChart() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    age: "", gender: "Female", weight: "", height: "", weightUnit: "kg", heightUnit: "cm",
    glucose: "", glucoseUnit: "mg/dL", diabetesType: "Type 2",
    activityLevel: ACTIVITY_LEVELS[0], mealPref: "No restriction",
    symptoms: [], otherNotes: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const bmi = (() => {
    const w = parseFloat(form.weight);
    let h = parseFloat(form.height);
    if (!w || !h) return null;
    const wKg = form.weightUnit === "lbs" ? w * 0.453592 : w;
    const hM = form.heightUnit === "cm" ? h / 100 : h * 0.0254;
    return (wKg / (hM * hM)).toFixed(1);
  })();

  const glucoseCat = form.glucose ? getGlucoseCategory(parseFloat(form.glucose), form.glucoseUnit) : null;
  const bmiCat = bmi ? getBMICategory(parseFloat(bmi)) : null;

  function toggleSymptom(s) {
    setForm(f => ({
      ...f,
      symptoms: f.symptoms.includes(s) ? f.symptoms.filter(x => x !== s) : [...f.symptoms, s],
    }));
  }

  async function generate() {
    setLoading(true);
    setResult(null);
    try {
      const prompt = `You are a certified diabetes dietitian. Create a personalized daily diet chart for this patient:

**Patient Profile:**
- Age: ${form.age} | Gender: ${form.gender}
- BMI: ${bmi} (${bmiCat?.label}) | Weight: ${form.weight}${form.weightUnit} | Height: ${form.height}${form.heightUnit}
- Fasting Glucose: ${form.glucose} ${form.glucoseUnit} → ${glucoseCat?.label}
- Diabetes Type: ${form.diabetesType}
- Activity Level: ${form.activityLevel}
- Meal Preference: ${form.mealPref}
- Symptoms: ${form.symptoms.length ? form.symptoms.join(", ") : "None reported"}
- Additional notes: ${form.otherNotes || "None"}

Provide a structured response with these sections:
1. **Your Health Snapshot** – brief 2-3 sentence personalized assessment
2. **Daily Calorie & Carb Target** – specific numbers with explanation
3. **🌅 Breakfast** – 2 options with portions and GI notes
4. **☀️ Mid-Morning Snack** – 1-2 options
5. **🌞 Lunch** – 2 options with portions
6. **🌆 Evening Snack** – 1-2 options
7. **🌙 Dinner** – 2 options with portions
8. **🚫 Foods to Strictly Avoid** – short list with reasons
9. **⭐ Top 5 Superfoods for You** – specific to their profile
10. **💧 Hydration & Lifestyle Tips** – 3 quick tips

Keep meal options realistic, specific, and matched to their ${form.mealPref} preference. Reference their glucose level and BMI in recommendations. Be direct and practical — no generic advice.`;

      const response = await base44.integrations.Core.InvokeLLM({ prompt });
      setResult(response);
    } catch (e) {
      setResult("Sorry, something went wrong. Please try again.");
    }
    setLoading(false);
  }

  const isStep1Valid = form.age && form.weight && form.height && form.glucose;

  return (
    <div className="min-h-screen bg-[#f5f7ff] dark:bg-[#0a0d1a] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900 dark:text-white leading-none">Personalized Diet Chart</p>
              <p className="text-xs text-gray-400">Based on your glucose, BMI & symptoms</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        {!result ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2].map(s => (
                <React.Fragment key={s}>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${step >= s ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`}>
                    {s === 1 ? "📊 Health Stats" : "🩺 Symptoms & Prefs"}
                  </div>
                  {s < 2 && <div className={`flex-1 h-0.5 rounded ${step > s ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`} />}
                </React.Fragment>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
                  <h2 className="font-black text-gray-900 dark:text-white text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" /> Your Health Stats
                  </h2>

                  {/* Age + Gender */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Age</label>
                      <input type="number" min="1" max="120" placeholder="e.g. 45"
                        value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Gender</label>
                      <div className="flex gap-2">
                        {["Male", "Female", "Other"].map(g => (
                          <button key={g} onClick={() => setForm(f => ({ ...f, gender: g }))}
                            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all ${form.gender === g ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400"}`}>
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Weight</label>
                    <div className="flex gap-2">
                      <input type="number" min="1" placeholder="e.g. 75"
                        value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {["kg", "lbs"].map(u => (
                        <button key={u} onClick={() => setForm(f => ({ ...f, weightUnit: u }))}
                          className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${form.weightUnit === u ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Height */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Height</label>
                    <div className="flex gap-2">
                      <input type="number" min="1" placeholder={form.heightUnit === "cm" ? "e.g. 170" : "e.g. 67"}
                        value={form.height} onChange={e => setForm(f => ({ ...f, height: e.target.value }))}
                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {["cm", "inches"].map(u => (
                        <button key={u} onClick={() => setForm(f => ({ ...f, heightUnit: u }))}
                          className={`px-3 py-2.5 text-xs font-bold rounded-xl border transition-all ${form.heightUnit === u ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* BMI live preview */}
                  {bmi && bmiCat && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${bmiCat.bg}`}>
                      <Scale className={`w-5 h-5 ${bmiCat.color}`} />
                      <div>
                        <p className="text-xs font-bold text-gray-700 dark:text-gray-300">Your BMI: <span className={bmiCat.color}>{bmi} — {bmiCat.label}</span></p>
                        <p className="text-[10px] text-gray-400">Calculated automatically from your inputs</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Glucose */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Fasting Blood Glucose</label>
                    <div className="flex gap-2">
                      <input type="number" min="1" placeholder={form.glucoseUnit === "mg/dL" ? "e.g. 126" : "e.g. 7.0"}
                        value={form.glucose} onChange={e => setForm(f => ({ ...f, glucose: e.target.value }))}
                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {["mg/dL", "mmol/L"].map(u => (
                        <button key={u} onClick={() => setForm(f => ({ ...f, glucoseUnit: u }))}
                          className={`px-3 py-2.5 text-xs font-bold rounded-xl border transition-all ${form.glucoseUnit === u ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
                          {u}
                        </button>
                      ))}
                    </div>
                    {glucoseCat && form.glucose && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className={`text-xs font-semibold mt-1.5 ${glucoseCat.color}`}>
                        {glucoseCat.icon} {glucoseCat.label}
                      </motion.p>
                    )}
                  </div>

                  {/* Diabetes Type */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Diabetes Type</label>
                    <div className="flex flex-wrap gap-2">
                      {DIABETES_TYPES.map(t => (
                        <button key={t} onClick={() => setForm(f => ({ ...f, diabetesType: t }))}
                          className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${form.diabetesType === t ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!isStep1Valid}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-600/25 text-sm"
                >
                  Next: Symptoms & Preferences →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
                  <h2 className="font-black text-gray-900 dark:text-white text-lg flex items-center gap-2">
                    🩺 Symptoms & Preferences
                  </h2>

                  {/* Activity Level */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Activity Level</label>
                    <div className="space-y-2">
                      {ACTIVITY_LEVELS.map(a => (
                        <button key={a} onClick={() => setForm(f => ({ ...f, activityLevel: a }))}
                          className={`w-full text-left px-4 py-2.5 text-xs font-medium rounded-xl border transition-all ${form.activityLevel === a ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 bg-gray-50 dark:bg-gray-700"}`}>
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Meal Preference */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Meal Preference</label>
                    <div className="flex flex-wrap gap-2">
                      {MEAL_PREFS.map(p => (
                        <button key={p} onClick={() => setForm(f => ({ ...f, mealPref: p }))}
                          className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${form.mealPref === p ? "bg-emerald-600 border-emerald-600 text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-emerald-400"}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Current Symptoms <span className="text-gray-400 font-normal">(select all that apply)</span></label>
                    <div className="flex flex-wrap gap-2">
                      {SYMPTOMS.map(s => (
                        <button key={s} onClick={() => toggleSymptom(s)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${form.symptoms.includes(s) ? "bg-rose-100 border-rose-400 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-rose-300 bg-gray-50 dark:bg-gray-700"}`}>
                          {form.symptoms.includes(s) && <CheckCircle2 className="w-3 h-3" />}
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Anything else? <span className="text-gray-400 font-normal">(optional)</span></label>
                    <textarea
                      rows={3} placeholder="e.g. on metformin, avoid gluten, hate fish..."
                      value={form.otherNotes} onChange={e => setForm(f => ({ ...f, otherNotes: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)}
                    className="px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl transition-all hover:border-blue-400 text-sm">
                    ← Back
                  </button>
                  <button onClick={generate}
                    className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-600/25 text-sm flex items-center justify-center gap-2">
                    <ChefHat className="w-4 h-4" />
                    Generate My Diet Chart 🍽️
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ) : loading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <p className="font-black text-gray-900 dark:text-white text-lg">Building your diet chart…</p>
            <p className="text-gray-400 text-sm mt-2">Analyzing your glucose, BMI & symptoms</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Health summary bar */}
            <div className="grid grid-cols-3 gap-3">
              {bmi && bmiCat && (
                <div className={`p-3 rounded-2xl border text-center ${bmiCat.bg}`}>
                  <p className="text-[10px] text-gray-500 font-semibold">BMI</p>
                  <p className={`text-xl font-black ${bmiCat.color}`}>{bmi}</p>
                  <p className={`text-[10px] font-semibold ${bmiCat.color}`}>{bmiCat.label}</p>
                </div>
              )}
              {glucoseCat && form.glucose && (
                <div className={`p-3 rounded-2xl border text-center ${glucoseCat.bg}`}>
                  <p className="text-[10px] text-gray-500 font-semibold">Glucose</p>
                  <p className={`text-xl font-black ${glucoseCat.color}`}>{form.glucose}</p>
                  <p className={`text-[10px] font-semibold ${glucoseCat.color}`}>{form.glucoseUnit}</p>
                </div>
              )}
              <div className="p-3 rounded-2xl border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 text-center">
                <p className="text-[10px] text-gray-500 font-semibold">Type</p>
                <p className="text-sm font-black text-blue-600 dark:text-blue-400 leading-tight mt-1">{form.diabetesType}</p>
              </div>
            </div>

            {/* Diet Chart Result */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <ChefHat className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 dark:text-white text-sm">Your Personalized Diet Chart</p>
                    <p className="text-xs text-gray-400">AI-generated based on your health data</p>
                  </div>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-black prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400">This diet chart is AI-generated for educational purposes. Always consult your doctor or registered dietitian before making significant dietary changes.</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={() => { setResult(null); setStep(1); setForm(f => ({ ...f, symptoms: [], otherNotes: "" })); }}
                className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl text-sm hover:border-blue-400 transition-all">
                <RotateCcw className="w-4 h-4" /> Start Over
              </button>
              <Link to="/meals"
                className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-sm text-center hover:from-emerald-700 hover:to-teal-700 transition-all">
                Browse Low-GI Meals 🥗
              </Link>
              <Link to="/chat"
                className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm text-center hover:bg-blue-700 transition-all">
                Ask SWEETY 🤖
              </Link>
            </div>
          </motion.div>
        )}

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <p className="font-black text-gray-900 dark:text-white text-lg">Building your diet chart…</p>
            <p className="text-gray-400 text-sm mt-2">Analyzing your glucose, BMI & symptoms</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}