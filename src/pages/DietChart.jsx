import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Activity, Scale, Loader2, ChefHat, AlertCircle,
  CheckCircle2, RotateCcw, Globe, Download, Mail, X, Send
} from "lucide-react";
import { base44 } from "@/api/base44Client";

// ── Languages ──────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "sw", label: "Kiswahili", flag: "🇰🇪" },
  { code: "ur", label: "اردو", flag: "🇵🇰" },
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
];

const ETHNICITIES = [
  { key: "south_asian", label: "South Asian", flag: "🇮🇳", desc: "Indian, Pakistani, Bangladeshi", dishes: ["Moong dal", "Methi roti", "Palak paneer", "Raita", "Bitter gourd sabzi", "Brown rice khichdi", "Sprout chaat", "Masoor dal soup", "Oats upma", "Rajma"] },
  { key: "east_asian", label: "East Asian", flag: "🇯🇵", desc: "Japanese, Chinese, Korean", dishes: ["Miso soup with tofu", "Edamame", "Soba noodles", "Congee", "Steamed fish", "Natto", "Kimchi", "Barley rice", "Wakame salad", "Kabocha soup"] },
  { key: "southeast_asian", label: "Southeast Asian", flag: "🇹🇭", desc: "Thai, Filipino, Vietnamese, Indonesian", dishes: ["Tom yum soup", "Goi cuon", "Tempeh stir-fry", "Lemongrass chicken", "Papaya salad", "Congee with fish", "Tofu laksa", "Bitter melon stir-fry", "Sayur lodeh", "Pinakbet"] },
  { key: "middle_eastern", label: "Middle Eastern", flag: "🇱🇧", desc: "Arabic, Lebanese, Turkish, Persian", dishes: ["Fattoush", "Lentil soup", "Grilled kofta", "Tabbouleh", "Hummus with veggies", "Grilled fish", "Foul medames", "Za'atar bread", "Kishk soup", "Roasted eggplant"] },
  { key: "african", label: "African", flag: "🌍", desc: "West, East, North & Southern African", dishes: ["Ugali with sukuma wiki", "Jollof brown rice", "Mchicha stew", "Groundnut soup", "Tilapia with tomatoes", "Beans and plantain", "Injera with lentils", "Moringa soup", "Eba with efo riro", "Githeri"] },
  { key: "latin_american", label: "Latin American", flag: "🇲🇽", desc: "Mexican, Brazilian, Colombian, Peruvian", dishes: ["Black bean soup", "Ceviche", "Quinoa salad", "Grilled chicken chimichurri", "Avocado & egg tostada", "Lentil stew", "Chayote with herbs", "Brown rice", "Sopa de verduras", "Ensalada de nopales"] },
  { key: "mediterranean", label: "Mediterranean", flag: "🇬🇷", desc: "Greek, Italian, Spanish", dishes: ["Greek salad", "Lentil soup", "Grilled sardines", "Chickpea stew", "Tzatziki with veggies", "Farro salad", "Ratatouille", "Braised greens", "Fasolakia", "Tuna with olives"] },
  { key: "western", label: "Western / American", flag: "🇺🇸", desc: "North American, British, Australian", dishes: ["Oatmeal with berries", "Grilled salmon salad", "Turkey & avocado wrap", "Lentil veggie soup", "Egg white omelette", "Sweet potato & black bean bowl", "Greek yogurt parfait", "Quinoa tabbouleh", "Tuna salad", "Cauliflower rice stir-fry"] },
  { key: "caribbean", label: "Caribbean", flag: "🇯🇲", desc: "Jamaican, Trinidadian, Haitian", dishes: ["Callaloo soup", "Jerk chicken (no sugar)", "Pigeon peas & brown rice", "Steamed fish with okra", "Dasheen leaves stew", "Breadfruit salad", "Soursop leaf tea", "Ackee with saltfish", "Pumpkin soup", "Boiled plantain with fish"] },
];

