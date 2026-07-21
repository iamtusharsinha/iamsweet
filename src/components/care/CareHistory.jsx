import React from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";

const MOOD_EMOJI = { great: "😄", good: "🙂", okay: "😐", low: "😔", rough: "😣" };

function BSIndicator({ value, unit }) {
  if (!value) return <span className="text-gray-300 text-xs">—</span>;
  const isHigh = unit === "mg/dL" ? value > 180 : value > 10;
  const isLow = unit === "mg/dL" ? value < 70 : value < 3.9;
  return (
    <div className={`flex items-center gap-1 text-sm font-bold ${isHigh ? "text-orange-500" : isLow ? "text-red-500" : "text-green-600"}`}>
      {isHigh ? <TrendingUp className="w-3.5 h-3.5" /> : isLow ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
      {value} <span className="text-xs font-normal text-gray-400">{unit}</span>
    </div>
  );
}

export default function CareHistory({ logs }) {
  if (!logs.length) return (
    <div className="text-center py-10 text-gray-400">
      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-40" />
      <p className="text-sm">No check-ins yet. Complete your first one above!</p>
    </div>
  );

  return (
    <div className="space-y-3">
      {logs.slice(0, 14).map((log, i) => (
        <motion.div key={log.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
          className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{MOOD_EMOJI[log.mood] || "📋"}</span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{new Date(log.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
                <p className="text-xs text-gray-400 capitalize">{log.mood || "—"} · {log.energy || "—"} energy</p>
              </div>
            </div>
            <BSIndicator value={log.blood_sugar} unit={log.blood_sugar_unit || "mg/dL"} />
          </div>
          {log.ai_summary && (
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-2">{log.ai_summary}</p>
          )}
          {log.symptoms?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {log.symptoms.map(s => <span key={s} className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">{s}</span>)}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}