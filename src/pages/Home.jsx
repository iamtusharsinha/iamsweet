import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BookOpen, Heart, Activity, Pill, Brain, Shield,
  Baby, FlaskConical, ChevronDown, ExternalLink, BadgeCheck,
  Zap, Globe, ChefHat, Youtube, MessageCircle, Github, ShoppingBag,
  Stethoscope, Sparkles, TrendingUp, Users, Menu, X, ChevronRight, ChevronLeft, Star
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import DarkModeToggle from "@/components/DarkModeToggle";
import LanguagePicker from "@/components/LanguagePicker";
import { useLanguage } from "@/lib/LanguageContext";
import HeroSearch from "@/components/HeroSearch";

const NAV_PRIMARY = [
  { to: "/care", icon: Heart, label: "Care", color: "text-rose-500" },
  { to: "/meals", icon: ChefHat, label: "Meals", color: "text-green-500" },
  { to: "/telehealth", icon: Stethoscope, label: "Telehealth", color: "text-blue-500" },
  { to: "/chat", icon: MessageCircle, label: "Ask AI", color: "text-blue-500", cta: true },
];

const NAV_MORE = [
  { to: "/videos", icon: Youtube, label: "Video Library", desc: "12 expert videos", color: "text-red-500" },
  { to: "/resources", icon: BookOpen, label: "Resources", desc: "Articles & guides", color: "text-violet-500" },
  { to: "/store", icon: ShoppingBag, label: "HSA/FSA Store", desc: "20+ products", color: "text-green-600" },
  { to: "/opensource", icon: Github, label: "Open Source", desc: "30+ GitHub projects", color: "text-gray-800 dark:text-white" },
  { to: "/bolus-calculator", icon: Activity, label: "Bolus Calculator", desc: "Insulin dose tool", color: "text-blue-500" },
  { to: "/cgm-analyzer", icon: Activity, label: "CGM Analyzer", desc: "Upload & analyze data", color: "text-teal-500" },
  { to: "/food-lookup", icon: ChefHat, label: "Food Lookup", desc: "Carbs, GI & calories", color: "text-emerald-500" },
];

const CATEGORIES = [
  { key: "all", label: "All", icon: Globe, emoji: "🌍" },
  { key: "Lifestyle", label: "Lifestyle", icon: Heart, emoji: "❤️" },
  { key: "Nutrition", label: "Nutrition", icon: Activity, emoji: "🥗" },
  { key: "Medication", label: "Medication", icon: Pill, emoji: "💊" },
  { key: "Technology", label: "Technology", icon: Zap, emoji: "⚡" },
  { key: "Mental Health", label: "Mental Health", icon: Brain, emoji: "🧠" },
  { key: "Prevention", label: "Prevention", icon: Shield, emoji: "🛡️" },
  { key: "Complications", label: "Complications", icon: BookOpen, emoji: "📋" },
  { key: "Research", label: "Research", icon: FlaskConical, emoji: "🔬" },
  { key: "Gestational", label: "Gestational", icon: Baby, emoji: "🤱" },
  { key: "Pediatric", label: "Pediatric", icon: Baby, emoji: "👶" },
];