const SYMPTOMS = [
  "Frequent urination", "Excessive thirst", "Fatigue", "Blurred vision",
  "Slow healing wounds", "Tingling in hands/feet", "Unexplained weight loss",
  "Frequent infections", "High blood pressure", "High cholesterol",
  "Kidney issues", "Heart disease", "Sleep problems", "Stress/anxiety",
];
const DIABETES_TYPES = ["Type 1", "Type 2", "Prediabetes", "Gestational", "Not sure"];
const ACTIVITY_LEVELS = ["Sedentary (desk job, little exercise)", "Light (1-3 days/week)", "Moderate (3-5 days/week)", "Active (6-7 days/week)"];
const DIETARY_PREFS = ["No restriction", "Vegetarian", "Vegan", "Low-carb / Keto", "Halal", "Kosher", "Gluten-free"];

const MEAL_SECTIONS = [
  { key: "breakfast", label: "Breakfast", emoji: "🌅", color: "from-orange-400 to-amber-400", bg: "bg-orange-50 dark:bg-orange-900/10", border: "border-orange-200 dark:border-orange-800" },
  { key: "mid_morning", label: "Mid-Morning Snack", emoji: "☀️", color: "from-yellow-400 to-amber-400", bg: "bg-yellow-50 dark:bg-yellow-900/10", border: "border-yellow-200 dark:border-yellow-800" },
  { key: "lunch", label: "Lunch", emoji: "🌞", color: "from-green-400 to-emerald-500", bg: "bg-green-50 dark:bg-green-900/10", border: "border-green-200 dark:border-green-800" },
  { key: "evening", label: "Evening Snack", emoji: "🌆", color: "from-teal-400 to-cyan-500", bg: "bg-teal-50 dark:bg-teal-900/10", border: "border-teal-200 dark:border-teal-800" },
  { key: "dinner", label: "Dinner", emoji: "🌙", color: "from-blue-500 to-indigo-500", bg: "bg-blue-50 dark:bg-blue-900/10", border: "border-blue-200 dark:border-blue-800" },
];

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

