import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Star, GitFork, ExternalLink, Search, Code, Cpu, Activity, Zap, Brain, FlaskConical, Globe } from "lucide-react";

const PROJECTS = [
  // FLAGSHIP / MOST STARRED
  {
    name: "nightscout/cgm-remote-monitor",
    displayName: "Nightscout CGM Remote Monitor",
    url: "https://github.com/nightscout/cgm-remote-monitor",
    description: "The gold standard open-source CGM remote monitoring platform. Allows caregivers and patients to view real-time glucose data from any CGM device anywhere in the world via a web browser. Powers the #WeAreNotWaiting diabetes community.",
    stars: 2200,
    forks: 1400,
    language: "JavaScript",
    category: "CGM & Monitoring",
    tags: ["CGM", "real-time", "nightscout", "remote monitoring"]
  },
  {
    name: "nightscout/Trio",
    displayName: "Trio — Automated Insulin Delivery (iOS)",
    url: "https://github.com/nightscout/Trio",
    description: "A fully open-source automated insulin delivery (AID) system for iOS, based on the OpenAPS algorithm. Used by thousands of Type 1 diabetics globally as a DIY closed-loop artificial pancreas.",
    stars: 950,
    forks: 310,
    language: "Swift",
    category: "Artificial Pancreas",
    tags: ["AID", "closed-loop", "iOS", "OpenAPS", "type 1"]
  },
  {
    name: "openaps/docs",
    displayName: "OpenAPS — Open Artificial Pancreas System",
    url: "https://github.com/openaps/docs",
    description: "The complete documentation for OpenAPS, the pioneering DIY open-source artificial pancreas project started by Dana Lewis. Algorithms and tools that form the backbone of Trio, Loop, and other AID systems.",
    stars: 236,
    forks: 714,
    language: "Makefile / Docs",
    category: "Artificial Pancreas",
    tags: ["artificial pancreas", "DIY", "closed-loop", "algorithms"]
  },
  {
    name: "timoschlueter/nightscout-librelink-up",
    displayName: "Nightscout LibreLinkUp Bridge",
    url: "https://github.com/timoschlueter/nightscout-librelink-up",
    description: "TypeScript script that bridges FreeStyle Libre CGM readings from the LibreLinkUp app directly into Nightscout — enabling remote monitoring for Libre users worldwide.",
    stars: 287,
    forks: 95,
    language: "TypeScript",
    category: "CGM & Monitoring",
    tags: ["FreeStyle Libre", "LibreLink", "Nightscout", "bridge"]
  },
  {
    name: "jxx123/simglucose",
    displayName: "SimGlucose — Type 1 Diabetes Simulator",
    url: "https://github.com/jxx123/simglucose",
    description: "A Python-based Type 1 Diabetes simulator (Padova/UVa T1D simulator) compatible with OpenAI Gym. Used by researchers to train and test reinforcement learning agents for artificial pancreas controllers.",
    stars: 343,
    forks: 145,
    language: "Python",
    category: "Research & AI",
    tags: ["simulation", "reinforcement learning", "AI", "Python", "research"]
  },
  {
    name: "vurhd2/Glucose360",
    displayName: "Glucose360 — CGM Data Analysis Platform",
    url: "https://github.com/vurhd2/Glucose360",
    description: "Open-source Python package and web app for comprehensive CGM data analysis. Calculates glycemic variability metrics, time-in-range, and event-based analysis (meals, exercise). Published in a peer-reviewed paper.",
    stars: 120,
    forks: 28,
    language: "Python",
    category: "Research & AI",
    tags: ["CGM", "data analysis", "Python", "glycemic variability", "research"]
  },
  {
    name: "IrinaStatsLab/GlucoBench",
    displayName: "GlucoBench — CGM Dataset & Prediction Benchmarks",
    url: "https://github.com/IrinaStatsLab/GlucoBench",
    description: "Official implementation of the 'GlucoBench' paper — a curated collection of real-world CGM datasets with glucose prediction benchmarks for deep learning researchers.",
    stars: 38,
    forks: 18,
    language: "Jupyter Notebook",
    category: "Research & AI",
    tags: ["deep learning", "CGM", "datasets", "prediction", "research"]
  },
  {
    name: "DigitalBiomarkerDiscoveryPipeline/cgmquantify",
    displayName: "cgmquantify — Glucose Variability Metrics",
    url: "https://github.com/DigitalBiomarkerDiscoveryPipeline/cgmquantify",
    description: "Python library that calculates 25+ clinical glucose variability metrics from CGM data, as defined in published clinical literature. Includes visualisation tools.",
    stars: 22,
    forks: 14,
    language: "Python",
    category: "Research & AI",
    tags: ["metrics", "variability", "CGM", "Python", "clinical"]
  },
  {
    name: "Faltenreich/Diaguard",
    displayName: "Diaguard — Android Diabetes Diary",
    url: "https://github.com/Faltenreich/Diaguard",
    description: "A fully open-source Android app for diabetics to log blood glucose, HbA1c, insulin, carbs, and activities. Clean, privacy-first, with charts and export. Available on F-Droid.",
    stars: 580,
    forks: 190,
    language: "Java / Kotlin",
    category: "Mobile Apps",
    tags: ["Android", "logbook", "open source", "privacy", "Type 1"]
  },
  {
    name: "Glucosio/glucosio-android",
    displayName: "Glucosio Android",
    url: "https://github.com/Glucosio/glucosio-android",
    description: "Open-source Android app for blood glucose tracking and diabetes management. Supports A1C calculation, data export, and research data anonymisation.",
    stars: 430,
    forks: 165,
    language: "Java",
    category: "Mobile Apps",
    tags: ["Android", "glucose tracking", "A1C", "open source"]
  },
  {
    name: "lumose-health/GlycemicGPT",
    displayName: "GlycemicGPT — AI Diabetes Assistant",
    url: "https://github.com/lumose-health/GlycemicGPT",
    description: "\"Because no one should manage diabetes alone\" — An open-source LLM-powered assistant for diabetes management, combining glucose data with AI guidance for personalised insights.",
    stars: 310,
    forks: 52,
    language: "Python",
    category: "AI & LLM",
    tags: ["AI", "LLM", "GPT", "diabetes assistant", "insulin pump"]
  },
  {
    name: "rpimaster/DexMate",
    displayName: "DexMate — Open-Source Dexcom Desktop App",
    url: "https://github.com/rpimaster/DexMate",
    description: "Free and open-source desktop app for Dexcom CGM users with real-time notifications, trend arrows, and Nightscout integration. Works with Dexcom G6 and G7.",
    stars: 85,
    forks: 22,
    language: "HTML / JavaScript",
    category: "CGM & Monitoring",
    tags: ["Dexcom", "desktop", "notifications", "G6", "G7"]
  },
  {
    name: "PTST/LibreView-HomeAssistant",
    displayName: "LibreView Home Assistant Integration",
    url: "https://github.com/PTST/LibreView-HomeAssistant",
    description: "Integrate your FreeStyle Libre CGM sensor data directly into Home Assistant for custom dashboards, automations, and alerts.",
    stars: 38,
    forks: 12,
    language: "Python",
    category: "CGM & Monitoring",
    tags: ["FreeStyle Libre", "Home Assistant", "automation", "smart home"]
  },
  {
    name: "jwoglom/pumpX2",
    displayName: "pumpX2 — Tandem Insulin Pump Bluetooth Library",
    url: "https://github.com/jwoglom/pumpX2",
    description: "Reverse-engineered Java library implementing the Bluetooth protocol for Tandem t:slim X2 and Mobi insulin pumps — enabling custom integrations and data access.",
    stars: 140,
    forks: 45,
    language: "Java",
    category: "Insulin Pumps",
    tags: ["insulin pump", "Tandem", "Bluetooth", "reverse engineering"]
  },
  {
    name: "winemug/OmniCore",
    displayName: "OmniCore — Control Omnipod from Android",
    url: "https://github.com/winemug/OmniCore",
    description: "Open-source Android app to control the Insulet Omnipod insulin pump directly from your phone — with looping capabilities and Nightscout integration.",
    stars: 620,
    forks: 230,
    language: "C#",
    category: "Insulin Pumps",
    tags: ["Omnipod", "Android", "closed-loop", "Type 1"]
  },
  {
    name: "johnmartinsson/blood-glucose-prediction",
    displayName: "Blood Glucose Prediction (LSTM / Deep Learning)",
    url: "https://github.com/johnmartinsson/blood-glucose-prediction",
    description: "Research implementation of blood glucose prediction using Long Short-Term Memory (LSTM) recurrent neural networks on real CGM data.",
    stars: 280,
    forks: 130,
    language: "Python",
    category: "Research & AI",
    tags: ["LSTM", "deep learning", "prediction", "CGM", "research"]
  },
  {
    name: "Blood-Glucose-Control/rl-insulin-pump",
    displayName: "RL Insulin Pump — Reinforcement Learning Controller",
    url: "https://github.com/Blood-Glucose-Control/rl-insulin-pump",
    description: "Reinforcement learning agents for automated insulin dosing in the simglucose/Padova T1D simulator. Research-grade closed-loop control for artificial pancreas.",
    stars: 95,
    forks: 38,
    language: "Python",
    category: "Research & AI",
    tags: ["reinforcement learning", "insulin", "artificial pancreas", "simulation"]
  },
  {
    name: "dabetai-org/mobile-app",
    displayName: "DaBetai — AI-Powered Diabetes Mobile App",
    url: "https://github.com/dabetai-org/mobile-app",
    description: "Cross-platform React Native / Expo mobile app for diabetes patients to monitor glucose, log habits, and receive AI-powered complication risk alerts.",
    stars: 67,
    forks: 18,
    language: "TypeScript (React Native)",
    category: "Mobile Apps",
    tags: ["React Native", "mobile", "AI", "risk alerts", "glucose tracking"]
  },
  {
    name: "ChiefInnovator/bloodsugarcalculator",
    displayName: "Blood Sugar & A1C Calculator (Web Tool)",
    url: "https://github.com/ChiefInnovator/bloodsugarcalculator",
    description: "Free web-based tool for converting A1C to estimated Average Glucose (eAG) and vice versa, with personalised health tips.",
    stars: 45,
    forks: 20,
    language: "JavaScript",
    category: "Tools & Utilities",
    tags: ["A1C", "calculator", "eAG", "web tool"]
  },
  {
    name: "SpikeApp/Spike",
    displayName: "Spike — Get the Most from Your CGM",
    url: "https://github.com/SpikeApp/Spike",
    description: "Open-source iOS app that unlocks the full potential of CGM transmitters (Dexcom, Libre, MiaoMiao) with custom alarms, Apple Watch support, Nightscout, and IFTTT integrations.",
    stars: 890,
    forks: 310,
    language: "ActionScript / Swift",
    category: "Mobile Apps",
    tags: ["iOS", "CGM", "Dexcom", "Libre", "Apple Watch"]
  },
];

