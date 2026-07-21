import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Search, BookOpen, Heart, Activity, Pill, Brain, Shield,
  Baby, FlaskConical, ChevronDown, ExternalLink, BadgeCheck,
  Zap, Globe, ChefHat, Youtube, MessageCircle, Github, ShoppingBag,
  Stethoscope, Sparkles, TrendingUp, Users, Menu, X, ChevronRight, Star
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import DarkModeToggle from "@/components/DarkModeToggle";

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
  { to: "/opensource", icon: Github, label: "Open Source", desc: "20 GitHub projects", color: "text-gray-800 dark:text-white" },
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
];

// Category image strip — GoodRx style
const CAT_IMAGES = [
  { key: "Lifestyle", emoji: "🏃", image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=200&h=200&fit=crop", color: "bg-rose-50 dark:bg-rose-900/20", border: "border-rose-200 dark:border-rose-800" },
  { key: "Nutrition", emoji: "🥑", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop", color: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800" },
  { key: "Medication", emoji: "💊", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop", color: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800" },
  { key: "Technology", emoji: "📡", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=200&fit=crop", color: "bg-violet-50 dark:bg-violet-900/20", border: "border-violet-200 dark:border-violet-800" },
  { key: "Mental Health", emoji: "🧘", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=200&fit=crop", color: "bg-teal-50 dark:bg-teal-900/20", border: "border-teal-200 dark:border-teal-800" },
  { key: "Research", emoji: "🔬", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=200&h=200&fit=crop", color: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-800" },
];

export default function Home() {
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
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || r.title?.toLowerCase().includes(q) || r.org_name?.toLowerCase().includes(q) || r.category?.toLowerCase().includes(q) || r.tags?.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f5f7ff] dark:bg-[#0a0d1a] transition-colors duration-300 overflow-x-hidden">

      {/* Ambient blobs */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl -z-10 bg-blue-300/20 dark:bg-blue-800/15 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl -z-10 bg-violet-300/15 dark:bg-violet-900/10 pointer-events-none" />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mt-3 flex items-center gap-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-2xl px-4 py-2.5 shadow-lg shadow-blue-900/5">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 mr-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30">
                <span className="text-white font-black text-sm">i</span>
              </div>
              <span className="font-black text-base text-gray-900 dark:text-white tracking-tight hidden sm:block">iamsweet</span>
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
                Ask AI
              </Link>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              World's #1 Diabetes Support Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight"
            >
              Everything Diabetes.
              <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                One Platform.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
            >
              Stop bouncing between websites. iamsweet is your free, single destination for lifestyle, nutrition, medication, technology, mental health, and expert care.
            </motion.p>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-8 relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources, topics, organisations…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-14 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg shadow-blue-900/5"
              />
              <button onClick={() => setActiveCategory("all")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/30">
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </motion.div>

            {/* Quick topic pills */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
              className="mt-4 flex flex-wrap gap-2">
              {["Blood Sugar", "Insulin", "Low-GI Diet", "HbA1c", "CGM", "Type 1", "Type 2"].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all shadow-sm"
                >
                  {tag}
                </button>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="mt-5 flex items-center flex-wrap gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                <BadgeCheck className="w-4 h-4" /> {counts.total}+ Resources
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>10 Categories</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Always Free</span>
            </motion.div>
          </div>

          {/* Right — floating hero illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 80 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[380px] h-[380px]">
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/20 blur-md" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-44 h-44 rounded-3xl bg-white dark:bg-gray-800 shadow-2xl shadow-blue-200/60 dark:shadow-blue-900/40 flex flex-col items-center justify-center gap-2 border border-blue-100 dark:border-gray-700"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/40">
                    <div className="w-10 h-10 rounded-full border-[5px] border-white" />
                  </div>
                  <span className="text-xs font-black text-blue-700 dark:text-blue-300 tracking-wide">iamsweet</span>
                  <span className="text-[10px] text-gray-400">No one fights alone 💙</span>
                </motion.div>
              </div>

              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute top-4 left-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-rose-100 dark:border-gray-700 px-3 py-2 flex items-center gap-2">
                <span className="text-lg">❤️</span>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-white leading-none">Care Log</p>
                  <p className="text-[10px] text-gray-400">Today: 98 mg/dL</p>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute top-6 right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-green-100 dark:border-gray-700 px-3 py-2 flex items-center gap-2">
                <span className="text-lg">🥗</span>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-white leading-none">Low GI Meal</p>
                  <p className="text-[10px] text-gray-400">GI Score: 32</p>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-10 left-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-violet-100 dark:border-gray-700 px-3 py-2 flex items-center gap-2">
                <span className="text-lg">🤖</span>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-white leading-none">AI Insight</p>
                  <p className="text-[10px] text-gray-400">Looking good!</p>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                className="absolute bottom-8 right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-100 dark:border-gray-700 px-3 py-2 flex items-center gap-2">
                <span className="text-lg">🩺</span>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-white leading-none">Telehealth</p>
                  <p className="text-[10px] text-gray-400">Dr. available now</p>
                </div>
              </motion.div>

              {[
                { top: "20%", left: "5%", delay: 0 },
                { top: "70%", left: "15%", delay: 0.6 },
                { top: "15%", left: "75%", delay: 1.2 },
                { top: "75%", left: "80%", delay: 0.4 },
              ].map((pos, i) => (
                <motion.div key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: pos.delay }}
                  className="absolute w-2 h-2 rounded-full bg-blue-400"
                  style={{ top: pos.top, left: pos.left }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GOODRX-STYLE TOPIC CARDS with IMAGES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-sm font-black text-gray-900 dark:text-white">Explore Topics</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <span className="text-xs text-gray-400">6 destinations</span>
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-indigo-900 rounded-3xl px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="text-center">
                <span className="text-2xl">{s.emoji}</span>
                <p className="text-2xl md:text-3xl font-black text-white mt-1">{s.value}</p>
                <p className="text-xs text-blue-200 mt-1 leading-tight">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROWSE BY CATEGORY — image strip ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-sm font-black text-gray-900 dark:text-white">Browse by Category</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
          {CAT_IMAGES.map(c => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`group flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all hover:scale-105 ${
                activeCategory === c.key
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md shadow-blue-200/40"
                  : `${c.color} ${c.border} hover:border-blue-400`
              }`}
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden">
                <img src={c.image} alt={c.key} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-[10px] font-bold text-gray-700 dark:text-gray-200 text-center leading-tight">{c.emoji} {c.key}</span>
            </button>
          ))}
        </div>

        {/* All category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all ${
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
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center gap-1.5 text-sm font-black text-gray-900 dark:text-white">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Featured Resources
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            {featured.length > 3 && (
              <div className="relative">
                <button
                  onClick={() => setFeaturedDropdown(d => d === "more" ? null : "more")}
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors border border-blue-200 dark:border-blue-700 px-3 py-1.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(featuredExpanded ? featured : featured.slice(0, 3)).map((r, i) => (
              <ResourceCard key={r.id} resource={r} delay={i * 0.05} featured />
            ))}
          </div>
          {featuredExpanded && featured.length > 3 && (
            <button onClick={() => setFeaturedExpanded(false)}
              className="mt-4 text-sm text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1 mx-auto">
              Show less <ChevronDown className="w-4 h-4 rotate-180" />
            </button>
          )}
        </section>
      )}

      {/* ── FAQs ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-black text-gray-900 dark:text-white">Frequently Asked Questions</span>
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
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-black text-xs">i</span>
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">iamsweet</span>
          </div>
          <p className="text-xs text-gray-400">© 2026 iamsweet · No one faces diabetes alone 🔵</p>
        </div>
      </footer>
    </div>
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