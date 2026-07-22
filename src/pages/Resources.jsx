import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ExternalLink, BadgeCheck, Globe, Heart, Activity, Pill, Brain, Shield, Baby, FlaskConical, Zap, BookOpen, ArrowLeft, Filter } from "lucide-react";
import { base44 } from "@/api/base44Client";
import CustomSelect from "@/components/ui/CustomSelect";
import { useLanguage } from "@/lib/LanguageContext";

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
  { key: "Pediatric", label: "Pediatric", icon: Baby },
];

const TYPES = ["All Types", "Article", "PDF", "Video", "Guide", "Tool", "Course"];

const TYPE_COLORS = {
  Article: "bg-blue-50 text-blue-700 border-blue-200",
  PDF: "bg-rose-50 text-rose-700 border-rose-200",
  Video: "bg-amber-50 text-amber-700 border-amber-200",
  Guide: "bg-teal-50 text-teal-700 border-teal-200",
  Tool: "bg-violet-50 text-violet-700 border-violet-200",
  Course: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

export default function Resources() {
  const { t } = useLanguage();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [credibleOnly, setCredibleOnly] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const all = await base44.entities.DiabetesResource.list();
        setResources(all);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    load();
  }, []);

  const filtered = resources.filter(r => {
    if (activeCategory !== "all" && r.category !== activeCategory) return false;
    if (activeType !== "All Types" && r.prompt_type !== activeType) return false;
    if (credibleOnly && !r.credible_org_source) return false;
    const q = searchQuery.toLowerCase();
    if (q && !r.title?.toLowerCase().includes(q) && !r.org_name?.toLowerCase().includes(q) && !r.category?.toLowerCase().includes(q) && !r.tags?.some(t => t.toLowerCase().includes(q))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -z-10 bg-blue-200/20 dark:bg-blue-900/10 pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 flex items-center justify-between sticky top-0 z-30 bg-blue-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-800" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}>
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("back")}
          </Link>
          <div className="w-px h-5 bg-blue-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">D</span>
            </div>
            <span className="font-heading font-bold text-base text-blue-900 dark:text-white">{t("resourcesTitle")}</span>
          </div>
        </div>
        <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{filtered.length} resources</span>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchResources")}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <CustomSelect
            value={activeType}
            onChange={setActiveType}
            options={TYPES}
            className="sm:w-44"
          />
          <button
            onClick={() => setCredibleOnly(!credibleOnly)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${credibleOnly ? "bg-blue-600 border-blue-600 text-white" : "bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-blue-400"}`}
          >
            <BadgeCheck className="w-4 h-4" /> {t("credibleOnly")}
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  activeCategory === cat.key
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 border-blue-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                <Icon className="w-3 h-3" />{cat.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium text-lg">{t("noResources")}</p>
            <p className="text-sm mt-1">{t("adjustFilters")}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((r, i) => {
              const typeColor = TYPE_COLORS[r.prompt_type] || "bg-gray-50 text-gray-700 border-gray-200";
              return (
                <motion.a
                  key={r.id}
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.3) }}
                  className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 p-4 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${typeColor} flex-shrink-0`}>{r.prompt_type}</span>
                    {r.credible_org_source && <BadgeCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />}
                  </div>
                  <h3 className="text-xs font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors flex-1">
                    {r.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-50 dark:border-gray-700">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium truncate max-w-[130px]">{r.org_name || r.category}</span>
                    <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                  </div>
                  {r.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {r.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  )}
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}