const CATEGORIES = ["All", "CGM & Monitoring", "Artificial Pancreas", "Mobile Apps", "Research & AI", "Insulin Pumps", "AI & LLM", "Tools & Utilities"];

const CAT_ICONS = {
  "CGM & Monitoring": Activity,
  "Artificial Pancreas": Cpu,
  "Mobile Apps": Globe,
  "Research & AI": FlaskConical,
  "Insulin Pumps": Zap,
  "AI & LLM": Brain,
  "Tools & Utilities": Code,
};

const CAT_COLORS = {
  "CGM & Monitoring": "bg-blue-50 text-blue-700 border-blue-200",
  "Artificial Pancreas": "bg-violet-50 text-violet-700 border-violet-200",
  "Mobile Apps": "bg-green-50 text-green-700 border-green-200",
  "Research & AI": "bg-amber-50 text-amber-700 border-amber-200",
  "Insulin Pumps": "bg-orange-50 text-orange-700 border-orange-200",
  "AI & LLM": "bg-purple-50 text-purple-700 border-purple-200",
  "Tools & Utilities": "bg-teal-50 text-teal-700 border-teal-200",
};

const LANG_COLORS = {
  Python: "bg-blue-100 text-blue-800",
  JavaScript: "bg-yellow-100 text-yellow-800",
  TypeScript: "bg-blue-100 text-blue-900",
  Swift: "bg-orange-100 text-orange-800",
  Java: "bg-red-100 text-red-800",
  "Java / Kotlin": "bg-red-100 text-red-800",
  "C#": "bg-green-100 text-green-800",
  "Jupyter Notebook": "bg-orange-50 text-orange-700",
  "HTML / JavaScript": "bg-yellow-50 text-yellow-700",
};