const TYPE_COLORS = {
  Article: { bg: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  PDF: { bg: "bg-rose-100 text-rose-700", dot: "bg-rose-500" },
  Video: { bg: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  Guide: { bg: "bg-teal-100 text-teal-700", dot: "bg-teal-500" },
  Tool: { bg: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
  Infographic: { bg: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
  Course: { bg: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
};

const STATS = [
  { value: "537M+", label: "People with Diabetes", icon: Users, emoji: "👥" },
  { value: "374M+", label: "Prediabetes Globally", icon: TrendingUp, emoji: "📈" },
  { value: "1 in 2", label: "Cases Undiagnosed", icon: Shield, emoji: "🔍" },
  { value: "90%", label: "Are Type 2", icon: Activity, emoji: "📊" },
  { value: "966B", label: "USD Spent Annually", icon: Globe, emoji: "💰" },
];

const FAQS = [
  { q: "What is iamsweet?", a: "iamsweet is the world's most complete diabetes support platform — your single destination for everything you need to understand, manage, and thrive with diabetes." },
  { q: "Who is this built for?", a: "Every person touched by diabetes: newly diagnosed patients, long-term T1D and T2D warriors, parents of children with diabetes, caregivers, and healthcare professionals." },
  { q: "Why iamsweet instead of other sites?", a: "iamsweet brings together Lifestyle, Nutrition, Medication, Technology, Mental Health, and more — so your entire diabetes journey lives here, always free." },
  { q: "Is everything here free?", a: "Yes. Every resource on iamsweet is free to access. Our mission is to make world-class diabetes support available to every person on the planet." },
];

const TICKER_ITEMS = [
  "🔵 World Diabetes Day — November 14",
  "💊 537 million people live with diabetes globally",
  "🥗 Low-GI eating reduces HbA1c by up to 0.5%",
  "🚶 30 min daily walking lowers T2D risk by 35%",
  "🔬 Continuous Glucose Monitors now available OTC",
  "🧠 Diabetes doubles the risk of depression — get support",
  "📊 374 million people have prediabetes — most undiagnosed",
  "💉 Insulin pump users see 70% fewer hypoglycaemic episodes",
  "🌍 1 in 2 adults with diabetes don't know they have it",
  "🩺 Regular HbA1c checks save lives — book yours today",
];

// GoodRx-style topic cards with real Unsplash images
const TOPIC_CARDS = [
  {
    to: "/care",
    label: "Daily Care",
    desc: "Track blood sugar, mood & meds",
    emoji: "❤️",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
    tag: "Most Popular",
    tagColor: "bg-rose-500",
    gradient: "from-rose-600/80",
  },
  {
    to: "/meals",
    label: "Diabetes Meals",
    desc: "Low-GI recipes that taste amazing",
    emoji: "🥗",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    tag: "50+ Recipes",
    tagColor: "bg-emerald-500",
    gradient: "from-emerald-600/80",
  },
  {
    to: "/telehealth",
    label: "Find a Doctor",
    desc: "Connect with global diabetes specialists",
    emoji: "🩺",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
    tag: "Free Consult",
    tagColor: "bg-blue-500",
    gradient: "from-blue-600/80",
  },
  {
    to: "/chat",
    label: "Ask AI",
    desc: "Instant answers to your questions",
    emoji: "🤖",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=300&fit=crop",
    tag: "Always Free",
    tagColor: "bg-violet-500",
    gradient: "from-violet-600/80",
  },
  {
    to: "/videos",
    label: "Video Library",
    desc: "Expert diabetes education videos",
    emoji: "🎬",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop",
    tag: "12 Videos",
    tagColor: "bg-red-500",
    gradient: "from-red-600/80",
  },
  {
    to: "/store",
    label: "HSA/FSA Store",
    desc: "Shop eligible diabetes supplies",
    emoji: "🛍️",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    tag: "Tax-Free",
    tagColor: "bg-teal-500",
    gradient: "from-teal-600/80",
  },
  {
    to: "/bolus-calculator",
    label: "Bolus Calculator",
    desc: "Calculate your insulin dose instantly",
    emoji: "💉",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
    tag: "New Tool",
    tagColor: "bg-blue-500",
    gradient: "from-blue-600/80",
  },
  {
    to: "/cgm-analyzer",
    label: "CGM Analyzer",
    desc: "Upload & analyze your CGM data",
    emoji: "📈",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    tag: "New Tool",
    tagColor: "bg-teal-500",
    gradient: "from-teal-600/80",
  },
  {
    to: "/food-lookup",
    label: "Food Lookup",
    desc: "Carbs, GI & calories for any food",
    emoji: "🥗",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    tag: "New Tool",
    tagColor: "bg-emerald-500",
    gradient: "from-emerald-600/80",
  },
];

// Category image cards — same style as TOPIC_CARDS
const CAT_IMAGES = [
  { key: "Lifestyle", label: "Lifestyle", desc: "Exercise, sleep & daily habits", emoji: "🏃", image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop", tag: "Most Viewed", tagColor: "bg-rose-500", gradient: "from-rose-600/80" },
  { key: "Nutrition", label: "Nutrition", desc: "Low-GI foods & meal planning", emoji: "🥑", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop", tag: "Top Tips", tagColor: "bg-emerald-500", gradient: "from-emerald-600/80" },
  { key: "Medication", label: "Medication", desc: "Insulin, metformin & more", emoji: "💊", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop", tag: "Expert Guides", tagColor: "bg-blue-500", gradient: "from-blue-600/80" },
  { key: "Technology", label: "Technology", desc: "CGMs, pumps & digital tools", emoji: "📡", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop", tag: "Cutting Edge", tagColor: "bg-violet-500", gradient: "from-violet-600/80" },
  { key: "Mental Health", label: "Mental Health", desc: "Stress, burnout & support", emoji: "🧘", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop", tag: "Self-Care", tagColor: "bg-teal-500", gradient: "from-teal-600/80" },
  { key: "Research", label: "Research", desc: "Latest science & clinical trials", emoji: "🔬", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop", tag: "New Studies", tagColor: "bg-amber-500", gradient: "from-amber-600/80" },
];

export default function Home() {
  const { t } = useLanguage();
  const [resources, setResources] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [counts, setCounts] = useState({ total: 0 });
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuredExpanded, setFeaturedExpanded] = useState(false);
  const [featuredDropdown, setFeaturedDropdown] = useState(null);
  const moreRef = useRef(null);
  const featuredRef = useRef(null);
  const catCarouselRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const all = await base44.entities.DiabetesResource.list();
        setResources(all);
        setFeatured(all.filter(r => r.featured));
        setCounts({ total: all.length });
      } catch (err) { console.error(err); }
    }
    load();
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
      if (featuredRef.current && !featuredRef.current.contains(e.target)) setFeaturedDropdown(null);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = resources.filter(r => {
    const matchCat = activeCategory === "all" || r.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      r.title?.toLowerCase().includes(q) ||
      r.org_name?.toLowerCase().includes(q) ||
      r.category?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q) ||
      r.prompt_type?.toLowerCase().includes(q) ||
      r.tags?.some(tag => tag.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f5f7ff] dark:bg-[#0a0d1a] transition-colors duration-300 overflow-x-hidden pb-16 md:pb-0">

      {/* Ambient blobs */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl -z-10 bg-blue-300/20 dark:bg-blue-800/15 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl -z-10 bg-violet-300/15 dark:bg-violet-900/10 pointer-events-none" />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mt-3 flex items-center gap-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-2xl px-4 py-2.5 shadow-lg shadow-blue-900/5">

            {/* Logo */}
            <Link to="/" className="flex items-center mr-2 flex-shrink-0">
              <img src="https://media.base44.com/images/public/6a5ebcfd68e6120b630c6ded/372d3e55c_iamsweet.png" alt="iamsweet" className="h-8 w-auto" />
            </Link>

            <div className="h-5 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />

            {/* Primary nav */}
            <nav className="hidden md:flex items-center gap-1 flex-1">
              {NAV_PRIMARY.filter(n => !n.cta).map(n => {
                const Icon = n.icon;
                return (
                  <Link key={n.to} to={n.to}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-400 transition-all">
                    <Icon className={`w-3.5 h-3.5 ${n.color}`} />
                    {n.label}
                  </Link>
                );
              })}

              {/* More dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(o => !o)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 transition-all"
                >
                  More <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl shadow-blue-900/10 p-2 z-50"
                    >
                      {NAV_MORE.map(n => {
                        const Icon = n.icon;
                        return (
                          <Link key={n.to} to={n.to} onClick={() => setMoreOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                              <Icon className={`w-4 h-4 ${n.color}`} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{n.label}</p>
                              <p className="text-xs text-gray-400">{n.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            <div className="flex-1 md:flex-none" />

            {/* CTA + dark mode */}
            <div className="flex items-center gap-2">
              <Link to="/chat"
                className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-600/25 hover:shadow-blue-600/40">
                <Sparkles className="w-3.5 h-3.5" />
                {t("askAI")}
              </Link>
              <Link to="/login"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800">
                Sign in
              </Link>
              <Link to="/register"
                className="hidden sm:flex items-center gap-1.5 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 text-sm font-semibold px-4 py-2 rounded-xl transition-all">
                Sign up
              </Link>
              <LanguagePicker />
              <DarkModeToggle />
              <button onClick={() => setMobileOpen(o => !o)}
                className="md:hidden w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center">
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-3 grid grid-cols-2 gap-1">
                  <Link to="/login" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all col-span-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sign in</span>
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-blue-600 text-white transition-all col-span-1">
                    <span className="text-sm font-semibold">Sign up free</span>
                  </Link>
                  {[...NAV_PRIMARY, ...NAV_MORE].map(n => {
                    const Icon = n.icon;
                    return (
                      <Link key={n.to} to={n.to} onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                        <Icon className={`w-4 h-4 ${n.color}`} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{n.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── TICKER ── */}
      <div className="overflow-hidden bg-blue-600 dark:bg-blue-900 py-2">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-0 whitespace-nowrap"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-xs text-blue-100 font-medium px-8">
              {item}
              <span className="text-blue-400">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── HERO ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-widest"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
          {t("platformBadge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight"
        >
          {t("heroTitle1")}
          <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {t("heroTitle2")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
        >
          {t("heroSubtitle")}
        </motion.p>

        {/* ── Animated Feature Highlights ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mt-8 mb-2"
        >
          {/* NEW TOOLS row */}
          <div className="flex items-center gap-2 justify-center mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">New Tools</span>
            <div className="h-px flex-1 max-w-[60px] bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {[
              { to: "/bolus-calculator", emoji: "💉", label: "Bolus Calculator", color: "from-blue-500 to-indigo-600", pulse: true },
              { to: "/cgm-analyzer",     emoji: "📈", label: "CGM Analyzer",     color: "from-teal-500 to-cyan-600",   pulse: true },
              { to: "/food-lookup",      emoji: "🥗", label: "Food Lookup",      color: "from-emerald-500 to-green-600", pulse: true },
              { to: "/diet-chart",       emoji: "📊", label: "Diet Chart",       color: "from-orange-500 to-amber-500", pulse: false },
            ].map((f, i) => (
              <motion.div
                key={f.to}
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.07, type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  to={f.to}
                  className={`relative inline-flex items-center gap-2 bg-gradient-to-r ${f.color} text-white text-sm font-bold px-4 py-2 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200`}
                >
                  {f.pulse && (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-white" />
                    </span>
                  )}
                  <span>{f.emoji}</span>
                  {f.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Auto-scrolling feature ticker */}
          <div className="overflow-hidden rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap py-2.5"
            >
              {[
                { icon: "💉", text: "Insulin Bolus Calculator" },
                { icon: "📈", text: "CGM Data Analyzer" },
                { icon: "🥗", text: "Food & GI Lookup" },
                { icon: "📊", text: "AI Diet Chart" },
                { icon: "🤖", text: "SWEETY AI Assistant" },
                { icon: "🩺", text: "Telehealth Doctors" },
                { icon: "❤️", text: "Daily Care Tracker" },
                { icon: "🔬", text: "30+ Open Source Repos" },
                { icon: "🎬", text: "Video Library" },
                { icon: "💊", text: "Medication Reminders" },
                { icon: "🛒", text: "HSA/FSA Store" },
                { icon: "🌍", text: "Multi-Language Support" },
                // duplicate for seamless loop
                { icon: "💉", text: "Insulin Bolus Calculator" },
                { icon: "📈", text: "CGM Data Analyzer" },
                { icon: "🥗", text: "Food & GI Lookup" },
                { icon: "📊", text: "AI Diet Chart" },
                { icon: "🤖", text: "SWEETY AI Assistant" },
                { icon: "🩺", text: "Telehealth Doctors" },
                { icon: "❤️", text: "Daily Care Tracker" },
                { icon: "🔬", text: "30+ Open Source Repos" },
                { icon: "🎬", text: "Video Library" },
                { icon: "💊", text: "Medication Reminders" },
                { icon: "🛒", text: "HSA/FSA Store" },
                { icon: "🌍", text: "Multi-Language Support" },
              ].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-5 text-xs font-semibold text-gray-600 dark:text-gray-300">
                  <span className="text-base">{item.icon}</span>
                  {item.text}
                  <span className="text-gray-300 dark:text-gray-600 ml-3">·</span>
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Smart AI Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-8"
        >
          <HeroSearch
            resources={resources}
            placeholder={t("searchPlaceholder")}
            onScrollToResults={() => setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)}
          />
        </motion.div>

        {/* Quick topic pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="mt-4 flex flex-wrap gap-2 justify-center"
        >
          {["Blood Sugar", "Insulin", "Type 1", "Type 2", "HbA1c", "CGM", "Mental Health", "Research", "Nutrition"].map(tag => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                setActiveCategory("all");
                setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all shadow-sm"
            >
              {tag}
            </button>
          ))}
          <Link
            to="/diet-chart"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 hover:border-emerald-400 transition-all shadow-sm"
          >
            Diet Chart 📊
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          className="mt-5 flex items-center flex-wrap gap-4 text-sm text-gray-400 justify-center"
        >
          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
            <BadgeCheck className="w-4 h-4" /> {counts.total}+ {t("badgeResources")}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{t("badgeCategories")}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-blue-600 dark:text-blue-400 font-semibold">{t("badgeFree")}</span>
        </motion.div>
      </section>

      {/* ── GOODRX-STYLE TOPIC CARDS with IMAGES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-sm font-black text-gray-900 dark:text-white">{t("exploreTopics")}</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <span className="text-xs text-gray-400">{t("destinations")}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TOPIC_CARDS.map((card, i) => (
            <motion.div
              key={card.to}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link to={card.to}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl hover:shadow-blue-100/40 dark:hover:shadow-blue-900/30 hover:-translate-y-1 transition-all duration-200 h-full"
              >
                {/* Image */}
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient} to-transparent`} />
                  {/* Tag badge */}
                  <span className={`absolute top-2 left-2 ${card.tagColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                    {card.tag}
                  </span>
                  <span className="absolute bottom-2 right-2 text-xl">{card.emoji}</span>
                </div>
                {/* Text */}
                <div className="p-3 flex-1">
                  <p className="text-xs font-black text-gray-900 dark:text-white leading-tight group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{card.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{card.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f1f6e] to-[#1a4fc4] p-5 flex flex-col items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-200 group"
            >
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/5 blur-xl pointer-events-none" />
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{s.emoji}</span>
              <p className="text-3xl font-black text-white tracking-tight leading-none">{s.value}</p>
              <p className="text-xs text-blue-200 text-center leading-tight font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BROWSE BY CATEGORY — carousel ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-sm font-black text-gray-900 dark:text-white">{t("browseByCategory")}</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <button onClick={() => catCarouselRef.current?.scrollBy({ left: -220, behavior: "smooth" })} className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center hover:border-blue-400 transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <button onClick={() => catCarouselRef.current?.scrollBy({ left: 220, behavior: "smooth" })} className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center hover:border-blue-400 transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div ref={catCarouselRef} className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mb-6">
          {CAT_IMAGES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 flex-shrink-0 w-44 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${
                activeCategory === c.key
                  ? "border-blue-500 shadow-md shadow-blue-200/40"
                  : "border-gray-100 dark:border-gray-700 hover:border-blue-400"
              }`}
            >
              <div className="relative h-24 overflow-hidden">
                <img src={c.image} alt={c.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} to-transparent`} />
                <span className={`absolute top-2 left-2 ${c.tagColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>{c.tag}</span>
                {activeCategory === c.key && <div className="absolute inset-0 ring-2 ring-blue-500 ring-inset rounded-2xl" />}
                <span className="absolute bottom-2 right-2 text-lg">{c.emoji}</span>
              </div>
              <div className="p-2.5 flex-1 bg-white dark:bg-gray-800 text-left">
                <p className={`text-xs font-black leading-tight transition-colors ${activeCategory === c.key ? "text-blue-700 dark:text-blue-400" : "text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400"}`}>{c.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{c.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* All category pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-1">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all flex-shrink-0 ${
                  isActive
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-400/20"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600"
                }`}>
                <span>{cat.emoji}</span>
                {cat.label}
                {cat.key !== "all" && (
                  <span className={`text-xs rounded-full px-1.5 font-bold ${isActive ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
                    {resources.filter(r => r.category === cat.key).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div ref={resultsRef} />
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No resources found</p>
            <p className="text-sm mt-1">Try a different category or search term</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((r, i) => <ResourceCard key={r.id} resource={r} delay={Math.min(i * 0.03, 0.3)} />)}
          </div>
        )}
      </section>

      {/* ── FEATURED RESOURCES ── */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10" ref={featuredRef}>
          {/* Distinct amber/gold banner header */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 dark:from-amber-500 dark:to-orange-500 rounded-2xl px-6 py-4 mb-5 flex items-center justify-between shadow-lg shadow-amber-200/50 dark:shadow-amber-900/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/25 flex items-center justify-center">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <p className="text-white font-black text-base leading-none">{t("featuredResources")}</p>
                <p className="text-amber-100 text-xs mt-0.5">{t("featuredSubtitle")}</p>
              </div>
            </div>
            {featured.length > 3 && (
              <div className="relative" ref={featuredRef}>
                <button
                  onClick={() => setFeaturedDropdown(d => d === "more" ? null : "more")}
                  className="flex items-center gap-1.5 text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl transition-all border border-white/30"
                >
                  {featuredExpanded ? "Show less" : `+${featured.length - 3} more`}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${featuredDropdown === "more" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {featuredDropdown === "more" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl z-50 overflow-hidden"
                    >
                      <div className="p-2">
                        {featured.slice(3).map(r => (
                          <a key={r.id} href={r.link} target="_blank" rel="noopener noreferrer"
                            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">{r.title}</p>
                              {r.org_name && <p className="text-[10px] text-blue-500 mt-0.5">{r.org_name}</p>}
                            </div>
                            <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-blue-500 flex-shrink-0 mt-0.5" />
                          </a>
                        ))}
                      </div>
                      <div className="px-3 pb-3">
                        <button onClick={() => { setFeaturedExpanded(true); setFeaturedDropdown(null); }}
                          className="w-full text-center text-xs font-semibold text-blue-600 py-2 border border-blue-200 dark:border-blue-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                          Show all {featured.length} featured →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Featured cards — distinct amber-tinted style */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(featuredExpanded ? featured : featured.slice(0, 3)).map((r, i) => (
              <FeaturedCard key={r.id} resource={r} delay={i * 0.05} />
            ))}
          </div>
          {featuredExpanded && featured.length > 3 && (
            <button onClick={() => setFeaturedExpanded(false)}
              className="mt-4 text-sm text-gray-400 hover:text-amber-600 transition-colors flex items-center gap-1 mx-auto">
              Show less <ChevronDown className="w-4 h-4 rotate-180" />
            </button>
          )}
        </section>
      )}

      {/* ── FAQs ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-black text-gray-900 dark:text-white">{t("faq")}</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <p className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <img src="https://media.base44.com/images/public/6a5ebcfd68e6120b630c6ded/372d3e55c_iamsweet.png" alt="iamsweet" className="h-7 w-auto" />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-xs text-gray-400 hover:text-blue-600 transition-colors">About</Link>
            <Link to="/contact" className="text-xs text-gray-400 hover:text-blue-600 transition-colors">Contact</Link>
            <p className="text-xs text-gray-400">© 2026 iamsweet · {t("footer")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeaturedCard({ resource, delay = 0 }) {
  const typeStyle = TYPE_COLORS[resource.prompt_type] || { bg: "bg-gray-100 text-gray-700", dot: "bg-gray-400" };
  const catEmoji = { Lifestyle: "❤️", Nutrition: "🥗", Medication: "💊", Technology: "⚡", "Mental Health": "🧠", Prevention: "🛡️", Complications: "📋", Research: "🔬", Gestational: "🤱" };
  const emoji = catEmoji[resource.category] || "📄";

  return (
    <motion.a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group flex flex-col bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 rounded-2xl border-2 border-amber-200 dark:border-amber-700/50 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-xl hover:shadow-amber-100/60 dark:hover:shadow-amber-900/30 transition-all cursor-pointer overflow-hidden"
    >
      {/* Amber accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 to-orange-400" />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeStyle.bg}`}>{resource.prompt_type}</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured
            </span>
          </div>
          <span className="text-xl flex-shrink-0">{emoji}</span>
        </div>

        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
          {resource.title}
        </h3>

        {resource.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-3 flex-1">
            {resource.description}
          </p>
        )}

        {resource.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.tags.slice(0, 4).map(tag => (
              <span key={tag} className="text-[10px] font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-amber-100 dark:border-amber-800/40">
          <div>
            {resource.org_name && (
              <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold truncate max-w-[160px] block">{resource.org_name}</span>
            )}
            {resource.category && (
              <span className="text-[10px] text-gray-400">{emoji} {resource.category}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-amber-400 group-hover:text-amber-600 transition-colors">
            {resource.credible_org_source && <BadgeCheck className="w-4 h-4 text-blue-500" />}
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function ResourceCard({ resource, delay = 0, featured = false }) {
  const typeStyle = TYPE_COLORS[resource.prompt_type] || { bg: "bg-gray-100 text-gray-700", dot: "bg-gray-400" };

  // Category emoji map
  const catEmoji = { Lifestyle: "❤️", Nutrition: "🥗", Medication: "💊", Technology: "⚡", "Mental Health": "🧠", Prevention: "🛡️", Complications: "📋", Research: "🔬", Gestational: "🤱" };
  const emoji = catEmoji[resource.category] || "📄";

  return (
    <motion.a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border transition-all cursor-pointer overflow-hidden ${
        featured
          ? "border-amber-200 dark:border-amber-800/50 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-100/50 dark:hover:shadow-amber-900/20"
          : "border-gray-100 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20"
      }`}
    >
      {/* Top colored accent bar */}
      <div className={`h-1 w-full ${typeStyle.dot}`} />

      <div className="p-5 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeStyle.bg} flex-shrink-0`}>
              {resource.prompt_type}
            </span>
            {featured && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {resource.credible_org_source && (
              <BadgeCheck className="w-4 h-4 text-blue-500" title="Credible organisation" />
            )}
            <span className="text-base">{emoji}</span>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
          {resource.title}
        </h3>

        {resource.description && (
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed line-clamp-2 mb-3 flex-1">
            {resource.description}
          </p>
        )}

        {/* Tags row */}
        {resource.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.tags.slice(0, 4).map(tag => (
              <span key={tag} className="text-[10px] font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50 dark:border-gray-700">
          <div>
            {resource.org_name && (
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold truncate max-w-[160px] block">{resource.org_name}</span>
            )}
            {resource.category && (
              <span className="text-[10px] text-gray-400">{emoji} {resource.category}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-blue-500 transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}