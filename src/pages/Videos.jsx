import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Youtube, Search, BookOpen, Heart, Activity, Pill, Brain, Shield, Zap, Baby, FlaskConical } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const VIDEOS = [
  // BASICS
  {
    id: "Q_epStvzGyc",
    title: "Understanding Diabetes: Type 1 vs Type 2 Explained (Animated CME)",
    channel: "Medical Animation",
    category: "Basics",
    duration: "5:30",
    description: "Clear animated explanation of what diabetes is, the autoimmune nature of Type 1 vs insulin resistance in Type 2, and treatment strategies.",
    tags: ["type 1", "type 2", "animation", "beginner"]
  },
  {
    id: "NyMigFpOnpM",
    title: "Diabetes Mellitus Simplified: Type 1 & 2, Symptoms, Nursing Care & NCLEX",
    channel: "SimpleNursing",
    category: "Basics",
    duration: "38:00",
    description: "Comprehensive breakdown: pathophysiology, risk factors, hyper/hypoglycemia signs, insulin types, oral agents, and diabetic foot care.",
    tags: ["type 1", "type 2", "nursing", "pharmacology"]
  },
  {
    id: "2mNzepkDccM",
    title: "Diabetes Education Series – Episode 1: Introduction",
    channel: "Community Care Physicians",
    category: "Basics",
    duration: "12:00",
    description: "A certified Diabetes Care and Education Specialist covers the fundamentals for newly diagnosed patients, long-term patients, and caregivers.",
    tags: ["beginner", "education", "caregivers"]
  },
  // NUTRITION
  {
    id: "UuKM3a6O_R4",
    title: "Diabetes Diet: What to Eat and What to Avoid",
    channel: "Healthline",
    category: "Nutrition",
    duration: "10:45",
    description: "Practical nutrition guidance — foods that spike blood sugar vs. foods that keep it stable. Real examples, no jargon.",
    tags: ["diet", "nutrition", "blood sugar", "foods"]
  },
  {
    id: "dBnniua6-oM",
    title: "Sugar: The Bitter Truth (Full Lecture)",
    channel: "UCTV / Dr. Robert Lustig",
    category: "Nutrition",
    duration: "1:29:00",
    description: "The landmark UCSF lecture by Dr. Robert Lustig exposing how fructose and refined sugar drive insulin resistance, obesity, and Type 2 diabetes.",
    tags: ["sugar", "fructose", "insulin resistance", "science"]
  },
  {
    id: "4DWKf5RqU-s",
    title: "The Glucose Expert: Calorie Counting Is Wrong — Here's the Science",
    channel: "The Diary of a CEO",
    category: "Nutrition",
    duration: "1:45:00",
    description: "A leading glucose researcher explains why blood sugar spikes — not just calories — drive weight gain, T2D, and metabolic disease.",
    tags: ["glucose spikes", "metabolism", "reversal", "science"]
  },
  {
    id: "L4hV-ZnLvB4",
    title: "7 Foods That Lower Blood Sugar Fast",
    channel: "Doctor's Advice",
    category: "Nutrition",
    duration: "12:00",
    description: "Seven scientifically-backed foods that lower blood sugar, improve insulin sensitivity, and reduce inflammation — with mechanisms explained.",
    tags: ["foods", "blood sugar", "insulin sensitivity", "diet"]
  },
  // MONITORING
  {
    id: "NSSgbBJ3nM4",
    title: "How to Check Your Blood Sugar at Home (Step-by-Step)",
    channel: "Diabetic Me",
    category: "Monitoring",
    duration: "8:30",
    description: "Step-by-step guide to using a glucometer, understanding readings, when to test, and what the numbers mean.",
    tags: ["glucometer", "blood sugar", "self-monitoring"]
  },
  {
    id: "BfUJbJFObUo",
    title: "Understanding A1C — What It Means for Your Diabetes",
    channel: "Diatribe Foundation",
    category: "Monitoring",
    duration: "7:18",
    description: "What A1C actually measures, what your target should be, and how to use it alongside daily glucose readings.",
    tags: ["A1C", "HbA1c", "targets", "monitoring"]
  },
  // TECHNOLOGY
  {
    id: "BoT0Q9QiYIA",
    title: "How Continuous Glucose Monitors (CGM) Work — Dexcom vs Libre",
    channel: "DiaTribe",
    category: "Technology",
    duration: "11:20",
    description: "Visual walkthrough of CGM sensor technology, the major devices (Dexcom G7, FreeStyle Libre 3), who should use them, and insurance tips.",
    tags: ["CGM", "Dexcom", "FreeStyle Libre", "wearable"]
  },
  // EXERCISE
  {
    id: "9T4HPQZ_gWY",
    title: "10-Minute Gentle Exercise for Diabetics (All Fitness Levels)",
    channel: "Diabetes Strong",
    category: "Exercise",
    duration: "10:02",
    description: "Low-impact exercises designed to lower blood glucose and improve insulin sensitivity — suitable for any age or fitness level.",
    tags: ["exercise", "low impact", "blood sugar", "insulin sensitivity"]
  },
  {
    id: "ZCFUkkpGtlQ",
    title: "#1 Exercise for Gestational Diabetes (Prenatal HIIT)",
    channel: "Pregnancy & Postpartum TV",
    category: "Exercise",
    duration: "14:00",
    description: "Prenatal HIIT workout specifically designed to control blood sugars and improve insulin sensitivity during pregnancy.",
    tags: ["gestational", "pregnancy", "exercise", "prenatal"]
  },
  // PREVENTION / REVERSAL
  {
    id: "jd3nkjh0E2A",
    title: "Type 2 Diabetes: Can It Be Reversed?",
    channel: "Doctor Mike",
    category: "Prevention",
    duration: "12:30",
    description: "Evidence-based look at whether Type 2 diabetes can be reversed through lifestyle change, weight loss, and diet — and what the research says.",
    tags: ["reversal", "type 2", "lifestyle", "weight loss"]
  },
  {
    id: "mWNygxUPNsA",
    title: "Reversing Diabetes — The Roles Medication and Diet Play",
    channel: "Metabolic Health Summit",
    category: "Prevention",
    duration: "35:00",
    description: "A physician breaks down what dietary programs actually reverse T2D vs. just lowering A1C slightly, and why insulin sensitivity is the key.",
    tags: ["reversal", "diet", "medication", "insulin resistance"]
  },
  // MENTAL HEALTH
  {
    id: "ixJLYuDhkH0",
    title: "Stress and Blood Sugar: The Hidden Connection",
    channel: "Diabetes Daily",
    category: "Mental Health",
    duration: "8:55",
    description: "How cortisol and stress hormones directly raise blood glucose — and practical techniques to break the stress-spike cycle.",
    tags: ["stress", "cortisol", "mental health", "blood sugar"]
  },
  // MEDICATION
  {
    id: "4GHAs2ybtkE",
    title: "Insulin Explained: Types, Dosing, and Injection Technique",
    channel: "Khan Academy Medicine",
    category: "Medication",
    duration: "14:00",
    description: "Comprehensive overview of rapid, short, intermediate, and long-acting insulin — proper dosing principles and injection technique.",
    tags: ["insulin", "injection", "dosing", "type 1"]
  },
  {
    id: "oIkhgagvrjI",
    title: "Carb Counting 101 for Diabetes Management",
    channel: "Beyond Type 1",
    category: "Medication",
    duration: "9:05",
    description: "How to count carbohydrates effectively for insulin dosing, practical tips for eating out, and avoiding common mistakes.",
    tags: ["carb counting", "insulin", "nutrition", "type 1"]
  },
  // GESTATIONAL
  {
    id: "UIQgolIGQEU",
    title: "Gestational Diabetes Explained (Animation)",
    channel: "Alila Medical Media",
    category: "Gestational",
    duration: "4:30",
    description: "Animated explanation of how gestational diabetes develops during pregnancy, its risks, and how it's managed with diet, exercise, and insulin.",
    tags: ["gestational", "pregnancy", "animation", "GDM"]
  },
  {
    id: "vKA4_28UFqM",
    title: "Gestational Diabetes: Managing Risk During & After Pregnancy",
    channel: "Brigham and Women's Hospital",
    category: "Gestational",
    duration: "15:00",
    description: "Dr. Ellen Seely (Harvard Medical School) on gestational diabetes risks — preeclampsia, macrosomia, and weight management after birth.",
    tags: ["gestational", "pregnancy", "hospital", "expert"]
  },
  // PEDIATRIC
  {
    id: "TJH2bEVOmgI",
    title: "Kids with Type 1 Diabetes — A Parent's Complete Guide",
    channel: "JDRF",
    category: "Pediatric",
    duration: "9:15",
    description: "JDRF guide for parents — school routines, hypoglycemia response, emotional support, and navigating daily life with a child with T1D.",
    tags: ["pediatric", "type 1", "parents", "children"]
  },
  // RESEARCH / SCIENCE
  {
    id: "Ea4du9Cuwq0",
    title: "How to Lower Blood Sugar and Reverse Your Diabetes",
    channel: "Low Carb Down Under",
    category: "Research",
    duration: "45:00",
    description: "Detailed clinical breakdown of dietary interventions that have been shown in randomised trials to reverse Type 2 diabetes.",
    tags: ["reversal", "clinical", "diet", "research"]
  },
];