export default function OpenSource() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = PROJECTS.filter(p => {
    if (category !== "All" && p.category !== category) return false;
    const q = search.toLowerCase();
    if (q && !p.displayName.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q) && !p.tags.some(t => t.toLowerCase().includes(q)) && !p.language.toLowerCase().includes(q)) return false;
    return true;
  });

  const totalStars = PROJECTS.reduce((s, p) => s + p.stars, 0);

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950">
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 bg-blue-200/20 pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-4 flex items-center justify-between sticky top-0 z-30 bg-blue-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="w-px h-5 bg-blue-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-gray-900 dark:text-white" />
            <span className="font-heading font-bold text-base text-blue-900 dark:text-white">Open Source Diabetes Projects</span>
          </div>
        </div>
        <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{filtered.length} projects</span>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mission strip */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-4 mb-8 flex items-center gap-3">
          <Github className="w-5 h-5 text-gray-300 flex-shrink-0" />
          <p className="text-sm text-gray-300">
            <strong className="text-white">{PROJECTS.length} open-source projects · {totalStars.toLocaleString()}+ combined GitHub stars.</strong>{" "}
            From DIY artificial pancreas systems used by real patients, to AI/ML research tools. All MIT or open licensed. All free.
          </p>
        </div>

        {/* Filters */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, languages, tags…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => {
            const Icon = CAT_ICONS[cat] || Code;
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
                <Icon className="w-3 h-3" />{cat}
                <span className={`text-xs rounded-full px-1.5 font-semibold ${category === cat ? "bg-blue-500 text-white" : "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"}`}>
                  {cat === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 p-5 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20 transition-all"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${CAT_COLORS[project.category] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
                  {project.category}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5" />
              </div>

              {/* Name */}
              <div className="flex items-center gap-2 mb-2">
                <Github className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {project.displayName}
                </h3>
              </div>

              <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mb-3 truncate">{project.name}</p>

              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-4">
                {project.description}
              </p>

              {/* Stats row */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-blue-50 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />{project.stars.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <GitFork className="w-3 h-3" />{project.forks}
                  </span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LANG_COLORS[project.language] || "bg-gray-100 text-gray-600"}`}>
                  {project.language}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <Github className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No projects found</p>
          </div>
        )}
      </div>
    </div>
  );
}