// ── Pretty result renderer ─────────────────────────────────────────────────
function DietResult({ data, form, bmi, bmiCat, glucoseCat, selectedEthnicity, lang }) {
  return (
    <div className="space-y-5">
      {/* Health Snapshot */}
      {data.snapshot && (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Your Health Snapshot</p>
          <p className="text-sm leading-relaxed">{data.snapshot}</p>
        </div>
      )}

      {/* Calorie & Carb Target */}
      {data.targets && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Daily Targets</p>
          <div className="grid grid-cols-3 gap-3">
            {data.targets.calories && (
              <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400">{data.targets.calories}</p>
                <p className="text-[10px] text-gray-500 font-semibold mt-0.5">kcal/day</p>
              </div>
            )}
            {data.targets.carbs && (
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-2xl font-black text-blue-700 dark:text-blue-400">{data.targets.carbs}g</p>
                <p className="text-[10px] text-gray-500 font-semibold mt-0.5">carbs/day</p>
              </div>
            )}
            {data.targets.protein && (
              <div className="text-center p-3 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800">
                <p className="text-2xl font-black text-violet-700 dark:text-violet-400">{data.targets.protein}g</p>
                <p className="text-[10px] text-gray-500 font-semibold mt-0.5">protein/day</p>
              </div>
            )}
          </div>
          {data.targets.note && <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">{data.targets.note}</p>}
        </div>
      )}

      {/* Meal Sections */}
      {MEAL_SECTIONS.map(sec => {
        const items = data[sec.key];
        if (!items?.length) return null;
        return (
          <div key={sec.key} className={`rounded-2xl border overflow-hidden ${sec.border}`}>
            <div className={`bg-gradient-to-r ${sec.color} px-5 py-3 flex items-center gap-2`}>
              <span className="text-lg">{sec.emoji}</span>
              <p className="text-white font-black text-sm">{sec.label}</p>
              <span className="ml-auto text-white/70 text-xs font-semibold">{items.length} options</span>
            </div>
            <div className={`${sec.bg} divide-y divide-gray-100 dark:divide-gray-700/40`}>
              {items.map((item, i) => (
                <div key={i} className="px-5 py-3 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-[10px] font-black text-gray-500 flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</p>
                    {item.portion && <p className="text-xs text-gray-500 dark:text-gray-400">{item.portion}</p>}
                    {item.gi_note && <span className="inline-block mt-1 text-[10px] font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">GI: {item.gi_note}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Avoid */}
      {data.avoid?.length > 0 && (
        <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-red-500 px-5 py-3 flex items-center gap-2">
            <span className="text-lg">🚫</span>
            <p className="text-white font-black text-sm">Foods to Strictly Avoid</p>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.avoid.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <X className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{item.food}</p>
                  {item.reason && <p className="text-[10px] text-gray-500 dark:text-gray-400">{item.reason}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Superfoods */}
      {data.superfoods?.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 px-5 py-3 flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <p className="text-white font-black text-sm">Top Superfoods for You</p>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.superfoods.map((sf, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">{sf.emoji || "⭐"}</span>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{sf.name}</p>
                  {sf.benefit && <p className="text-[10px] text-gray-500 dark:text-gray-400">{sf.benefit}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hydration & Lifestyle */}
      {data.tips?.length > 0 && (
        <div className="bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-200 dark:border-cyan-800 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 flex items-center gap-2">
            <span className="text-lg">💧</span>
            <p className="text-white font-black text-sm">Hydration & Lifestyle Tips</p>
          </div>
          <div className="p-4 space-y-2">
            {data.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 dark:text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Email Modal ────────────────────────────────────────────────────────────
function EmailModal({ onClose, onSend, loading, userEmail }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-blue-500" />
          <p className="font-black text-gray-900 dark:text-white">Email Diet Chart</p>
          <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
        </div>
        {userEmail ? (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Your diet chart will be sent to <strong className="text-gray-900 dark:text-white">{userEmail}</strong>.
          </p>
        ) : (
          <p className="text-xs text-red-500 mb-4">You must be signed in to email your diet chart.</p>
        )}
        <button onClick={() => onSend()} disabled={!userEmail || loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? "Sending…" : "Send to My Email"}
        </button>
      </motion.div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function DietChart() {
  const [lang, setLang] = useState("en");
  const [step, setStep] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(u => setCurrentUser(u)).catch(() => {});
  }, []);
  const [form, setForm] = useState({
    age: "", gender: "Female",
    weight: "", height: "", weightUnit: "kg", heightUnit: "cm",
    glucose: "", glucoseUnit: "mg/dL",
    diabetesType: "Type 2",
    ethnicity: null,
    activityLevel: ACTIVITY_LEVELS[0],
    dietaryPref: "No restriction",
    symptoms: [],
    otherNotes: "",
  });
  const [result, setResult] = useState(null); // parsed JSON object
  const [rawResult, setRawResult] = useState(""); // markdown fallback
  const [loading, setLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const resultRef = useRef(null);

  const bmi = (() => {
    const w = parseFloat(form.weight), h = parseFloat(form.height);
    if (!w || !h) return null;
    const wKg = form.weightUnit === "lbs" ? w * 0.453592 : w;
    const hM = form.heightUnit === "cm" ? h / 100 : h * 0.0254;
    return (wKg / (hM * hM)).toFixed(1);
  })();
  const glucoseCat = form.glucose ? getGlucoseCategory(parseFloat(form.glucose), form.glucoseUnit) : null;
  const bmiCat = bmi ? getBMICategory(parseFloat(bmi)) : null;
  const selectedEthnicity = ETHNICITIES.find(e => e.key === form.ethnicity);

  function toggleSymptom(s) {
    setForm(f => ({ ...f, symptoms: f.symptoms.includes(s) ? f.symptoms.filter(x => x !== s) : [...f.symptoms, s] }));
  }

  async function generate() {
    setLoading(true);
    setResult(null);
    setRawResult("");
    const langLabel = LANGUAGES.find(l => l.code === lang)?.label || "English";
    const ethnicDishes = selectedEthnicity
      ? `Cultural background: ${selectedEthnicity.label} (${selectedEthnicity.desc}). Use these dishes: ${selectedEthnicity.dishes.join(", ")}.`
      : "No specific cultural preference — use globally common healthy foods.";

    try {
      const prompt = `You are a certified diabetes dietitian. Respond ENTIRELY in ${langLabel}.

Patient: Age ${form.age}, ${form.gender}, BMI ${bmi} (${bmiCat?.label}), Glucose ${form.glucose} ${form.glucoseUnit} (${glucoseCat?.label}), ${form.diabetesType} diabetes, ${form.activityLevel}, ${form.dietaryPref} diet.
${form.symptoms.length ? "Symptoms: " + form.symptoms.join(", ") : ""}
${form.otherNotes ? "Notes: " + form.otherNotes : ""}
${ethnicDishes}

Return ONLY a JSON object (no markdown, no extra text) with this exact structure:
{
  "snapshot": "2-3 sentence personalized health assessment in ${langLabel}",
  "targets": {
    "calories": 1800,
    "carbs": 150,
    "protein": 80,
    "note": "brief explanation in ${langLabel}"
  },
  "breakfast": [
    {"name": "dish name in ${langLabel}", "portion": "e.g. 1 cup / 200g", "gi_note": "Low / Medium"},
    ... 10 items total
  ],
  "mid_morning": [
    {"name": "...", "portion": "...", "gi_note": "..."},
    ... 10 items total
  ],
  "lunch": [
    {"name": "...", "portion": "...", "gi_note": "..."},
    ... 10 items total
  ],
  "evening": [
    {"name": "...", "portion": "...", "gi_note": "..."},
    ... 10 items total
  ],
  "dinner": [
    {"name": "...", "portion": "...", "gi_note": "..."},
    ... 10 items total
  ],
  "avoid": [
    {"food": "food name in ${langLabel}", "reason": "brief reason in ${langLabel}"},
    ... 10 items total
  ],
  "superfoods": [
    {"name": "superfood name in ${langLabel}", "emoji": "🥬", "benefit": "brief benefit in ${langLabel}"},
    ... 10 items total
  ],
  "tips": ["tip 1 in ${langLabel}", "tip 2", "tip 3", "tip 4", "tip 5"]
}

All text fields must be in ${langLabel}. Use authentic ${selectedEthnicity ? selectedEthnicity.label : "global"} dish names. Be specific with portions. Exactly 10 items per meal/avoid/superfoods array.`;

      const response = await base44.integrations.Core.InvokeLLM({ prompt });

      // Try to parse JSON
      try {
        const clean = response.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(clean);
        setResult(parsed);
      } catch {
        // fallback: store raw and show as text
        setRawResult(response);
        setResult({});
      }
    } catch (e) {
      setRawResult("Sorry, something went wrong. Please try again.");
      setResult({});
    }
    setLoading(false);
  }

  function buildTextVersion() {
    if (!result) return "";
    const lines = [];
    lines.push("=== PERSONALIZED DIET CHART ===");
    lines.push(`Cuisine: ${selectedEthnicity?.label || "Global"} | Language: ${LANGUAGES.find(l => l.code === lang)?.label}`);
    lines.push(`BMI: ${bmi} (${bmiCat?.label}) | Glucose: ${form.glucose} ${form.glucoseUnit} | Type: ${form.diabetesType}`);
    lines.push("");
    if (result.snapshot) { lines.push("HEALTH SNAPSHOT"); lines.push(result.snapshot); lines.push(""); }
    if (result.targets) {
      lines.push("DAILY TARGETS");
      lines.push(`Calories: ${result.targets.calories} kcal | Carbs: ${result.targets.carbs}g | Protein: ${result.targets.protein}g`);
      if (result.targets.note) lines.push(result.targets.note);
      lines.push("");
    }
    MEAL_SECTIONS.forEach(sec => {
      if (result[sec.key]?.length) {
        lines.push(`${sec.emoji} ${sec.label.toUpperCase()}`);
        result[sec.key].forEach((item, i) => {
          lines.push(`${i + 1}. ${item.name}${item.portion ? " — " + item.portion : ""}${item.gi_note ? " (GI: " + item.gi_note + ")" : ""}`);
        });
        lines.push("");
      }
    });
    if (result.avoid?.length) {
      lines.push("🚫 FOODS TO AVOID");
      result.avoid.forEach((a, i) => lines.push(`${i + 1}. ${a.food}${a.reason ? " — " + a.reason : ""}`));
      lines.push("");
    }
    if (result.superfoods?.length) {
      lines.push("⭐ TOP SUPERFOODS");
      result.superfoods.forEach((sf, i) => lines.push(`${i + 1}. ${sf.name}${sf.benefit ? " — " + sf.benefit : ""}`));
      lines.push("");
    }
    if (result.tips?.length) {
      lines.push("💧 HYDRATION & LIFESTYLE TIPS");
      result.tips.forEach((t, i) => lines.push(`${i + 1}. ${t}`));
    }
    lines.push("");
    lines.push("⚠️ AI-generated for educational purposes only. Consult your doctor or dietitian.");
    lines.push("Generated by iamsweet.com");
    return lines.join("\n");
  }

  function downloadTxt() {
    const text = buildTextVersion();
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-diet-chart.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function sendEmail() {
    const recipientEmail = currentUser?.email;
    if (!recipientEmail) {
      alert("You must be signed in to email your diet chart.");
      return;
    }
    setEmailLoading(true);
    try {
      const text = buildTextVersion();
      const htmlBody = `<pre style="font-family: sans-serif; white-space: pre-wrap; font-size: 14px; line-height: 1.6; max-width: 600px;">${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
      <br><br><p style="color:#888;font-size:12px;">Generated by <a href="https://iamsweet.com">iamsweet.com</a> — the world's most complete diabetes support platform.</p>`;
      await base44.integrations.Core.SendEmail({
        to: recipientEmail,
        subject: "Your Personalized Diabetes Diet Chart — iamsweet",
        body: htmlBody,
      });
      setEmailSent(true);
      setShowEmailModal(false);
    } catch (e) {
      alert("Could not send email. Please try again.");
    }
    setEmailLoading(false);
  }

  const isStep1Valid = form.age && form.weight && form.height && form.glucose;
  const hasResult = result && (Object.keys(result).length > 0 || rawResult);

  return (
    <div className="min-h-screen bg-[#f5f7ff] dark:bg-[#0a0d1a] pb-20">
      {showEmailModal && <EmailModal onClose={() => setShowEmailModal(false)} onSend={sendEmail} loading={emailLoading} userEmail={currentUser?.email} />}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <ChefHat className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-sm text-gray-900 dark:text-white leading-none">Personalized Diet Chart</p>
                <p className="text-xs text-gray-400">Glucose · BMI · Ethnicity · 10 options per meal</p>
              </div>
            </div>
          </div>
          {/* Language Picker */}
          <div className="flex gap-1 items-center">
            {LANGUAGES.slice(0, 4).map(l => (
              <button key={l.code} onClick={() => setLang(l.code)} title={l.label}
                className={`text-base px-2 py-1 rounded-lg border transition-all ${lang === l.code ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" : "border-transparent hover:border-gray-300"}`}>
                {l.flag}
              </button>
            ))}
            <select value={lang} onChange={e => setLang(e.target.value)}
              className="text-xs rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 focus:outline-none">
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
            </select>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        {!hasResult && !loading ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map(s => (
                <React.Fragment key={s}>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all flex-shrink-0 ${step >= s ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`}>
                    {s === 1 ? "📊 Health" : s === 2 ? "🌍 Culture" : "🩺 Symptoms"}
                  </div>
                  {s < 3 && <div className={`flex-1 h-0.5 rounded ${step > s ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`} />}
                </React.Fragment>
              ))}
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
                  <h2 className="font-black text-gray-900 dark:text-white text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" /> Your Health Stats
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Age</label>
                      <input type="number" min="1" max="120" placeholder="e.g. 45" value={form.age}
                        onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
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
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Weight</label>
                    <div className="flex gap-2">
                      <input type="number" min="1" placeholder="e.g. 75" value={form.weight}
                        onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {["kg", "lbs"].map(u => (
                        <button key={u} onClick={() => setForm(f => ({ ...f, weightUnit: u }))}
                          className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${form.weightUnit === u ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Height</label>
                    <div className="flex gap-2">
                      <input type="number" min="1" placeholder={form.heightUnit === "cm" ? "e.g. 170" : "e.g. 67"} value={form.height}
                        onChange={e => setForm(f => ({ ...f, height: e.target.value }))}
                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {["cm", "inches"].map(u => (
                        <button key={u} onClick={() => setForm(f => ({ ...f, heightUnit: u }))}
                          className={`px-3 py-2.5 text-xs font-bold rounded-xl border transition-all ${form.heightUnit === u ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                  {bmi && bmiCat && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${bmiCat.bg}`}>
                      <Scale className={`w-5 h-5 ${bmiCat.color}`} />
                      <div>
                        <p className="text-xs font-bold text-gray-700 dark:text-gray-300">BMI: <span className={bmiCat.color}>{bmi} — {bmiCat.label}</span></p>
                        <p className="text-[10px] text-gray-400">Auto-calculated</p>
                      </div>
                    </motion.div>
                  )}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Fasting Blood Glucose</label>
                    <div className="flex gap-2">
                      <input type="number" min="1" placeholder={form.glucoseUnit === "mg/dL" ? "e.g. 126" : "e.g. 7.0"} value={form.glucose}
                        onChange={e => setForm(f => ({ ...f, glucose: e.target.value }))}
                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {["mg/dL", "mmol/L"].map(u => (
                        <button key={u} onClick={() => setForm(f => ({ ...f, glucoseUnit: u }))}
                          className={`px-3 py-2.5 text-xs font-bold rounded-xl border transition-all ${form.glucoseUnit === u ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
                          {u}
                        </button>
                      ))}
                    </div>
                    {glucoseCat && form.glucose && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-xs font-semibold mt-1.5 ${glucoseCat.color}`}>
                        {glucoseCat.icon} {glucoseCat.label}
                      </motion.p>
                    )}
                  </div>
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
                <button onClick={() => setStep(2)} disabled={!isStep1Valid}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-600/25 text-sm">
                  Next: Cultural Background →
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
                  <h2 className="font-black text-gray-900 dark:text-white text-lg flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-500" /> Your Cultural Background
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">We'll tailor recipes and dishes to your cuisine — so your diet chart feels familiar, not foreign.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ETHNICITIES.map(e => (
                      <button key={e.key} onClick={() => setForm(f => ({ ...f, ethnicity: e.key }))}
                        className={`text-left p-4 rounded-2xl border-2 transition-all ${form.ethnicity === e.key ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-gray-100 dark:border-gray-700 hover:border-emerald-300 bg-gray-50 dark:bg-gray-700/50"}`}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xl">{e.flag}</span>
                          <p className={`text-sm font-black ${form.ethnicity === e.key ? "text-emerald-700 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}>{e.label}</p>
                          {form.ethnicity === e.key && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto" />}
                        </div>
                        <p className="text-[10px] text-gray-400 mb-2">{e.desc}</p>
                        <div className="flex flex-wrap gap-1">
                          {e.dishes.slice(0, 3).map(d => (
                            <span key={d} className="text-[10px] bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded-full">{d}</span>
                          ))}
                          <span className="text-[10px] text-gray-400">+{e.dishes.length - 3} more</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setForm(f => ({ ...f, ethnicity: null }))}
                    className={`text-xs text-gray-400 hover:text-gray-600 transition-colors ${!form.ethnicity ? "font-bold text-gray-600 dark:text-gray-300" : ""}`}>
                    Skip / No preference
                  </button>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl transition-all hover:border-blue-400 text-sm">← Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-600/25 text-sm">Next: Symptoms & Prefs →</button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
                  <h2 className="font-black text-gray-900 dark:text-white text-lg">🩺 Symptoms & Preferences</h2>
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
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Dietary Preference</label>
                    <div className="flex flex-wrap gap-2">
                      {DIETARY_PREFS.map(p => (
                        <button key={p} onClick={() => setForm(f => ({ ...f, dietaryPref: p }))}
                          className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${form.dietaryPref === p ? "bg-emerald-600 border-emerald-600 text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-emerald-400"}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
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
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Anything else? <span className="text-gray-400 font-normal">(optional)</span></label>
                    <textarea rows={3} placeholder="e.g. on metformin, avoid gluten, hate fish..."
                      value={form.otherNotes} onChange={e => setForm(f => ({ ...f, otherNotes: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl transition-all hover:border-blue-400 text-sm">← Back</button>
                  <button onClick={generate}
                    className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-600/25 text-sm flex items-center justify-center gap-2">
                    <ChefHat className="w-4 h-4" /> Generate My Diet Chart 🍽️
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
            <p className="text-gray-400 text-sm mt-2">
              {selectedEthnicity ? `Crafting ${selectedEthnicity.label} recipes with 10 options per meal` : "Generating 10 options per meal category"}
            </p>
          </motion.div>

        ) : (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6" ref={resultRef}>
            {/* Summary bar */}
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
              <div className="p-3 rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 text-center">
                <p className="text-[10px] text-gray-500 font-semibold">Cuisine</p>
                <p className="text-xl">{selectedEthnicity?.flag || "🌍"}</p>
                <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">{selectedEthnicity?.label || "Global"}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button onClick={downloadTxt}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl text-xs hover:border-blue-400 transition-all">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
              <button onClick={() => setShowEmailModal(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl text-xs hover:border-blue-400 transition-all">
                <Mail className="w-3.5 h-3.5" /> {emailSent ? "✅ Sent!" : "Email"}
              </button>
              <div className="flex-1" />
              <button onClick={() => { setResult(null); setRawResult(""); setStep(1); setEmailSent(false); setForm(f => ({ ...f, symptoms: [], otherNotes: "", ethnicity: null })); }}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold rounded-xl text-xs hover:border-red-400 transition-all">
                <RotateCcw className="w-3.5 h-3.5" /> Start Over
              </button>
            </div>

            {/* Rendered result */}
            {result && Object.keys(result).length > 0 ? (
              <DietResult data={result} form={form} bmi={bmi} bmiCat={bmiCat} glucoseCat={glucoseCat} selectedEthnicity={selectedEthnicity} lang={lang} />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{rawResult}</pre>
              </div>
            )}

            {/* Disclaimer */}
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400">AI-generated for educational purposes only. Always consult your doctor or registered dietitian before making significant dietary changes.</p>
            </div>

            <div className="flex gap-3">
              <Link to="/meals" className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-sm text-center hover:from-emerald-700 hover:to-teal-700 transition-all">Browse Low-GI Meals 🥗</Link>
              <Link to="/chat" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm text-center hover:bg-blue-700 transition-all">Ask SWEETY 🤖</Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}