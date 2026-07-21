import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Search, BookOpen, Heart, Activity, Pill, Brain, Shield,
  Baby, FlaskConical, ChevronDown, ExternalLink, BadgeCheck, FileText,
  Zap, Globe, ChefHat, Youtube, MessageCircle
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import Logo from "@/components/Logo";
import DarkModeToggle from "@/components/DarkModeToggle";

const CATEGORIES = [
  { key: "all", label: "All Resources", icon: Globe, color: "bg-blue-100 text-blue-700 border-blue-200" },
  { key: "Lifestyle", label: "Lifestyle", icon: Heart, color: "bg-sky-100 text-sky-700 border-sky-200" },
  { key: "Nutrition", label: "Nutrition", icon: Activity, color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  { key: "Medication", label: "Medication", icon: Pill, color: "bg-blue-100 text-blue-700 border-blue-200" },
  { key: "Technology", label: "Technology", icon: Zap, color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { key: "Mental Health", label: "Mental Health", icon: Brain, color: "bg-violet-100 text-violet-700 border-violet-200" },
  { key: "Prevention", label: "Prevention", icon: Shield, color: "bg-teal-100 text-teal-700 border-teal-200" },
  { key: "Complications", label: "Complications", icon: BookOpen, color: "bg-rose-100 text-rose-700 border-rose-200" },
  { key: "Research", label: "Research", icon: FlaskConical, color: "bg-purple-100 text-purple-700 border-purple-200" },
  { key: "Gestational", label: "Gestational", icon: Baby, color: "bg-pink-100 text-pink-700 border-pink-200" },
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
  { value: "537M+", label: "People with Diabetes Worldwide" },
  { value: "1 in 2", label: "Adults with Diabetes Undiagnosed" },
  { value: "90%", label: "Are Type 2 Diabetes Cases" },
  { value: "966B", label: "USD Spent on Diabetes Health Annually" },
];

const FAQS = [
  { q: "What is DiabetesHub?", a: "DiabetesHub is the world's most complete diabetes support platform — your single destination for everything you need to understand, manage, and thrive with diabetes. You never need to look anywhere else." },
  { q: "Who is this built for?", a: "Every person touched by diabetes: newly diagnosed patients, long-term T1D and T2D warriors, parents of children with diabetes, caregivers, and healthcare professionals — all in one place." },
  { q: "Why should I use DiabetesHub instead of other sites?", a: "Because you shouldn't have to piece together your care from a dozen different websites. DiabetesHub brings together Lifestyle, Nutrition, Medication, Technology, Mental Health, and more — so your entire diabetes journey lives here." },
  { q: "Is everything here free?", a: "Yes. Every resource on DiabetesHub is free to access. Our mission is to make world-class diabetes support available to every person on the planet, with no barriers." },
];

export default function Home() {
  const [resources, setResources] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [counts, setCounts] = useState({ total: 0, orgs: 0 });

  useEffect(() => {
    async function load() {
      try {
        const all = await base44.entities.DiabetesResource.list();
        setResources(all);
        setFeatured(all.filter(r => r.featured));
        const orgs = new Set(all.map(r => r.org_name).filter(Boolean));
        setCounts({ total: all.length, orgs: orgs.size });
      } catch (err) { console.error(err); }
    }
    load();
  }, []);

  const filtered = resources.filter(r => {
    const matchCat = activeCategory === "all" || r.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || r.title?.toLowerCase().includes(q) || r.org_name?.toLowerCase().includes(q) || r.category?.toLowerCase().includes(q) || r.tags?.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950 transition-colors duration-300 overflow-x-hidden">
      {/* Decorative blobs — blue palette */}
      <div className="fixed top-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl -z-10 bg-blue-200/30 dark:bg-blue-900/20 pointer-events-none" />
      <div className="fixed top-60 left-0 w-80 h-80 rounded-full blur-3xl -z-10 bg-sky-200/25 dark:bg-sky-900/10 pointer-events-none" />
      <div className="fixed bottom-0 left-1/2 w-[500px] h-96 rounded-full blur-3xl -z-10 bg-blue-100/30 dark:bg-blue-900/10 pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2 flex items-center justify-between sticky top-0 z-30 bg-blue-50/80 dark:bg-gray-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border-4 border-blue-600 flex items-center justify-center bg-blue-600">
            <span className="text-white font-bold text-xs">D</span>
          </div>
          <span className="font-heading font-bold text-lg text-blue-900 dark:text-white tracking-tight">DiabetesHub</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/meals" className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors font-medium"><ChefHat className="w-4 h-4" />Meals</Link>
          <Link to="/videos" className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors font-medium"><Youtube className="w-4 h-4 text-red-500" />Videos</Link>
          <Link to="/chat" className="hidden sm:flex items-center gap-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors font-medium px-3 py-1.5 rounded-full"><MessageCircle className="w-4 h-4" />Ask AI</Link>
          <DarkModeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-12">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-400/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-wide"
            >
              <div className="w-3 h-3 rounded-full border-2 border-blue-600 dark:border-blue-400" />
              Your Complete Diabetes Support Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight tracking-tight"
            >
              The{" "}
              <span className="text-blue-600 dark:text-blue-400">Only</span>{" "}
              Diabetes Support Platform{" "}
              <span className="text-blue-600 dark:text-blue-400">You'll Ever Need.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
            >
              Stop bouncing between websites. DiabetesHub is your single destination for <strong className="text-gray-800 dark:text-gray-200">everything diabetes</strong> — lifestyle, nutrition, medication, technology, mental health, and more. All in one place, always free.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources, organisations, topics…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-14 py-4 rounded-2xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <button
                onClick={() => setActiveCategory("all")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
            >
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold"><BadgeCheck className="w-4 h-4" /> {counts.total}+ Resources</span>
              <span>·</span>
              <span>10 Categories</span>
              <span>·</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">One Platform. No Detours.</span>
            </motion.div>
          </div>

          {/* Blue Circle visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full border-[20px] border-blue-600 opacity-10 animate-ping" style={{ animationDuration: "4s" }} />
              <div className="absolute inset-4 rounded-full border-[16px] border-blue-600 opacity-20" />
              <div className="absolute inset-8 rounded-full border-[14px] border-blue-500 opacity-40" />
              {/* Core */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl shadow-blue-500/50 flex flex-col items-center justify-center text-white">
                <Globe className="w-10 h-10 mb-2 opacity-90" />
                <span className="text-3xl font-bold">537M</span>
                <span className="text-xs opacity-80 text-center px-4 leading-tight mt-1">people living with diabetes worldwide</span>
              </div>
              {/* Orbiting category dots */}
              {["ADA", "WHO", "CDC", "IDF"].map((label, i) => {
                const angle = (i * 90) - 45;
                const rad = (angle * Math.PI) / 180;
                const x = 50 + 42 * Math.cos(rad);
                const y = 50 + 42 * Math.sin(rad);
                return (
                  <div
                    key={label}
                    className="absolute w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border-2 border-blue-200 flex items-center justify-center text-xs font-bold text-blue-700"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="grid sm:grid-cols-3 gap-4">
          <Link to="/meals" className="group flex items-center gap-4 bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl p-5 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20 transition-all">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <ChefHat className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Diabetes Meals</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">12 blood-sugar-friendly recipes</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors flex-shrink-0" />
          </Link>

          <Link to="/videos" className="group flex items-center gap-4 bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl p-5 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
              <Youtube className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Video Library</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">12 expert videos, all categories</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors flex-shrink-0" />
          </Link>

          <Link to="/chat" className="group flex items-center gap-4 bg-blue-600 dark:bg-blue-700 border border-blue-500 rounded-2xl p-5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm">Ask DiabetesHub AI</p>
              <p className="text-xs text-blue-200 mt-0.5">Voice & text — ask anything, instantly</p>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors flex-shrink-0" />
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-blue-600 dark:bg-blue-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-blue-200 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-6">
          <p className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold mb-4">⭐ Featured Resources</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((r, i) => (
              <ResourceCard key={r.id} resource={r} delay={i * 0.05} />
            ))}
          </div>
        </section>
      )}

      {/* Category filter + All resources */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <p className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold mb-5">Browse by Category</p>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  isActive
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900"
                    : "bg-white dark:bg-gray-800 border-blue-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
                {cat.key !== "all" && (
                  <span className={`text-xs rounded-full px-1.5 py-0.5 font-semibold ${isActive ? "bg-blue-500 text-white" : "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"}`}>
                    {resources.filter(r => r.category === cat.key).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-lg font-medium">No resources found</p>
            <p className="text-sm mt-1">Try a different category or search term</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r, i) => (
              <ResourceCard key={r.id} resource={r} delay={i * 0.03} />
            ))}
          </div>
        )}
      </section>

      {/* FAQs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <p className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold mb-6 text-center">Why DiabetesHub is All You Need</p>
        <div className="grid md:grid-cols-2 gap-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-gray-900 dark:text-white text-sm">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-5 pb-5"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100 dark:border-gray-800 py-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-3 border-blue-600 bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">D</span>
            </div>
            <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">DiabetesHub</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-600">© 2026 · One mission: no one faces diabetes alone 🔵</p>
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
      className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 p-5 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/30 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${typeColor} flex-shrink-0`}>
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
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-3 flex-1">
          {resource.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-blue-50 dark:border-gray-700">
        <div className="flex flex-col">
          {resource.org_name && (
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium truncate max-w-[160px]">{resource.org_name}</span>
          )}
          {resource.category && (
            <span className="text-xs text-gray-400">{resource.category}</span>
          )}
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
      </div>

      {resource.tags && resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {resource.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      )}
    </motion.a>
  );
}