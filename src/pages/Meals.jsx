import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Flame, Search, ChefHat, Leaf, ChevronRight } from "lucide-react";
import RecipeModal from "@/components/meals/RecipeModal";
import { MEALS, ETHNICITIES, CATEGORIES, GI_FILTERS, GI_LABELS, GI_BAR_COLORS } from "@/data/mealsData";

export default function Meals() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [ethnicity, setEthnicity] = useState("All");
  const [giFilter, setGiFilter] = useState("All GI");
  const [selectedMeal, setSelectedMeal] = useState(null);

  const filtered = MEALS.filter(m => {
    if (category !== "All" && m.category !== category) return false;
    if (ethnicity !== "All" && m.ethnicity !== ethnicity) return false;
    if (giFilter !== "All GI" && m.glycemic !== giFilter) return false;
    const q = search.toLowerCase();
    if (q && !m.name.toLowerCase().includes(q) && !m.tags.some(t => t.includes(q)) && !m.cuisine.toLowerCase().includes(q) && !m.ethnicity.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950">
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 bg-blue-200/20 dark:bg-blue-900/10 pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-4 flex items-center justify-between sticky top-0 z-30 bg-blue-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="w-px h-5 bg-blue-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-blue-600" />
            <span className="font-heading font-bold text-base text-blue-900 dark:text-white">Diabetes-Friendly Meals</span>
          </div>
        </div>
        <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{filtered.length} meals</span>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mission strip */}
        <div className="bg-blue-600 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <Leaf className="w-5 h-5 text-blue-200 flex-shrink-0" />
          <p className="text-sm text-white"><strong>Every meal is designed for blood sugar stability</strong> — with step-by-step recipes, GI scores, and diabetes tips. Tap any card to start cooking.</p>
        </div>

        {/* Search + category filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search meals, cuisines, tags…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={giFilter} onChange={e => setGiFilter(e.target.value)} className="px-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {GI_FILTERS.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>

        {/* Ethnicity filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ETHNICITIES.map(e => (
            <button
              key={e.key}
              onClick={() => setEthnicity(e.key)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                ethnicity === e.key
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 border-blue-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              <span>{e.emoji}</span>{e.key}
              {e.key !== "All" && (
                <span className={`text-xs rounded-full px-1.5 font-semibold ${ethnicity === e.key ? "bg-blue-500 text-white" : "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"}`}>
                  {MEALS.filter(m => m.ethnicity === e.key).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <ChefHat className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No meals match your filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((meal, i) => (
              <motion.div
                key={meal.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.4) }}
                onClick={() => setSelectedMeal(meal)}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-blue-900/20 hover:border-blue-300 transition-all group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 text-xs font-semibold px-2.5 py-1 rounded-full text-blue-700 border border-blue-100">
                    {meal.category}
                  </span>
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${GI_LABELS[meal.glycemic] || "bg-gray-100 text-gray-600"}`}>
                    GI {meal.giScore}
                  </span>
                  <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                    {ETHNICITIES.find(e => e.key === meal.ethnicity)?.emoji} {meal.ethnicity}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    {meal.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed line-clamp-2">
                    {meal.description}
                  </p>

                  <div className="mb-3">
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${GI_BAR_COLORS[meal.glycemic] || "bg-gray-400"}`} style={{ width: `${(meal.giScore / 100) * 100}%` }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">GI Score</span>
                      <span className={`text-xs font-semibold ${meal.glycemic === "Low" ? "text-green-600" : meal.glycemic === "Low-Medium" ? "text-yellow-600" : "text-orange-600"}`}>{meal.glycemic}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-orange-400" />{meal.calories} cal</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-400" />{meal.prep} min</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold group-hover:gap-2 transition-all">
                      Cook <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {selectedMeal && <RecipeModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />}
    </div>
  );
}