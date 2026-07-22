import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Heart, Plus, Pill, Calendar, TrendingUp,
  Activity, Star, Bot, ClipboardList, Sparkles, Lock, Trash2, Settings, ChevronDown
} from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { base44 } from "@/api/base44Client";
import CheckInModal from "@/components/care/CheckInModal";
import { useLanguage } from "@/lib/LanguageContext";
import MedicationManager from "@/components/care/MedicationManager";
import CareHistory from "@/components/care/CareHistory";
import TrendCharts from "@/components/care/TrendCharts";

const TABS_KEYS = [
  { key: "dashboard", labelKey: "dashboard", icon: Activity },
  { key: "history", labelKey: "history", icon: Calendar },
  { key: "medications", labelKey: "medications", icon: Pill },
];

const TIPS = [
  "💧 Staying hydrated helps your kidneys flush out excess glucose. Aim for 8 glasses today.",
  "🚶 A 10-minute walk after meals can lower blood sugar by up to 22%. Try it after lunch!",
  "🛏️ Poor sleep raises cortisol, which raises blood sugar. Aim for 7–8 hours tonight.",
  "🥦 Eating vegetables before carbs slows glucose absorption by up to 40%.",
  "🧘 Deep breathing for 5 minutes can lower stress hormones that spike blood sugar.",
  "⏰ Taking medication at the same time every day improves its effectiveness.",
  "📏 Check your feet daily for cuts or sores — early detection prevents complications.",
  "🍋 Adding vinegar or lemon juice to meals can lower the GI of the whole meal.",
];

