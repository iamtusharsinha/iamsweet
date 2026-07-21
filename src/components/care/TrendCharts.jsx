import React, { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend
} from "recharts";
import { TrendingUp, Zap } from "lucide-react";

const ENERGY_MAP = { high: 3, medium: 2, low: 1 };
const ENERGY_LABEL = { 3: "High", 2: "Medium", 1: "Low" };

const RANGES = [
  { label: "7 days", days: 7 },
  { label: "14 days", days: 14 },
  { label: "30 days", days: 30 },
];

function BsTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  const status = val > 180 ? { text: "High", color: "text-orange-500" } : val < 70 ? { text: "Low", color: "text-red-500" } : { text: "In Range", color: "text-green-600" };
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-gray-700 dark:text-gray-300 mb-0.5">{label}</p>
      <p className="font-bold text-gray-900 dark:text-white">{val} mg/dL</p>
      <p className={`font-semibold ${status.color}`}>{status.text}</p>
    </div>
  );
}

function EnergyTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-gray-700 dark:text-gray-300 mb-0.5">{label}</p>
      <p className="font-bold text-gray-900 dark:text-white">{ENERGY_LABEL[payload[0]?.value] || "—"}</p>
    </div>
  );
}

export default function TrendCharts({ logs }) {
  const [range, setRange] = useState(30);

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - range);

  const filtered = logs
    .filter(l => new Date(l.date) >= cutoff)
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const bsData = filtered
    .filter(l => l.blood_sugar)
    .map(l => ({
      date: new Date(l.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: l.blood_sugar,
    }));

  const energyData = filtered
    .filter(l => l.energy)
    .map(l => ({
      date: new Date(l.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: ENERGY_MAP[l.energy] ?? null,
    }));

  const avgBs = bsData.length
    ? Math.round(bsData.reduce((s, d) => s + d.value, 0) / bsData.length)
    : null;
  const inRangePct = bsData.length
    ? Math.round((bsData.filter(d => d.value >= 70 && d.value <= 180).length / bsData.length) * 100)
    : null;

  return (
    <div className="space-y-5">
      {/* Range selector */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Trends</p>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {RANGES.map(r => (
            <button
              key={r.days}
              onClick={() => setRange(r.days)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                range === r.days
                  ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Blood Sugar Chart */}
      <div className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" /> Blood Sugar (mg/dL)
          </p>
          {avgBs && (
            <div className="flex items-center gap-3 text-xs">
              <span className="text-gray-400">Avg: <strong className="text-gray-700 dark:text-gray-200">{avgBs}</strong></span>
              <span className={`font-semibold px-2 py-0.5 rounded-full ${inRangePct >= 70 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                {inRangePct}% in range
              </span>
            </div>
          )}
        </div>

        {bsData.length < 2 ? (
          <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
            Log at least 2 blood sugar readings to see your trend
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={bsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.06} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }} tickLine={false} axisLine={false} domain={["auto", "auto"]} />
              <Tooltip content={<BsTooltip />} />
              <ReferenceLine y={180} stroke="#f97316" strokeDasharray="4 3" strokeOpacity={0.6} label={{ value: "High", position: "right", fontSize: 9, fill: "#f97316" }} />
              <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="4 3" strokeOpacity={0.6} label={{ value: "Low", position: "right", fontSize: 9, fill: "#ef4444" }} />
              <Line
                type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5}
                dot={{ r: 3.5, fill: "#3b82f6", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#1d4ed8" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-orange-400 inline-block rounded" /> High &gt;180</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-400 inline-block rounded" /> Low &lt;70</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-500 inline-block rounded" /> Your readings</span>
        </div>
      </div>

      {/* Energy Chart */}
      <div className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl p-5">
        <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-yellow-500" /> Energy Levels
        </p>

        {energyData.length < 2 ? (
          <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
            Log at least 2 energy readings to see your trend
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={energyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.06} vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 3]} ticks={[1, 2, 3]} tickFormatter={v => ENERGY_LABEL[v] || ""} tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }} tickLine={false} axisLine={false} />
              <Tooltip content={<EnergyTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}
                fill="#facc15"
                label={false}
              />
            </BarChart>
          </ResponsiveContainer>
        )}

        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
          <span>1 = Low</span><span>2 = Medium</span><span>3 = High</span>
        </div>
      </div>
    </div>
  );
}