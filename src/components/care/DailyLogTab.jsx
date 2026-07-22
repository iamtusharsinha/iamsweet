import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Flame, Droplets, Dumbbell, Moon, UtensilsCrossed, Smile } from "lucide-react";
import MealLogModal from "@/components/care/MealLogModal";

const MOOD_DISPLAY = {
  amazing: { emoji: "🤩", label: "Amazing", color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20" },
  great: { emoji: "😄", label: "Great", color: "text-green-600 bg-green-50 dark:bg-green-900/20" },
  good: { emoji: "🙂", label: "Good", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
  okay: { emoji: "😐", label: "Okay", color: "text-gray-600 bg-gray-50 dark:bg-gray-800" },
  low: { emoji: "😔", label: "Low", color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20" },
  rough: { emoji: "😣", label: "Rough", color: "text-red-600 bg-red-50 dark:bg-red-900/20" },
};

const MEAL_EMOJI = { breakfast: "🌅", lunch: "☀️", dinner: "🌙", snack: "🍎" };

export default function DailyLogTab({ user, dailyLogs, onUpdate }) {
  const [showMealModal, setShowMealModal] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const todayLog = dailyLogs.find(l => l.date === today);

  // Recent 7 days
  const recentLogs = dailyLogs.slice(0, 7);

  const totalCals = todayLog?.meals?.reduce((sum, m) => sum + (m.estimated_calories || 0), 0) || 0;

  if (!user) {
    return (
      <div className="text-center py-16">
        <Smile className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="font-semibold text-gray-500 dark:text-gray-400">Sign in to log meals & mood</p>
        <p className="text-sm text-gray-400 mt-1">Build your health pattern data over time</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Today header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Today</p>
          <p className="font-bold text-gray-900 dark:text-white text-sm">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
        </div>
        <button
          onClick={() => setShowMealModal(true)}
          className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Log meal / mood
        </button>
      </div>

      {/* Today's mood */}
      {todayLog?.mood ? (
        <div className={`rounded-2xl p-4 flex items-center gap-3 ${MOOD_DISPLAY[todayLog.mood]?.color}`}>
          <span className="text-3xl">{MOOD_DISPLAY[todayLog.mood]?.emoji}</span>
          <div>
            <p className="font-bold text-sm">Feeling {MOOD_DISPLAY[todayLog.mood]?.label}</p>
            {todayLog.mood_note && <p className="text-xs mt-0.5 opacity-80">{todayLog.mood_note}</p>}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-400">No mood logged today</p>
        </div>
      )}

      {/* Today's calorie summary */}
      {totalCals > 0 && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0">
            <Flame className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold uppercase tracking-wide">Estimated Today</p>
            <p className="text-xl font-black text-orange-700 dark:text-orange-300">{totalCals} <span className="text-sm font-medium">kcal</span></p>
          </div>
          <p className="text-xs text-orange-500/70 ml-auto">AI estimate</p>
        </div>
      )}

      {/* Today's meals */}
      {todayLog?.meals?.length > 0 ? (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Today's Meals</p>
          {todayLog.meals.map((meal, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden">
              <div className="flex gap-3 p-4">
                {meal.image_url ? (
                  <img src={meal.image_url} alt="meal" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{MEAL_EMOJI[meal.meal_type] || "🍽️"}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 capitalize">
                      {MEAL_EMOJI[meal.meal_type]} {meal.meal_type}
                    </span>
                    {meal.estimated_calories && (
                      <span className="text-xs text-orange-600 font-bold">🔥 {meal.estimated_calories} kcal</span>
                    )}
                  </div>
                  {meal.description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 truncate">{meal.description}</p>}
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(meal.logged_at).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center">
          <UtensilsCrossed className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No meals logged yet today</p>
          <button onClick={() => setShowMealModal(true)}
            className="mt-3 text-sm text-green-600 font-semibold hover:underline">
            + Log your first meal
          </button>
        </div>
      )}

      {/* Recent mood history */}
      {recentLogs.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent Days</p>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {recentLogs.map((log, i) => {
              const moodInfo = MOOD_DISPLAY[log.mood];
              const mealCount = log.meals?.length || 0;
              const cal = log.meals?.reduce((sum, m) => sum + (m.estimated_calories || 0), 0) || 0;
              return (
                <motion.div key={log.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                  className="flex-shrink-0 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-3 w-24 text-center">
                  <p className="text-xl mb-1">{moodInfo?.emoji || "—"}</p>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{new Date(log.date).toLocaleDateString("en", { weekday: "short" })}</p>
                  <p className="text-[10px] text-gray-400">{new Date(log.date).toLocaleDateString("en", { month: "short", day: "numeric" })}</p>
                  {mealCount > 0 && <p className="text-[10px] text-green-600 font-semibold mt-1">{mealCount} meal{mealCount > 1 ? "s" : ""}</p>}
                  {cal > 0 && <p className="text-[10px] text-orange-500 font-semibold">{cal} kcal</p>}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {showMealModal && (
        <MealLogModal
          user={user}
          existingLog={todayLog}
          onClose={() => setShowMealModal(false)}
          onSaved={onUpdate}
        />
      )}
    </div>
  );
}