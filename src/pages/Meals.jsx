import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Flame, Search, ChefHat, Leaf, Heart } from "lucide-react";

const MEALS = [
  {
    name: "Grilled Salmon with Roasted Broccoli",
    category: "Dinner",
    calories: 380,
    prep: 25,
    description: "Omega-3 rich salmon with fibre-packed broccoli. Great for blood sugar stability.",
    tags: ["high protein", "low carb", "heart healthy"],
    cuisine: "Mediterranean",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
    glycemic: "Low"
  },
  {
    name: "Greek Yogurt Berry Bowl",
    category: "Breakfast",
    calories: 210,
    prep: 5,
    description: "High-protein Greek yogurt with antioxidant-rich berries and a sprinkle of chia seeds.",
    tags: ["high protein", "low sugar", "quick"],
    cuisine: "International",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&q=80",
    glycemic: "Low"
  },
  {
    name: "Lentil & Spinach Soup",
    category: "Lunch",
    calories: 290,
    prep: 30,
    description: "Protein and fibre-rich lentils slow glucose absorption — a diabetes superfood meal.",
    tags: ["high fibre", "plant-based", "filling"],
    cuisine: "Indian",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    glycemic: "Low"
  },
  {
    name: "Avocado Egg Toast on Whole Grain",
    category: "Breakfast",
    calories: 320,
    prep: 10,
    description: "Healthy fats from avocado paired with protein-rich eggs on low-GI whole grain bread.",
    tags: ["healthy fats", "low GI", "quick"],
    cuisine: "International",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80",
    glycemic: "Low-Medium"
  },
  {
    name: "Chicken & Vegetable Stir Fry",
    category: "Dinner",
    calories: 340,
    prep: 20,
    description: "Lean chicken with colourful vegetables in a light sauce — minimal carbs, maximum nutrients.",
    tags: ["lean protein", "low carb", "colourful"],
    cuisine: "Asian",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
    glycemic: "Low"
  },
  {
    name: "Munggo Beans (Filipino Mung Bean Stew)",
    category: "Dinner",
    calories: 260,
    prep: 40,
    description: "Traditional Filipino mung bean stew — high fibre, plant-based protein, diabetes-friendly.",
    tags: ["high fibre", "plant-based", "traditional"],
    cuisine: "Filipino",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&q=80",
    glycemic: "Low"
  },
  {
    name: "Quinoa Salad with Chickpeas",
    category: "Lunch",
    calories: 310,
    prep: 15,
    description: "Complete protein quinoa with chickpeas, cucumber, and lemon dressing. No blood sugar spike.",
    tags: ["complete protein", "plant-based", "meal prep"],
    cuisine: "Mediterranean",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    glycemic: "Low"
  },
  {
    name: "Zucchini Noodles with Turkey Bolognese",
    category: "Dinner",
    calories: 295,
    prep: 25,
    description: "Swap pasta for zucchini noodles — all the comfort, fraction of the carbs.",
    tags: ["low carb", "pasta alternative", "lean protein"],
    cuisine: "Italian",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    glycemic: "Low"
  },
  {
    name: "Overnight Oats with Cinnamon & Nuts",
    category: "Breakfast",
    calories: 280,
    prep: 5,
    description: "Rolled oats soaked overnight with cinnamon (a natural blood sugar regulator) and mixed nuts.",
    tags: ["slow release", "high fibre", "meal prep"],
    cuisine: "International",
    image: "https://images.unsplash.com/photo-1517673408745-02e11419c4f4?w=600&q=80",
    glycemic: "Low-Medium"
  },
  {
    name: "Tuna Lettuce Wraps",
    category: "Lunch",
    calories: 190,
    prep: 10,
    description: "High-protein tuna in crisp lettuce cups with avocado and tomato. Zero refined carbs.",
    tags: ["high protein", "low carb", "quick"],
    cuisine: "International",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    glycemic: "Low"
  },
  {
    name: "Roasted Sweet Potato & Black Bean Bowl",
    category: "Lunch",
    calories: 350,
    prep: 35,
    description: "Sweet potato's natural sugars are balanced by black bean fibre for steady glucose release.",
    tags: ["high fibre", "plant-based", "filling"],
    cuisine: "Latin",
    image: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?w=600&q=80",
    glycemic: "Medium"
  },
  {
    name: "Baked Cod with Lemon & Herbs",
    category: "Dinner",
    calories: 220,
    prep: 20,
    description: "Light, lean white fish baked with herbs and lemon — virtually zero carbs, pure protein.",
    tags: ["low carb", "lean protein", "heart healthy"],
    cuisine: "Mediterranean",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    glycemic: "Low"
  },
];

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];
const CUISINES = ["All Cuisines", "Mediterranean", "Asian", "Indian", "Filipino", "Italian", "Latin", "International"];
const GI_LABELS = { Low: "bg-green-100 text-green-700", "Low-Medium": "bg-yellow-100 text-yellow-700", Medium: "bg-orange-100 text-orange-700" };

export default function Meals() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cuisine, setCuisine] = useState("All Cuisines");

  const filtered = MEALS.filter(m => {
    if (category !== "All" && m.category !== category) return false;
    if (cuisine !== "All Cuisines" && m.cuisine !== cuisine) return false;
    const q = search.toLowerCase();
    if (q && !m.name.toLowerCase().includes(q) && !m.tags.some(t => t.includes(q)) && !m.cuisine.toLowerCase().includes(q)) return false;
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
        <div className="bg-blue-600 rounded-2xl p-4 mb-8 flex items-center gap-3">
          <Leaf className="w-5 h-5 text-blue-200 flex-shrink-0" />
          <p className="text-sm text-white"><strong>Every meal here is designed for blood sugar stability</strong> — low glycaemic index, high fibre, lean proteins, and healthy fats. No calorie traps, no hidden sugars.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
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
          <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={cuisine} onChange={e => setCuisine(e.target.value)} className="px-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200">
            {CUISINES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((meal, i) => (
            <motion.div
              key={meal.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20 transition-all group"
            >
              <div className="relative">
                <img src={meal.image} alt={meal.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 text-xs font-semibold px-2.5 py-1 rounded-full text-blue-700 border border-blue-100">{meal.category}</span>
                <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${GI_LABELS[meal.glycemic] || "bg-gray-100 text-gray-600"}`}>GI: {meal.glycemic}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 leading-snug">{meal.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">{meal.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-orange-400" />{meal.calories} cal</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-400" />{meal.prep} min</span>
                  <span className="text-blue-500 font-medium">{meal.cuisine}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {meal.tags.map(tag => (
                    <span key={tag} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <ChefHat className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No meals match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}