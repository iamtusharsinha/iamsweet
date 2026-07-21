import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Youtube, Search, BookOpen, Heart, Activity, Pill, Brain, Shield, Zap, Baby } from "lucide-react";

const VIDEOS = [
  {
    id: "KHZr1bj3cLE",
    title: "What is Diabetes? — A Simple Explanation for Beginners",
    channel: "Diabetes UK",
    category: "Basics",
    duration: "5:12",
    description: "Clear, beginner-friendly explanation of what diabetes is, the difference between Type 1 and Type 2, and how the body processes glucose.",
    tags: ["beginner", "type 1", "type 2"]
  },
  {
    id: "NSSgbBJ3nM4",
    title: "How to Check Your Blood Sugar at Home",
    channel: "Diabetic Me",
    category: "Monitoring",
    duration: "8:30",
    description: "Step-by-step guide to checking your blood glucose with a glucometer at home, what the numbers mean, and when to test.",
    tags: ["blood sugar", "glucometer", "self-monitoring"]
  },
  {
    id: "UuKM3a6O_R4",
    title: "Diabetes Diet: What to Eat and What to Avoid",
    channel: "Healthline",
    category: "Nutrition",
    duration: "10:45",
    description: "Practical nutrition guidance — foods that spike blood sugar vs. foods that keep it stable. Real examples, no jargon.",
    tags: ["diet", "nutrition", "blood sugar"]
  },
  {
    id: "9T4HPQZ_gWY",
    title: "10-Minute Gentle Exercise for Diabetics",
    channel: "Diabetes Strong",
    category: "Exercise",
    duration: "10:02",
    description: "Low-impact exercises suitable for all fitness levels that help lower blood glucose and improve insulin sensitivity.",
    tags: ["exercise", "low impact", "insulin sensitivity"]
  },
  {
    id: "BfUJbJFObUo",
    title: "Understanding A1C — What It Means for Your Diabetes",
    channel: "Diatribe",
    category: "Monitoring",
    duration: "7:18",
    description: "What A1C actually measures, why it matters, and how to interpret your results in the context of daily management.",
    tags: ["A1C", "HbA1c", "monitoring"]
  },
  {
    id: "jd3nkjh0E2A",
    title: "Type 2 Diabetes: Can It Be Reversed?",
    channel: "Doctor Mike",
    category: "Prevention",
    duration: "12:30",
    description: "Evidence-based deep dive into whether Type 2 diabetes can be reversed through lifestyle change, weight loss, and diet.",
    tags: ["reversal", "type 2", "lifestyle"]
  },
  {
    id: "oIkhgagvrjI",
    title: "Carb Counting 101 for Diabetes",
    channel: "Beyond Type 1",
    category: "Nutrition",
    duration: "9:05",
    description: "How to count carbohydrates effectively, why it matters for insulin dosing, and practical tips for eating out.",
    tags: ["carb counting", "insulin", "nutrition"]
  },
  {
    id: "ixJLYuDhkH0",
    title: "Stress and Blood Sugar: The Hidden Connection",
    channel: "Diabetes Daily",
    category: "Mental Health",
    duration: "8:55",
    description: "How stress hormones like cortisol directly raise blood glucose — and practical techniques to break the cycle.",
    tags: ["stress", "mental health", "cortisol"]
  },
  {
    id: "BoT0Q9QiYIA",
    title: "How Continuous Glucose Monitors (CGM) Work",
    channel: "DiaTribe",
    category: "Technology",
    duration: "11:20",
    description: "Visual walkthrough of how CGM sensors work, the major brands (Dexcom, Libre), and who should use them.",
    tags: ["CGM", "Dexcom", "FreeStyle Libre"]
  },
  {
    id: "bEzP8YGGjKE",
    title: "Gestational Diabetes — What You Need to Know",
    channel: "What to Expect",
    category: "Gestational",
    duration: "7:40",
    description: "Everything pregnant women need to know about gestational diabetes — risks, monitoring, diet, and what happens after birth.",
    tags: ["gestational", "pregnancy", "GDM"]
  },
  {
    id: "4GHAs2ybtkE",
    title: "Insulin Explained: Types, Dosing, and Injection Technique",
    channel: "Khan Academy Medicine",
    category: "Medication",
    duration: "14:00",
    description: "Comprehensive overview of insulin types (rapid, short, intermediate, long-acting), how to dose, and proper injection technique.",
    tags: ["insulin", "injection", "type 1"]
  },
  {
    id: "TJH2bEVOmgI",
    title: "Kids with Type 1 Diabetes — A Parent's Guide",
    channel: "JDRF",
    category: "Pediatric",
    duration: "9:15",
    description: "Guidance for parents on managing Type 1 diabetes in children — school routines, hypos, and emotional support.",
    tags: ["pediatric", "type 1", "parenting"]
  },
];

const CATEGORIES = ["All", "Basics", "Nutrition", "Monitoring", "Exercise", "Prevention", "Mental Health", "Technology", "Medication", "Gestational", "Pediatric"];

const CAT_ICONS = {
  Basics: BookOpen, Nutrition: Activity, Monitoring: Heart, Exercise: Activity,
  Prevention: Shield, "Mental Health": Brain, Technology: Zap, Medication: Pill,
  Gestational: Baby, Pediatric: Baby
};

export default function Videos() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [playing, setPlaying] = useState(null);

  const filtered = VIDEOS.filter(v => {
    if (category !== "All" && v.category !== category) return false;
    const q = search.toLowerCase();
    if (q && !v.title.toLowerCase().includes(q) && !v.channel.toLowerCase().includes(q) && !v.tags.some(t => t.includes(q))) return false;
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
            <Youtube className="w-5 h-5 text-red-500" />
            <span className="font-heading font-bold text-base text-blue-900 dark:text-white">Diabetes Videos</span>
          </div>
        </div>
        <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{filtered.length} videos</span>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos, channels, topics…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => {
            const Icon = CAT_ICONS[cat];
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  category === cat
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 border-blue-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {Icon && <Icon className="w-3 h-3" />}{cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20 transition-all"
            >
              {/* Thumbnail / Player */}
              <div className="relative aspect-video bg-gray-900">
                {playing === video.id ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setPlaying(video.id)}
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white ml-1" fill="white" />
                      </div>
                    </button>
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">{video.duration}</span>
                  </>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">{video.category}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Youtube className="w-3 h-3 text-red-500" />{video.channel}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-2">{video.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{video.description}</p>
                <div className="flex flex-wrap gap-1">
                  {video.tags.map(tag => (
                    <span key={tag} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <Youtube className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No videos found</p>
          </div>
        )}
      </div>
    </div>
  );
}