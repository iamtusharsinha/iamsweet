import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Search, BookOpen, Heart, Activity, Pill, Brain, Shield,
  Baby, FlaskConical, ChevronDown, ExternalLink, BadgeCheck,
  Zap, Globe, ChefHat, Youtube, MessageCircle, Github, ShoppingBag,
  Stethoscope, Sparkles, TrendingUp, Users, Menu, X
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
  { key: "all", label: "All", icon: Globe },
  { key: "Lifestyle", label: "Lifestyle", icon: Heart },
  { key: "Nutrition", label: "Nutrition", icon: Activity },
  { key: "Medication", label: "Medication", icon: Pill },
  { key: "Technology", label: "Technology", icon: Zap },
  { key: "Mental Health", label: "Mental Health", icon: Brain },
  { key: "Prevention", label: "Prevention", icon: Shield },
  { key: "Complications", label: "Complications", icon: BookOpen },
  { key: "Research", label: "Research", icon: FlaskConical },
  { key: "Gestational", label: "Gestational", icon: Baby },
];

const TYPE_COLORS = {
  Article: "bg-blue-50 text-blue-700 border-blue-200",
  PDF: "bg-rose-50 text-rose-700 border-rose-200",
  Video: "bg-amber-50 text-amber-700 border-amber-200",
  Guide: "bg-teal-50 text-teal-700 border-teal-200",
  Tool: "bg-violet-50 text-violet-700 border-violet-200",
  Infographic: "bg-orange-50 text-orange-700 border-orange-200",
  Course: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

const STATS = [
  { value: "537M+", label: "People with Diabetes", icon: Users },
  { value: "374M+", label: "Prediabetes Globally", icon: TrendingUp },
  { value: "1 in 2", label: "Cases Undiagnosed", icon: Shield },
  { value: "90%", label: "Are Type 2", icon: Activity },
  { value: "966B", label: "USD Spent Annually", icon: Globe },
];

const FAQS = [
  { q: "What is DiabetesHub?", a: "DiabetesHub is the world's most complete diabetes support platform — your single destination for everything you need to understand, manage, and thrive with diabetes." },
  { q: "Who is this built for?", a: "Every person touched by diabetes: newly diagnosed patients, long-term T1D and T2D warriors, parents of children with diabetes, caregivers, and healthcare professionals." },
  { q: "Why DiabetesHub instead of other sites?", a: "DiabetesHub brings together Lifestyle, Nutrition, Medication, Technology, Mental Health, and more — so your entire diabetes journey lives here, always free." },
  { q: "Is everything here free?", a: "Yes. Every resource on DiabetesHub is free to access. Our mission is to make world-class diabetes support available to every person on the planet." },
];

const FEATURE_CARDS = [
  { to: "/care", icon: Heart, label: "AI Care Companion", desc: "Daily check-ins & tracking", bg: "from-rose-500 to-pink-600", size: "large" },
  { to: "/meals", icon: ChefHat, label: "Diabetes Meals", desc: "Blood-sugar-friendly recipes", bg: "from-emerald-500 to-green-600", size: "small" },
  { to: "/telehealth", icon: Stethoscope, label: "Telehealth", desc: "Find a global specialist", bg: "from-blue-500 to-indigo-600", size: "small" },
  { to: "/chat", icon: MessageCircle, label: "Ask DiabetesHub AI", desc: "Voice & text — instant answers", bg: "from-violet-500 to-purple-600", size: "medium" },
  { to: "/videos", icon: Youtube, label: "Video Library", desc: "Expert education videos", bg: "from-red-500 to-rose-600", size: "small" },
  { to: "/store", icon: ShoppingBag, label: "HSA/FSA Store", desc: "20+ eligible products", bg: "from-teal-500 to-cyan-600", size: "small" },
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
  const moreRef = useRef(null);

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
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a0d1a] transition-colors duration-300 overflow-x-hidden">

      {/* Ambient blobs */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl -z-10 bg-blue-300/20 dark:bg-blue-800/15 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl -z-10 bg-violet-300/15 dark:bg-violet-900/10 pointer-events-none" />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mt-3 flex items-center gap-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl px-4 py-2.5 shadow-lg shadow-blue-900/5">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 mr-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30">
                <span className="text-white font-black text-sm">D</span>
              </div>
              <span className="font-black text-base text-gray-900 dark:text-white tracking-tight hidden sm:block">DiabetesHub</span>
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
              {/* Mobile burger */}
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

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="text-center max-w-3xl mx-auto">
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
            className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight"
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
            className="mt-5 text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Stop bouncing between websites. DiabetesHub is your free, single destination for lifestyle, nutrition, medication, technology, mental health, and expert care.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-8 relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources, topics, organisations…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-14 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg shadow-blue-900/5"
            />
            <button
              onClick={() => setActiveCategory("all")}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/30"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 flex items-center justify-center flex-wrap gap-4 text-sm text-gray-400"
          >
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
              <BadgeCheck className="w-4 h-4" /> {counts.total}+ Resources
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>10 Categories</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Always Free</span>
          </motion.div>
        </div>
      </section>

      {/* ── BENTO FEATURE GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[140px]">

          {/* Large — AI Care (spans 2 cols, 2 rows) */}
          <Link to="/care"
            className="group col-span-2 row-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 to-pink-700 p-6 flex flex-col justify-between hover:scale-[1.01] transition-transform shadow-xl shadow-rose-500/20">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Daily Wellness</p>
              <h3 className="text-white text-xl font-black leading-tight">AI Care<br />Companion</h3>
              <p className="text-white/70 text-sm mt-1">Blood sugar logs, mood, meds & AI insights</p>
            </div>
            <ArrowRight className="absolute bottom-5 right-5 w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Medium — Ask AI */}
          <Link to="/chat"
            className="group col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-purple-800 p-5 flex flex-col justify-between hover:scale-[1.01] transition-transform shadow-xl shadow-violet-500/20">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-white text-lg font-black">Ask DiabetesHub AI</h3>
                <p className="text-white/70 text-xs mt-0.5">Voice & text · instant answers</p>
              </div>
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">Free</span>
            </div>
          </Link>

          {/* Small — Meals */}
          <Link to="/meals"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-green-700 p-4 flex flex-col justify-between hover:scale-[1.01] transition-transform shadow-lg shadow-emerald-500/20">
            <ChefHat className="w-8 h-8 text-white/80" />
            <div>
              <h3 className="text-white font-black text-base">Meals</h3>
              <p className="text-white/70 text-xs">Low-GI recipes</p>
            </div>
          </Link>

          {/* Small — Telehealth */}
          <Link to="/telehealth"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-700 p-4 flex flex-col justify-between hover:scale-[1.01] transition-transform shadow-lg shadow-blue-500/20">
            <Stethoscope className="w-8 h-8 text-white/80" />
            <div>
              <h3 className="text-white font-black text-base">Telehealth</h3>
              <p className="text-white/70 text-xs">Global specialists</p>
            </div>
          </Link>

          {/* Small — Videos */}
          <Link to="/videos"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 to-rose-700 p-4 flex flex-col justify-between hover:scale-[1.01] transition-transform shadow-lg shadow-red-500/20">
            <Youtube className="w-8 h-8 text-white/80" />
            <div>
              <h3 className="text-white font-black text-base">Videos</h3>
              <p className="text-white/70 text-xs">Expert education</p>
            </div>
          </Link>

          {/* Small — Store */}
          <Link to="/store"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-700 p-4 flex flex-col justify-between hover:scale-[1.01] transition-transform shadow-lg shadow-teal-500/20">
            <ShoppingBag className="w-8 h-8 text-white/80" />
            <div>
              <h3 className="text-white font-black text-base">HSA Store</h3>
              <p className="text-white/70 text-xs">FSA eligible</p>
            </div>
          </Link>

        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-indigo-900 rounded-3xl px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="text-center">
                  <Icon className="w-5 h-5 text-blue-200 mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-blue-200 mt-1 leading-tight">{s.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED RESOURCES ── */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">⭐ Featured</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((r, i) => <ResourceCard key={r.id} resource={r} delay={i * 0.05} />)}
          </div>
        </section>
      )}

      {/* ── RESOURCE BROWSER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">Browse by Category</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Category pills */}
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
                <Icon className="w-3.5 h-3.5" />
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

      {/* ── FAQs ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">FAQ</span>
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
              <span className="text-white font-black text-xs">D</span>
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">DiabetesHub</span>
          </div>
          <p className="text-xs text-gray-400">© 2026 · No one faces diabetes alone 🔵</p>
        </div>
      </footer>
    </div>
  );
}

function ResourceCard({ resource, delay = 0 }) {
  const typeColor = TYPE_COLORS[resource.prompt_type] || "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <motion.a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${typeColor} flex-shrink-0`}>
          {resource.prompt_type}
        </span>
        {resource.credible_org_source && (
          <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" title="Credible organisation" />
        )}
      </div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
        {resource.title}
      </h3>
      {resource.description && (
        <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed line-clamp-2 mb-3 flex-1">
          {resource.description}
        </p>
      )}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50 dark:border-gray-700">
        <div>
          {resource.org_name && <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold truncate max-w-[160px] block">{resource.org_name}</span>}
          {resource.category && <span className="text-xs text-gray-400">{resource.category}</span>}
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
      </div>
      {resource.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {resource.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      )}
    </motion.a>
  );
}