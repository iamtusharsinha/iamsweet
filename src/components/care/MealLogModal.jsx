import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Loader2, Sparkles, Droplets, Dumbbell, Moon, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

const MEAL_TYPES = [
  { key: "breakfast", label: "Breakfast", emoji: "🌅" },
  { key: "lunch", label: "Lunch", emoji: "☀️" },
  { key: "dinner", label: "Dinner", emoji: "🌙" },
  { key: "snack", label: "Snack", emoji: "🍎" },
];

const MOODS = [
  { key: "amazing", emoji: "🤩", label: "Amazing" },
  { key: "great", emoji: "😄", label: "Great" },
  { key: "good", emoji: "🙂", label: "Good" },
  { key: "okay", emoji: "😐", label: "Okay" },
  { key: "low", emoji: "😔", label: "Low" },
  { key: "rough", emoji: "😣", label: "Rough" },
];

export default function MealLogModal({ user, onClose, onSaved, existingLog }) {
  const [step, setStep] = useState(0); // 0=mood, 1=meal, 2=habits, 3=ai summary
  const [mood, setMood] = useState(existingLog?.mood || "");
  const [moodNote, setMoodNote] = useState(existingLog?.mood_note || "");
  const [mealType, setMealType] = useState("breakfast");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [estimatingCal, setEstimatingCal] = useState(false);
  const [estimatedCal, setEstimatedCal] = useState(null);
  const [error, setError] = useState("");

  // Habit fields
  const [waterGlasses, setWaterGlasses] = useState(existingLog?.water_glasses ?? "");
  const [exerciseMinutes, setExerciseMinutes] = useState(existingLog?.exercise_minutes ?? "");
  const [sleepHours, setSleepHours] = useState(existingLog?.sleep_hours ?? "");

  // AI pattern note
  const [aiPatternNote, setAiPatternNote] = useState("");

  const fileRef = useRef();

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setEstimatedCal(null);
  }

  async function estimateCalories() {
    if (!imageFile && !description) return;
    setEstimatingCal(true);
    try {
      let imageUrl = null;
      if (imageFile) {
        const uploaded = await base44.integrations.Core.UploadFile({ file: imageFile });
        imageUrl = uploaded.file_url;
      }
      const prompt = imageUrl
        ? `You are a nutrition expert. Analyze this meal image and the description "${description || "unknown meal"}". Estimate total calories and briefly describe the meal content. Respond in JSON: {"calories": number, "meal_description": "string", "confidence": "low|medium|high"}`
        : `Estimate calories for this meal: "${description}". Respond in JSON: {"calories": number, "meal_description": "string", "confidence": "low|medium|high"}`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        file_urls: imageUrl ? [imageUrl] : undefined,
        response_json_schema: {
          type: "object",
          properties: {
            calories: { type: "number" },
            meal_description: { type: "string" },
            confidence: { type: "string" }
          }
        }
      });
      setEstimatedCal(result);
      if (result.meal_description && !description) setDescription(result.meal_description);
    } catch {
      setError("Couldn't estimate calories. You can save without it.");
    } finally {
      setEstimatingCal(false);
    }
  }

  async function saveAll() {
    setSaving(true);
    setError("");
    try {
      let imageUrl = null;
      if (imageFile) {
        const uploaded = await base44.integrations.Core.UploadFile({ file: imageFile });
        imageUrl = uploaded.file_url;
      }

      const today = new Date().toISOString().split("T")[0];
      const newMealEntry = {
        meal_type: mealType,
        description,
        image_url: imageUrl,
        estimated_calories: estimatedCal?.calories || null,
        logged_at: new Date().toISOString(),
      };

      const allMeals = [...(existingLog?.meals || []), ...(description ? [newMealEntry] : [])];
      const totalCal = allMeals.reduce((sum, m) => sum + (m.estimated_calories || 0), 0);

      const logData = {
        mood: mood || existingLog?.mood,
        mood_note: moodNote || existingLog?.mood_note,
        meals: allMeals,
        total_calories: totalCal || undefined,
        water_glasses: waterGlasses !== "" ? parseFloat(waterGlasses) : undefined,
        exercise_minutes: exerciseMinutes !== "" ? parseFloat(exerciseMinutes) : undefined,
        sleep_hours: sleepHours !== "" ? parseFloat(sleepHours) : undefined,
      };

      // Generate AI pattern note
      const prompt = `You are a caring diabetes nutrition coach. A patient just logged their daily habits.

Meals today: ${allMeals.map(m => `${m.meal_type}: ${m.description || "unspecified"} (${m.estimated_calories || "?"}kcal)`).join("; ") || "none logged"}
Total calories: ${totalCal || "unknown"} kcal
Water: ${waterGlasses !== "" ? waterGlasses + " glasses" : "not logged"}
Exercise: ${exerciseMinutes !== "" ? exerciseMinutes + " minutes" : "not logged"}
Sleep last night: ${sleepHours !== "" ? sleepHours + " hours" : "not logged"}
Mood: ${mood || "not logged"}

Write a warm 2-3 sentence AI pattern note that: (1) acknowledges their nutrition choices today, (2) notes if water/exercise/sleep are on track for a diabetic, (3) gives one specific actionable tip. Keep it under 70 words.`;

      const patternNote = await base44.integrations.Core.InvokeLLM({ prompt });

      logData.ai_pattern_note = patternNote;

      if (existingLog) {
        await base44.entities.DailyLog.update(existingLog.id, logData);
      } else {
        await base44.entities.DailyLog.create({ user_id: user.id, date: today, ...logData });
      }

      setAiPatternNote(patternNote);
      setStep(3); // show summary
    } catch (e) {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function saveMoodOnly() {
    if (!mood) return;
    setSaving(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      if (existingLog) {
        await base44.entities.DailyLog.update(existingLog.id, { mood, mood_note: moodNote });
      } else {
        await base44.entities.DailyLog.create({ user_id: user.id, date: today, mood, mood_note: moodNote, meals: [] });
      }
      onSaved?.();
      onClose();
    } catch {
      setError("Failed to save mood.");
    } finally {
      setSaving(false);
    }
  }

  const STEP_TITLES = ["Mood 🌟", "Meal 🍽️", "Habits 💧", "Summary ✨"];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">{STEP_TITLES[step]}</h2>
              {step < 3 && <p className="text-xs text-gray-400 mt-0.5">Step {step + 1} of 3 — all optional</p>}
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Progress */}
          {step < 3 && (
            <div className="px-5 pt-3">
              <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${((step + 1) / 3) * 100}%` }} className="h-full bg-green-500 rounded-full transition-all duration-300" />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-5 py-5">

            {/* Step 0: Mood */}
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Pick your mood</p>
                  <div className="grid grid-cols-3 gap-2">
                    {MOODS.map(m => (
                      <button key={m.key} onClick={() => setMood(m.key)}
                        className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 transition-all ${mood === m.key ? "border-green-500 bg-green-50 dark:bg-green-900/30 scale-105" : "border-gray-200 dark:border-gray-700 hover:border-green-300"}`}>
                        <span className="text-3xl">{m.emoji}</span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {mood && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Add a note (optional)</p>
                    <textarea
                      value={moodNote}
                      onChange={e => setMoodNote(e.target.value)}
                      placeholder="What's contributing to how you feel?"
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Meal */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Meal type</p>
                  <div className="grid grid-cols-4 gap-2">
                    {MEAL_TYPES.map(m => (
                      <button key={m.key} onClick={() => setMealType(m.key)}
                        className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 text-xs font-medium transition-all ${mealType === m.key ? "border-green-500 bg-green-50 dark:bg-green-900/30" : "border-gray-200 dark:border-gray-700 hover:border-green-300"}`}>
                        <span className="text-xl">{m.emoji}</span>
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Photo (optional)</p>
                  <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageChange} />
                  {imagePreview ? (
                    <div className="relative rounded-2xl overflow-hidden">
                      <img src={imagePreview} alt="meal" className="w-full h-48 object-cover" />
                      <button onClick={() => { setImageFile(null); setImagePreview(null); setEstimatedCal(null); }}
                        className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                        <X className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => fileRef.current.click()}
                      className="w-full h-32 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/10 transition-all">
                      <Camera className="w-7 h-7 text-gray-300" />
                      <p className="text-sm text-gray-400">Take a photo or upload</p>
                    </button>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">What did you eat?</p>
                  <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="e.g. Brown rice, grilled chicken, broccoli"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                {(imageFile || description) && !estimatedCal && (
                  <button onClick={estimateCalories} disabled={estimatingCal}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-green-400 text-green-600 dark:text-green-400 text-sm font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all disabled:opacity-60">
                    {estimatingCal
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Estimating calories…</>
                      : <><Sparkles className="w-4 h-4" /> Estimate calories with AI</>}
                  </button>
                )}

                {estimatedCal && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-green-600 dark:text-green-400 font-semibold uppercase tracking-wide">AI Calorie Estimate</p>
                        <p className="text-2xl font-black text-green-700 dark:text-green-300">{estimatedCal.calories} <span className="text-sm font-medium">kcal</span></p>
                        <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-0.5">Confidence: {estimatedCal.confidence}</p>
                      </div>
                      <span className="text-4xl">🔥</span>
                    </div>
                  </div>
                )}

                {error && <p className="text-xs text-red-500">{error}</p>}
              </div>
            )}

            {/* Step 2: Habits — water, exercise, sleep */}
            {step === 2 && (
              <div className="space-y-5">
                <p className="text-xs text-gray-400">Log your daily habits so your AI companion can spot patterns and give better advice.</p>

                {/* Water */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    <Droplets className="w-4 h-4 text-blue-400" /> Water Glasses
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1 flex-wrap">
                      {[4, 6, 8, 10, 12].map(n => (
                        <button key={n} onClick={() => setWaterGlasses(n)}
                          className={`w-10 h-10 rounded-xl border-2 text-sm font-bold transition-all ${waterGlasses === n ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-300"}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                    <input type="number" min="0" max="20" placeholder="or type" value={waterGlasses}
                      onChange={e => setWaterGlasses(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-20 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-center text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  {waterGlasses !== "" && <p className="text-xs text-blue-500 mt-1">Goal: 8 glasses/day{waterGlasses >= 8 ? " ✅" : " — keep drinking!"}</p>}
                </div>

                {/* Exercise */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    <Dumbbell className="w-4 h-4 text-orange-400" /> Exercise Minutes
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1 flex-wrap">
                      {[15, 30, 45, 60, 90].map(n => (
                        <button key={n} onClick={() => setExerciseMinutes(n)}
                          className={`px-3 h-10 rounded-xl border-2 text-sm font-bold transition-all ${exerciseMinutes === n ? "border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-orange-300"}`}>
                          {n}m
                        </button>
                      ))}
                    </div>
                    <input type="number" min="0" max="300" placeholder="or type" value={exerciseMinutes}
                      onChange={e => setExerciseMinutes(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-20 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-center text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                  {exerciseMinutes !== "" && <p className="text-xs text-orange-500 mt-1">Goal: 30+ min/day{exerciseMinutes >= 30 ? " ✅" : " — even a walk counts!"}</p>}
                </div>

                {/* Sleep */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    <Moon className="w-4 h-4 text-indigo-400" /> Sleep Hours (last night)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1 flex-wrap">
                      {[5, 6, 7, 8, 9].map(n => (
                        <button key={n} onClick={() => setSleepHours(n)}
                          className={`w-10 h-10 rounded-xl border-2 text-sm font-bold transition-all ${sleepHours === n ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-300"}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                    <input type="number" min="0" max="14" placeholder="or type" value={sleepHours}
                      onChange={e => setSleepHours(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-20 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-center text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  </div>
                  {sleepHours !== "" && <p className="text-xs text-indigo-500 mt-1">Goal: 7–9 hours{sleepHours >= 7 && sleepHours <= 9 ? " ✅" : sleepHours < 7 ? " — poor sleep raises blood sugar!" : " — slightly above average"}</p>}
                </div>
              </div>
            )}

            {/* Step 3: AI Pattern Note Summary */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">All saved!</p>
                    <p className="text-xs text-gray-400">Your AI nutrition & habits pattern note</p>
                  </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4">
                  <p className="text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">{aiPatternNote}</p>
                </div>

                {/* Recap */}
                <div className="grid grid-cols-3 gap-2">
                  {waterGlasses !== "" && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
                      <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">{waterGlasses} glasses</p>
                      <p className="text-[10px] text-gray-400">Water</p>
                    </div>
                  )}
                  {exerciseMinutes !== "" && (
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 text-center">
                      <Dumbbell className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                      <p className="text-xs text-orange-600 dark:text-orange-400 font-bold">{exerciseMinutes} min</p>
                      <p className="text-[10px] text-gray-400">Exercise</p>
                    </div>
                  )}
                  {sleepHours !== "" && (
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center">
                      <Moon className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">{sleepHours} hrs</p>
                      <p className="text-[10px] text-gray-400">Sleep</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 pb-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex gap-3">
            {step === 0 && (
              <>
                <button onClick={saveMoodOnly} disabled={!mood || saving}
                  className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-40">
                  Save mood only
                </button>
                <button onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-semibold text-white transition-colors">
                  Log a meal →
                </button>
              </>
            )}
            {step === 1 && (
              <>
                <button onClick={() => setStep(0)} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-semibold text-white transition-colors">
                  Next: Habits →
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button onClick={saveAll} disabled={saving}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving & analyzing…</> : <><CheckCircle2 className="w-4 h-4" /> Save & Get AI Note</>}
                </button>
              </>
            )}
            {step === 3 && (
              <button onClick={() => { onSaved?.(); onClose(); }} className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-semibold text-white transition-colors">
                Done ✓
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}