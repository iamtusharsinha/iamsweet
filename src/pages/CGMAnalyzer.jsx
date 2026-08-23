import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Upload, Activity, AlertCircle, CheckCircle2,
  Download, RotateCcw, TrendingUp, TrendingDown, Minus, X
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Area, AreaChart
} from "recharts";

// ── CSV parsers ──────────────────────────────────────────────────────────────
function parseDexcomCSV(text) {
  const lines = text.split("\n");
  const readings = [];
  let headerIdx = -1;
  let tsCol = -1, bgCol = -1;

  for (let i = 0; i < lines.length; i++) {
    const row = lines[i].split(",").map(c => c.trim().replace(/"/g, ""));
    if (headerIdx === -1) {
      const lower = row.map(c => c.toLowerCase());
      const tsIdx = lower.findIndex(c => c.includes("timestamp") || c.includes("time"));
      const bgIdx = lower.findIndex(c => c.includes("glucose value") || c.includes("glucose") || c.includes("mg/dl") || c.includes("mmol/l"));
      if (tsIdx !== -1 && bgIdx !== -1) {
        headerIdx = i; tsCol = tsIdx; bgCol = bgIdx;
      }
    } else {
      if (row.length <= Math.max(tsCol, bgCol)) continue;
      const bgRaw = row[bgCol];
      const tsRaw = row[tsCol];
      if (!bgRaw || bgRaw === "" || isNaN(Number(bgRaw))) continue;
      const bg = parseFloat(bgRaw);
      if (bg < 20 || bg > 600) continue;
      readings.push({ ts: tsRaw, bg });
    }
  }
  return readings;
}

function parseLibreCSV(text) {
  const lines = text.split("\n");
  const readings = [];
  let headerIdx = -1;
  let tsCol = -1, bgCol = -1;

  for (let i = 0; i < lines.length; i++) {
    const row = lines[i].split(",").map(c => c.trim().replace(/"/g, ""));
    if (headerIdx === -1) {
      const lower = row.map(c => c.toLowerCase());
      const tsIdx = lower.findIndex(c => c.includes("time"));
      const bgIdx = lower.findIndex(c =>
        c.includes("historic glucose") || c.includes("scan glucose") ||
        c.includes("glucose value") || c.includes("mmol/l") || c.includes("mg/dl")
      );
      if (tsIdx !== -1 && bgIdx !== -1) {
        headerIdx = i; tsCol = tsIdx; bgCol = bgIdx;
      }
    } else {
      if (row.length <= Math.max(tsCol, bgCol)) continue;
      let bg = parseFloat(row[bgCol]);
      if (isNaN(bg)) continue;
      // Convert mmol/L to mg/dL if needed
      if (bg < 30) bg = bg * 18.0182;
      if (bg < 20 || bg > 600) continue;
      readings.push({ ts: row[tsCol], bg });
    }
  }
  return readings;
}

function autoParseCSV(text) {
  // Try Libre first (tends to have more specific headers), then Dexcom
  const libre = parseLibreCSV(text);
  if (libre.length > 5) return libre;
  const dex = parseDexcomCSV(text);
  if (dex.length > 5) return dex;
  // Fallback: generic 2-column parse
  const lines = text.split("\n").filter(l => l.trim());
  const readings = [];
  for (const line of lines.slice(1)) {
    const parts = line.split(",").map(c => c.trim().replace(/"/g, ""));
    for (const p of parts) {
      const n = parseFloat(p);
      if (n >= 40 && n <= 500) { readings.push({ ts: parts[0] || "", bg: n }); break; }
      const mmol = n;
      if (mmol >= 2 && mmol <= 28) { readings.push({ ts: parts[0] || "", bg: mmol * 18.0182 }); break; }
    }
  }
  return readings;
}

function computeStats(readings) {
  if (!readings.length) return null;
  const bgs = readings.map(r => r.bg);
  const avg = bgs.reduce((a, b) => a + b, 0) / bgs.length;
  const tir = bgs.filter(b => b >= 70 && b <= 180).length / bgs.length * 100;
  const tbr = bgs.filter(b => b < 70).length / bgs.length * 100;
  const tar = bgs.filter(b => b > 180).length / bgs.length * 100;
  const std = Math.sqrt(bgs.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / bgs.length);
  const cv = (std / avg) * 100;
  const ea1c = (avg + 46.7) / 28.7;
  return { avg, tir, tbr, tar, cv, ea1c, std, count: bgs.length };
}

// Build 24h aggregated chart data
function build24hData(readings) {
  const hourBuckets = Array.from({ length: 24 }, (_, h) => ({ hour: h, values: [] }));
  readings.forEach(r => {
    const parts = r.ts.split(/[T\s]/);
    const timePart = parts[1] || parts[0] || "";
    const hour = parseInt(timePart.split(":")[0]);
    if (!isNaN(hour) && hour >= 0 && hour < 24) hourBuckets[hour].values.push(r.bg);
  });
  return hourBuckets.map(b => ({
    hour: `${String(b.hour).padStart(2, "0")}:00`,
    avg: b.values.length ? Math.round(b.values.reduce((a, c) => a + c, 0) / b.values.length) : null,
    min: b.values.length ? Math.round(Math.min(...b.values)) : null,
    max: b.values.length ? Math.round(Math.max(...b.values)) : null,
  })).filter(d => d.avg !== null);
}

const STAT_CARDS = [
  { key: "tir", label: "Time in Range", sub: "70–180 mg/dL", suffix: "%", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800", icon: CheckCircle2, iconColor: "text-emerald-500" },
  { key: "tbr", label: "Time Below Range", sub: "<70 mg/dL (hypo)", suffix: "%", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800", icon: TrendingDown, iconColor: "text-blue-500" },
  { key: "tar", label: "Time Above Range", sub: ">180 mg/dL (hyper)", suffix: "%", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800", icon: TrendingUp, iconColor: "text-amber-500" },
  { key: "avg", label: "Average Glucose", sub: "mg/dL", suffix: "", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800", icon: Minus, iconColor: "text-violet-500" },
  { key: "ea1c", label: "Estimated A1C", sub: "eA1C formula", suffix: "%", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800", icon: Activity, iconColor: "text-rose-500" },
  { key: "cv", label: "Glucose Variability", sub: "Coefficient of Variation", suffix: "%", color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800", icon: Activity, iconColor: "text-teal-500" },
];

export default function CGMAnalyzer() {
  const [readings, setReadings] = useState(null);
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  function processFile(file) {
    setError("");
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file exported from Dexcom Clarity, FreeStyle LibreLink, or Nightscout.");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target.result;
      const parsed = autoParseCSV(text);
      if (parsed.length < 10) {
        setError("Could not find valid glucose readings. Make sure you're uploading a glucose CSV export (Dexcom Clarity / FreeStyle Libre / Nightscout).");
        return;
      }
      setReadings(parsed);
      setStats(computeStats(parsed));
      setChartData(build24hData(parsed));
    };
    reader.readAsText(file);
  }

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, []);

  function reset() {
    setReadings(null); setStats(null); setChartData([]); setFileName(""); setError("");
  }

  function downloadSummary() {
    if (!stats) return;
    const lines = [
      "=== CGM DATA ANALYSIS SUMMARY ===",
      `File: ${fileName}`,
      `Readings analyzed: ${stats.count}`,
      "",
      `Time in Range (70-180 mg/dL):  ${stats.tir.toFixed(1)}%`,
      `Time Below Range (<70 mg/dL):  ${stats.tbr.toFixed(1)}%`,
      `Time Above Range (>180 mg/dL): ${stats.tar.toFixed(1)}%`,
      "",
      `Average Glucose:               ${stats.avg.toFixed(0)} mg/dL`,
      `Estimated A1C (eA1C):          ${stats.ea1c.toFixed(1)}%`,
      `Standard Deviation:            ${stats.std.toFixed(1)} mg/dL`,
      `Coefficient of Variation:      ${stats.cv.toFixed(1)}%`,
      "",
      "TIME IN RANGE TARGET (IDF/ADA):",
      "  TIR >70% is the recommended clinical target.",
      "  CV <36% indicates stable glucose control.",
      "",
      "⚠️ For educational purposes only. Consult your diabetes care team.",
      "Generated by iamsweet.com",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "cgm-analysis.txt"; a.click();
    URL.revokeObjectURL(url);
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-xl text-xs">
          <p className="font-bold text-gray-900 dark:text-white mb-1">{label}</p>
          {payload.map(p => (
            <p key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value} mg/dL</strong></p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#f5f7ff] dark:bg-[#0a0d1a] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900 dark:text-white leading-none">CGM Analyzer</p>
                <p className="text-xs text-gray-400">Dexcom · Libre · Nightscout</p>
              </div>
            </div>
          </div>
          {readings && (
            <button onClick={reset}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-500 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-xl transition-all">
              <RotateCcw className="w-3.5 h-3.5" /> New file
            </button>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-6">

        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            <strong>Educational tool only.</strong> Analyses are estimates based on your exported data. Always discuss your CGM trends with your diabetes care team. No data is uploaded — all processing happens in your browser.
          </p>
        </div>

        {!readings ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {/* Upload zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              className={`relative flex flex-col items-center justify-center gap-4 p-12 rounded-3xl border-2 border-dashed cursor-pointer transition-all ${
                dragging
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-900/10"
              }`}
            >
              <input ref={fileRef} type="file" accept=".csv" className="hidden"
                onChange={e => processFile(e.target.files[0])} />

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-400/30">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <p className="font-black text-gray-900 dark:text-white text-lg">Drop your CGM export here</p>
                <p className="text-sm text-gray-400 mt-1">or click to browse — CSV only</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Dexcom Clarity", "FreeStyle LibreLink", "Nightscout"].map(s => (
                  <span key={s} className="text-xs font-semibold bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-700 px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl mt-4">
                <X className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-rose-700 dark:text-rose-400">{error}</p>
              </div>
            )}

            {/* How to export guide */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 mt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">How to export your CGM data</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { name: "Dexcom Clarity", steps: ["Open Clarity app or web", "Reports → Export", "Download Glucose CSV"] },
                  { name: "FreeStyle LibreLink", steps: ["Open LibreLink app", "Menu → Export Data", "Export as CSV"] },
                  { name: "Nightscout", steps: ["Open your Nightscout site", "Reports → Day to Day", "Export → CSV"] },
                ].map(g => (
                  <div key={g.name} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                    <p className="text-xs font-bold text-gray-800 dark:text-white mb-2">{g.name}</p>
                    {g.steps.map((s, i) => (
                      <p key={i} className="text-[11px] text-gray-500 dark:text-gray-400 flex items-start gap-1.5 mb-1">
                        <span className="font-bold text-teal-500 flex-shrink-0">{i + 1}.</span>{s}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            {/* File badge + download */}
            <div className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{fileName}</p>
                <span className="text-xs text-gray-400">{stats.count} readings</span>
              </div>
              <button onClick={downloadSummary}
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors border border-blue-200 dark:border-blue-700 px-3 py-1.5 rounded-xl">
                <Download className="w-3.5 h-3.5" /> Download Report
              </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {STAT_CARDS.map(card => {
                const Icon = card.icon;
                const value = stats[card.key];
                const displayVal = card.key === "avg" ? Math.round(value) : value.toFixed(1);
                return (
                  <div key={card.key} className={`rounded-2xl border p-4 text-center ${card.bg}`}>
                    <Icon className={`w-5 h-5 mx-auto mb-2 ${card.iconColor}`} />
                    <p className={`text-2xl font-black ${card.color}`}>{displayVal}{card.suffix}</p>
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-0.5">{card.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{card.sub}</p>
                  </div>
                );
              })}
            </div>

            {/* TIR visual bar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Time Distribution</p>
              <div className="flex rounded-xl overflow-hidden h-8 gap-0.5">
                <div style={{ width: `${stats.tbr}%` }} className="bg-blue-400 flex items-center justify-center transition-all">
                  {stats.tbr > 5 && <span className="text-white text-[10px] font-bold">{stats.tbr.toFixed(0)}%</span>}
                </div>
                <div style={{ width: `${stats.tir}%` }} className="bg-emerald-500 flex items-center justify-center transition-all">
                  {stats.tir > 5 && <span className="text-white text-xs font-bold">{stats.tir.toFixed(0)}%</span>}
                </div>
                <div style={{ width: `${stats.tar}%` }} className="bg-amber-400 flex items-center justify-center transition-all">
                  {stats.tar > 5 && <span className="text-white text-[10px] font-bold">{stats.tar.toFixed(0)}%</span>}
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <span className="text-[10px] flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" /> Below</span>
                <span className="text-[10px] flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> In Range</span>
                <span className="text-[10px] flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Above</span>
              </div>
            </div>

            {/* 24h trend chart */}
            {chartData.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">24-Hour Average Glucose Pattern</p>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
                    <defs>
                      <linearGradient id="cgmGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                    <YAxis domain={[40, 320]} tick={{ fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={70} stroke="#3b82f6" strokeDasharray="4 2" strokeWidth={1.5} label={{ value: "70", position: "right", fontSize: 10, fill: "#3b82f6" }} />
                    <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="4 2" strokeWidth={1.5} label={{ value: "180", position: "right", fontSize: 10, fill: "#f59e0b" }} />
                    <Area type="monotone" dataKey="avg" name="Avg" stroke="#14b8a6" strokeWidth={2.5} fill="url(#cgmGrad)" dot={false} />
                    <Line type="monotone" dataKey="min" name="Min" stroke="#3b82f6" strokeWidth={1.5} dot={false} strokeDasharray="3 2" />
                    <Line type="monotone" dataKey="max" name="Max" stroke="#f59e0b" strokeWidth={1.5} dot={false} strokeDasharray="3 2" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* ADA targets reference */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">ADA / IDF Targets</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-600 dark:text-gray-400">
                <div><span className="font-bold text-emerald-600">TIR &gt;70%</span> — ideal</div>
                <div><span className="font-bold text-blue-600">TBR &lt;4%</span> — safe</div>
                <div><span className="font-bold text-amber-600">TAR &lt;25%</span> — target</div>
                <div><span className="font-bold text-violet-600">CV &lt;36%</span> — stable</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link to="/bolus-calculator" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm text-center hover:bg-blue-700 transition-all">Bolus Calculator 💉</Link>
              <Link to="/chat" className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl text-sm text-center hover:bg-indigo-700 transition-all">Ask SWEETY 🤖</Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}