const CATEGORIES = ["All", "Basics", "Nutrition", "Monitoring", "Technology", "Exercise", "Prevention", "Mental Health", "Medication", "Gestational", "Pediatric", "Research"];

const CAT_ICONS = {
  Basics: BookOpen, Nutrition: Activity, Monitoring: Heart, Exercise: Activity,
  Prevention: Shield, "Mental Health": Brain, Technology: Zap, Medication: Pill,
  Gestational: Baby, Pediatric: Baby, Research: FlaskConical
};

const CAT_COLORS = {
  Basics: "bg-blue-50 text-blue-700",
  Nutrition: "bg-green-50 text-green-700",
  Monitoring: "bg-cyan-50 text-cyan-700",
  Technology: "bg-violet-50 text-violet-700",
  Exercise: "bg-orange-50 text-orange-700",
  Prevention: "bg-teal-50 text-teal-700",
  "Mental Health": "bg-purple-50 text-purple-700",
  Medication: "bg-rose-50 text-rose-700",
  Gestational: "bg-pink-50 text-pink-700",
  Pediatric: "bg-indigo-50 text-indigo-700",
  Research: "bg-amber-50 text-amber-700",
};

export default function Videos() {
  const { t } = useLanguage();
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
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950 pb-16 md:pb-0">
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 bg-blue-200/20 dark:bg-blue-900/10 pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 flex items-center justify-between sticky top-0 z-30 bg-blue-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-800" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}>
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("home")}
          </Link>
          <div className="w-px h-5 bg-blue-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-500" />
            <span className="font-heading font-bold text-base text-blue-900 dark:text-white">{t("videosTitle")}</span>
          </div>
        </div>
        <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{filtered.length} / {VIDEOS.length} videos</span>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t("searchVideos")}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
                <span className={`text-xs rounded-full px-1.5 font-semibold ${category === cat ? "bg-blue-500 text-white" : "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"}`}>
                  {cat === "All" ? VIDEOS.length : VIDEOS.filter(v => v.category === cat).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
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
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CAT_COLORS[video.category] || "bg-gray-100 text-gray-600"}`}>{video.category}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Youtube className="w-3 h-3 text-red-500" />{video.channel}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-2">{video.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">{video.description}</p>
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
            <p className="font-medium">{t("noVideos")}</p>
          </div>
        )}
      </div>
    </div>
  );
}