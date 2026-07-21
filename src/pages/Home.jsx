import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Search, BookOpen, Calendar, Users, ChevronDown, GraduationCap, Wrench, FileText } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Logo from "@/components/Logo";
import DarkModeToggle from "@/components/DarkModeToggle";
import TickerBar from "@/components/TickerBar";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "course", label: "Courses", icon: BookOpen },
  { key: "meetup", label: "Meetups", icon: Users },
  { key: "workshop", label: "Workshops", icon: Wrench },
  { key: "hackathon", label: "Hackathons", icon: Calendar },
  { key: "talk", label: "Talks", icon: FileText },
  { key: "study_group", label: "Study groups", icon: GraduationCap }
];

const FAQS = [
  {
    q: "Is OnRamp free?",
    a: "Yes — free, no account, about two minutes. You answer five taps and walk away with a plan."
  },
  {
    q: "Do I need to know how to code?",
    a: "No. OnRamp is built for people just breaking into AI: every plan starts with a beginner-safe course and rooms tagged for newcomers."
  },
  {
    q: "How is this different from asking ChatGPT?",
    a: "Base44 hands you a plan and forgets you. OnRamp hands you one next step and a real room to walk into."
  },
  {
    q: "What happens after I get my plan?",
    a: "You take the first step — start the course, sign up for one event. Email yourself the plan so it's on your device when you come back."
  }
];

export default function Home() {
  const [counts, setCounts] = useState({ courses: 0, events: 0 });
  const [openFaq, setOpenFaq] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadCounts() {
      try {
        const [c, e] = await Promise.all([
          base44.entities.Course.list(),
          base44.entities.Event.list()
        ]);
        setCounts({ courses: c.length, events: e.length });
      } catch (err) { console.error(err); }
    }
    loadCounts();
  }, []);

  const total = counts.courses + counts.events;

  return (
    <div className="min-h-screen overflow-hidden bg-orange-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl -z-10 bg-orange-200/30 dark:bg-orange-900/20" />
      <div className="absolute top-40 left-0 w-80 h-80 rounded-full blur-3xl -z-10 bg-orange-200/20 dark:bg-orange-900/10" />
      <div className="absolute bottom-0 left-1/2 w-[500px] h-96 rounded-full blur-3xl -z-10 bg-orange-100/30 dark:bg-orange-900/10" />

      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 pt-6 pb-2 flex items-center justify-between" style={{background: "transparent"}}>
        <Logo size="md" />
        <div className="flex items-center gap-3">
          <Link
            to="/browse"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors font-medium"
          >
            Browse all
          </Link>
          <DarkModeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-12 md:pt-20 pb-10">
        {/* Top row: text + image aligned */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-400/30 text-orange-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Learning, Personalised
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight tracking-tight"
            >
              A platform where{" "}
              <span className="text-orange-500">Curiosity</span>{" "}
              meets personalised AI{" "}
              <span className="text-orange-500">Curation.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-lg text-gray-500 dark:text-gray-400"
            >
              Base44 hands you a plan and forgets you. <strong className="text-gray-800 dark:text-gray-200">OnRamp hands you one next step and a real room to walk into.</strong>
            </motion.p>
          </div>

          {/* Hero image — top-aligned with text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-orange-200/60">
              <img
                src="https://media.base44.com/images/public/6a58169d7409d26e73f9d4a3/d569f9017_li-zhang-K-DwbsTXliY-unsplash.jpg"
                alt="Abstract orange waves"
                className="w-full h-72 object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Full-width: search, ticker, pills, CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, meetups, hackathons…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery) {
                  window.location.href = `/browse?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="w-full pl-12 pr-14 py-4 rounded-2xl border border-orange-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-sm"
            />
            <button
              onClick={() => {
                if (searchQuery) window.location.href = `/browse?q=${encodeURIComponent(searchQuery)}`;
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
          <TickerBar />
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 flex flex-wrap gap-2"
        >
          {CATEGORIES.map(cat => (
            <Link
              key={cat.key}
              to={cat.key === "all" ? "/browse" : `/browse?tab=${cat.key}`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-800 border border-orange-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700 transition-all"
            >
              {cat.label}
            </Link>
          ))}
        </motion.div>

        {/* How it works */}
        <p className="mt-10 text-xs uppercase tracking-widest text-orange-500 font-semibold mb-3">How it works?</p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {[
            { step: "1", title: "Tell us where you are", desc: "5 quick questions — level, goal, time, city." },
            { step: "2", title: "Get your path", desc: "One course + local events matched to you." },
            { step: "3", title: "Walk in", desc: "Start learning, show up, meet your community." }
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-2xl border border-orange-100 dark:border-gray-700 p-4">
              <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{step}</span>
              <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            to="/intake"
            className="inline-flex items-center gap-2 px-7 py-4 bg-orange-500 text-white rounded-2xl font-semibold text-base hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 dark:shadow-orange-900/40"
          >
            Get my plan <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-2xl font-semibold text-base border border-orange-200 dark:border-gray-700 hover:border-orange-400 hover:text-orange-500 transition-all"
          >
            Browse all {total}
          </Link>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center gap-4 text-sm text-gray-400"
        >
          <span className="text-orange-500 font-semibold">Free</span>
          <span>·</span>
          <span>No account</span>
          <span>·</span>
          <span>2 minutes</span>
        </motion.div>
      </section>

      {/* Community image strip */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="grid grid-cols-3 gap-3 rounded-3xl overflow-hidden">
          <img src="https://media.base44.com/images/public/6a58169d7409d26e73f9d4a3/b6892c842_who-s-denilo-S6DSXlLeijI-unsplash.jpg" alt="Colorful abstract" className="w-full h-32 object-cover rounded-2xl" />
          <img src="https://media.base44.com/images/public/6a58169d7409d26e73f9d4a3/e3273c1c0_aditya-chinchure-ZhQCZjr9fHo-unsplash.jpg" alt="Event crowd" className="w-full h-32 object-cover rounded-2xl" />
          <img src="https://media.base44.com/images/public/6a58169d7409d26e73f9d4a3/c0931f3a2_teemu-paananen-bzdhc5b3Bxs-unsplash.jpg" alt="Tech talk" className="w-full h-32 object-cover rounded-2xl" />
        </div>
      </section>



      {/* FAQs */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <p className="text-xs uppercase tracking-widest text-orange-500 font-semibold mb-6 text-center">FAQs</p>
        <div className="grid md:grid-cols-2 gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-orange-100 dark:border-gray-700 overflow-hidden"
            >
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
      <footer className="border-t border-orange-100 dark:border-gray-800 py-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Logo size="sm" />
          <p className="text-xs text-gray-400 dark:text-gray-600">© 2026 OnRamp</p>
        </div>
      </footer>
    </div>
  );
}