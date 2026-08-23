import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Search, Loader2, AlertCircle, ChefHat, Flame,
  Wheat, BarChart2, RefreshCw, BookmarkPlus, CheckCircle2, X
} from "lucide-react";
import { base44 } from "@/api/base44Client";

const QUICK_SEARCHES = [
  "white rice", "brown rice", "banana", "apple", "oatmeal",
  "white bread", "sweet potato", "pasta", "orange juice", "milk",
  "Greek yogurt", "lentils", "chickpeas", "carrots", "watermelon",
];

const GI_BADGE = {
  low: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700",
  medium: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700",
  high: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-700",
};

function giCategory(gi) {
  if (gi == null) return null;
  if (gi <= 55) return "low";
  if (gi <= 69) return "medium";
  return "high";
}

function FoodCard({ food, onLog, logged }) {
  const giCat = giCategory(food.gi);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:shadow-blue-100/40 dark:hover:shadow-blue-900/20 hover:-translate-y-0.5 transition-all"
    >
      {/* Accent bar */}
      <div className={`h-1.5 w-full ${giCat === "low" ? "bg-gradient-to-r from-emerald-400 to-teal-500" : giCat === "medium" ? "bg-gradient-to-r from-amber-400 to-orange-400" : "bg-gradient-to-r from-rose-500 to-red-500"}`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-black text-gray-900 dark:text-white text-base leading-snug">{food.name}</h3>
          {giCat && (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${GI_BADGE[giCat]}`}>
              GI {food.gi} — {giCat.charAt(0).toUpperCase() + giCat.slice(1)}
            </span>
          )}
        </div>

        {food.serving && (
          <p className="text-xs text-gray-400 mb-3">Serving: {food.serving}</p>
        )}

        {/* Nutrition chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {food.calories != null && (
            <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 px-3 py-1.5 rounded-xl">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-bold text-orange-700 dark:text-orange-400">{food.calories} kcal</span>
            </div>
          )}
          {food.carbs != null && (
            <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 px-3 py-1.5 rounded-xl">
              <Wheat className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400">{food.carbs}g carbs</span>
            </div>
          )}
          {food.fiber != null && (
            <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-xl">
              <BarChart2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{food.fiber}g fiber</span>
            </div>
          )}
          {food.protein != null && (
            <div className="flex items-center gap-1.5 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 px-3 py-1.5 rounded-xl">
              <span className="text-xs font-bold text-violet-700 dark:text-violet-400">🥩 {food.protein}g protein</span>
            </div>
          )}
        </div>

        {food.diabetesTip && (
          <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-4 leading-relaxed border-l-2 border-blue-300 dark:border-blue-700 pl-3">
            💡 {food.diabetesTip}
          </p>
        )}

        <button
          onClick={() => onLog(food)}
          disabled={logged}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
            logged
              ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-200 dark:border-emerald-700"
              : "bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300"
          }`}
        >
          {logged ? <><CheckCircle2 className="w-3.5 h-3.5" /> Logged to Care Diary</> : <><BookmarkPlus className="w-3.5 h-3.5" /> Log to Care Diary</>}
        </button>
      </div>
    </motion.div>
  );
}

export default function FoodLookup() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [logged, setLogged] = useState({});
  const [logMsg, setLogMsg] = useState("");
  const inputRef = useRef(null);

  async function search(q) {
    const term = (q || query).trim();
    if (!term) return;
    setLoading(true);
    setSearched(true);
    setResults([]);
    setLogMsg("");

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a diabetes nutrition expert. The user searched for: "${term}"

Return a JSON object with a "foods" array of up to 5 matching foods. For each food include:
- name: exact food name (string)
- serving: typical serving size (string, e.g. "1 cup (195g)")
- calories: kcal per serving (integer)
- carbs: total carbohydrates in grams (number, 1 decimal)
- fiber: dietary fiber in grams (number, 1 decimal)
- protein: protein in grams (number, 1 decimal)
- gi: glycemic index score (integer, null if unknown)
- diabetesTip: one sentence practical tip for diabetics about this food (string)

Use real nutritional data. Return ONLY the JSON, no markdown.`,
        add_context_from_internet: true,
        model: "gemini_3_flash",
        response_json_schema: {
          type: "object",
          properties: {
            foods: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  serving: { type: "string" },
                  calories: { type: "number" },
                  carbs: { type: "number" },
                  fiber: { type: "number" },
                  protein: { type: "number" },
                  gi: { type: "number" },
                  diabetesTip: { type: "string" },
                }
              }
            }
          }
        }
      });

      const foods = response?.foods || [];
      setResults(foods);
    } catch (e) {
      setResults([]);
    }
    setLoading(false);
  }

  async function logFood(food) {
    try {
      const user = await base44.auth.me().catch(() => null);
      if (!user) {
        setLogMsg("Sign in to log foods to your Care Diary.");
        return;
      }
      const today = new Date().toISOString().split("T")[0];
      const existing = await base44.entities.DailyLog.filter({ user_id: user.id, date: today });
      const meal = {
        meal_type: "snack",
        description: `${food.name} (${food.serving || "1 serving"}) — ${food.carbs}g carbs, ${food.calories} kcal`,
        estimated_calories: food.calories,
        logged_at: new Date().toISOString(),
      };
      if (existing.length > 0) {
        const log = existing[0];
        const meals = [...(log.meals || []), meal];
        await base44.entities.DailyLog.update(log.id, {
          meals,
          total_calories: (log.total_calories || 0) + (food.calories || 0),
        });
      } else {
        await base44.entities.DailyLog.create({
          user_id: user.id, date: today, meals: [meal], total_calories: food.calories || 0,
        });
      }
      setLogged(prev => ({ ...prev, [food.name]: true }));
      setLogMsg(`✅ ${food.name} logged to your Care Diary!`);
    } catch (e) {
      setLogMsg("Could not log food. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f7ff] dark:bg-[#0a0d1a] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900 dark:text-white leading-none">Food & Nutrition Lookup</p>
              <p className="text-xs text-gray-400">Carbs · GI · Calories · Diabetes tips</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 space-y-5">

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && search()}
            placeholder="Search any food — e.g. banana, oatmeal, white rice…"
            className="w-full pl-12 pr-28 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
          <button
            onClick={() => search()}
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-1.5 transition-all"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            {loading ? "Searching…" : "Search"}
          </button>
        </div>

        {/* Quick searches */}
        <div className="flex flex-wrap gap-2">
          {QUICK_SEARCHES.map(tag => (
            <button key={tag} onClick={() => { setQuery(tag); search(tag); }}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm">
              {tag}
            </button>
          ))}
        </div>

        {/* Log message */}
        <AnimatePresence>
          {logMsg && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-2xl">
              <p className="text-sm text-emerald-700 dark:text-emerald-400 font-semibold">{logMsg}</p>
              <button onClick={() => setLogMsg("")}><X className="w-4 h-4 text-emerald-500" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-7 h-7 text-white animate-spin" />
            </div>
            <p className="font-bold text-gray-900 dark:text-white">Looking up nutrition data…</p>
            <p className="text-sm text-gray-400 mt-1">Searching real food databases</p>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{results.length} results for "<span className="text-emerald-600">{query}</span>"</p>
              <button onClick={() => { setResults([]); setSearched(false); setQuery(""); }}
                className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {results.map((food, i) => (
                <FoodCard key={i} food={food} onLog={logFood} logged={!!logged[food.name]} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && searched && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🥗</p>
            <p className="font-bold text-gray-900 dark:text-white">No results found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different food name</p>
          </div>
        )}

        {/* Intro (before any search) */}
        {!loading && !searched && (
          <div className="grid sm:grid-cols-3 gap-4 mt-2">
            {[
              { icon: "🌾", label: "Carb Counts", desc: "Exact carbohydrate grams per serving — essential for dose calculation" },
              { icon: "📊", label: "Glycemic Index", desc: "GI score tells you how fast a food raises your blood sugar" },
              { icon: "💡", label: "Diabetes Tips", desc: "Practical AI tips tailored for managing blood sugar with each food" },
            ].map(f => (
              <div key={f.label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 text-center">
                <p className="text-3xl mb-2">{f.icon}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{f.label}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            <strong>Educational tool only.</strong> Nutritional values are AI-estimated from food databases and may vary by brand, preparation, or region. Always verify with a registered dietitian before making significant dietary decisions.
          </p>
        </div>

        <div className="flex gap-3 pb-4">
          <Link to="/diet-chart" className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm text-center hover:bg-emerald-700 transition-all">Full Diet Chart 📊</Link>
          <Link to="/bolus-calculator" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm text-center hover:bg-blue-700 transition-all">Bolus Calculator 💉</Link>
        </div>
      </div>
    </div>
  );
}