export default function CareCompanion() {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [medications, setMedications] = useState([]);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [loadingUser, setLoadingUser] = useState(true);
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);
  const [showSettings, setShowSettings] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const me = await base44.auth.me();
        setUser(me);
        loadData(me.id);
      } catch {
        // not logged in — public view
      } finally {
        setLoadingUser(false);
      }
    }
    init();
  }, []);

  async function loadData(uid) {
    try {
      const [logsData, medsData] = await Promise.all([
        base44.entities.CareLog.filter({ user_id: uid }, "-date", 30),
        base44.entities.Medication.filter({ user_id: uid, active: true }),
      ]);
      setLogs(logsData);
      setMedications(medsData);
    } catch {}
  }

  function reload() { if (user) loadData(user.id); }

  async function handleDeleteAccount() {
    setDeleting(true);
    try {
      // Delete all user data
      await Promise.allSettled([
        base44.entities.CareLog.deleteMany({ user_id: user.id }),
        base44.entities.Medication.deleteMany({ user_id: user.id }),
      ]);
      await base44.auth.logout("/");
    } finally {
      setDeleting(false);
    }
  }

  const todayLog = logs.find(l => l.date === new Date().toISOString().split("T")[0]);
  const recentBs = logs.filter(l => l.blood_sugar).slice(0, 7);
  const avgBs = recentBs.length ? Math.round(recentBs.reduce((a, b) => a + b.blood_sugar, 0) / recentBs.length) : null;
  const streak = (() => {
    let s = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const ds = d.toISOString().split("T")[0];
      if (logs.find(l => l.date === ds)) s++; else break;
    }
    return s;
  })();

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950 pb-16 md:pb-0">
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 bg-blue-200/20 dark:bg-blue-900/10 pointer-events-none" />

      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pb-4 flex items-center justify-between sticky top-0 z-30 bg-blue-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-800" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}>
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("home")}
          </Link>
          <div className="w-px h-5 bg-blue-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-heading font-bold text-base text-blue-900 dark:text-white">{t("careTitle")}</span>
          </div>
        </div>
        {!loadingUser && !user && (
          <Link to="/login" className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full font-medium hover:bg-blue-700 transition-colors">
            <Lock className="w-3 h-3" /> {t("signIn")}
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-700">{user.full_name?.[0] || user.email?.[0] || "U"}</span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{user.full_name || user.email}</span>
          </div>
        )}
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero greeting */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 mb-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-20 w-24 h-24 rounded-full bg-white/5 translate-y-6" />
          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium mb-1">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
                <h1 className="text-2xl font-bold leading-tight">
                  {user ? `${t("helloThere")}, ${user.full_name?.split(" ")[0] || ""} 👋` : t("yourDailyCareHub")}
                </h1>
                <p className="text-blue-200 text-sm mt-1">
                  {todayLog ? t("checkInComplete") : t("readyCheckIn")}
                </p>
              </div>
              <Bot className="w-10 h-10 text-blue-300 opacity-80 flex-shrink-0" />
            </div>

            {/* Stats row */}
            {user && (
              <div className="flex gap-4 mt-4">
                <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
                  <p className="text-xl font-bold">{streak}</p>
                  <p className="text-xs text-blue-200">{t("dayStreak")}</p>
                </div>
                {avgBs && (
                  <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
                    <p className="text-xl font-bold">{avgBs}</p>
                    <p className="text-xs text-blue-200">{t("avgGlucose")}</p>
                  </div>
                )}
                <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
                  <p className="text-xl font-bold">{logs.length}</p>
                  <p className="text-xs text-blue-200">{t("checkIns")}</p>
                </div>
              </div>
            )}

            {/* CTA */}
            {!todayLog && (
              <button
                onClick={() => setShowCheckIn(true)}
                className="mt-4 flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20"
              >
                <Plus className="w-4 h-4" /> {t("startCheckIn")}
              </button>
            )}
            {todayLog && (
              <button
                onClick={() => setShowCheckIn(true)}
                className="mt-4 flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                <ClipboardList className="w-4 h-4" /> {t("updateCheckIn")}
              </button>
            )}
          </div>
        </div>

        {/* Today's AI tip */}
        <div className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl p-4 mb-6 flex gap-3">
          <Sparkles className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("todayTip")}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-xl p-1 mb-6">
          {TABS_KEYS.map(tabItem => {
            const Icon = tabItem.icon;
            return (
              <button
                key={tabItem.key}
                onClick={() => setTab(tabItem.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === tabItem.key ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-blue-600"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />{t(tabItem.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {tab === "dashboard" && (
          <div className="space-y-5">
            {/* Today's summary if checked in */}
            {todayLog && (
              <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-green-500" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{t("todaySummary")}</p>
                </div>
                {todayLog.ai_summary && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-green-50 dark:bg-green-900/20 rounded-xl p-3">{todayLog.ai_summary}</p>
                )}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {todayLog.blood_sugar && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-2.5 text-center">
                      <p className="text-xs text-gray-400">{t("bloodSugar")}</p>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">{todayLog.blood_sugar}</p>
                    </div>
                  )}
                  {todayLog.mood && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-2.5 text-center">
                      <p className="text-xs text-gray-400">{t("mood")}</p>
                      <p className="font-bold text-gray-900 dark:text-white text-sm capitalize">{todayLog.mood}</p>
                    </div>
                  )}
                  {todayLog.energy && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-2.5 text-center">
                      <p className="text-xs text-gray-400">{t("energy")}</p>
                      <p className="font-bold text-gray-900 dark:text-white text-sm capitalize">{todayLog.energy}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Medications today */}
            {medications.length > 0 && (
              <div className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl p-5">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-blue-500" /> {t("todayMeds")}
                </p>
                <div className="space-y-2">
                  {medications.map(med => {
                    const taken = todayLog?.medications_taken?.includes(med.name);
                    return (
                      <div key={med.id} className={`flex items-center gap-3 px-3 py-2 rounded-xl ${taken ? "bg-green-50 dark:bg-green-900/20" : "bg-gray-50 dark:bg-gray-700/50"}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${taken ? "border-green-500 bg-green-500" : "border-gray-300 dark:border-gray-600"}`}>
                          {taken && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={`text-sm ${taken ? "text-green-700 dark:text-green-400 line-through" : "text-gray-700 dark:text-gray-300"}`}>{med.name}</span>
                        <span className="text-xs text-gray-400 ml-auto">{med.dose}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Blood sugar trend */}
            {recentBs.length > 1 && (
              <div className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl p-5">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" /> {t("recentBs")}
                </p>
                <div className="flex items-end gap-2 h-16">
                  {recentBs.slice().reverse().map((l, i) => {
                    const maxBs = Math.max(...recentBs.map(r => r.blood_sugar));
                    const pct = (l.blood_sugar / maxBs) * 100;
                    const isHigh = l.blood_sugar > 180;
                    const isLow = l.blood_sugar < 70;
                    return (
                      <div key={l.id} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-gray-400">{l.blood_sugar}</span>
                        <div className="w-full rounded-t-sm" style={{ height: `${Math.max(pct * 0.5, 8)}px`, backgroundColor: isHigh ? "#f97316" : isLow ? "#ef4444" : "#22c55e" }} />
                        <span className="text-xs text-gray-300">{new Date(l.date).toLocaleDateString("en", { weekday: "narrow" })}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Trend Charts */}
            {user && logs.length > 0 && <TrendCharts logs={logs} />}

            {!user && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-center">
                <Bot className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t("saveHistory")}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t("saveHistoryDesc")}</p>
                <Link to="/register" className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                  {t("createAccount")}
                </Link>
              </div>
            )}
          </div>
        )}

        {tab === "history" && (
          user
            ? <CareHistory logs={logs} />
            : <div className="text-center py-16 text-gray-400">
                <Lock className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">{t("loginHistory")}</p>
                <Link to="/login" className="mt-3 inline-block text-sm text-blue-600 hover:underline">{t("signIn")} →</Link>
              </div>
        )}

        {tab === "medications" && (
          <MedicationManager user={user} medications={medications} onUpdate={reload} />
        )}

        {/* Account Settings — only shown when logged in */}
        {user && (
          <div className="mt-8 border-t border-blue-100 dark:border-gray-800 pt-6">
            <button
              onClick={() => setShowSettings(s => !s)}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors mb-3"
            >
              <Settings className="w-4 h-4" />
              {t("accountSettings")}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSettings ? "rotate-180" : ""}`} />
            </button>

            {showSettings && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 border border-red-100 dark:border-red-900/40 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t("deleteAccount")}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-3">{t("deleteDesc")}</p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                          <Trash2 className="w-3.5 h-3.5" /> {t("deleteBtn")}
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{t("confirmDelete")}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {t("confirmDeleteDesc")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAccount}
                            disabled={deleting}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                          >
                            {deleting ? t("deleting") : t("deleteConfirm")}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {showCheckIn && (
        <CheckInModal
          user={user}
          medications={medications}
          onClose={() => setShowCheckIn(false)}
          onSaved={reload}
        />
      )}
    </div>
  );
}