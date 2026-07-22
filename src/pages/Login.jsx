import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, TrendingUp, UtensilsCrossed, Smile, Activity, Pill, Bot, BadgeCheck, ChevronRight } from "lucide-react";
import GoogleIcon from "@/components/GoogleIcon";

const FEATURES = [
  {
    icon: Smile,
    emoji: "😄",
    title: "Mood & Emotion Tracking",
    desc: "Log how you feel daily with emoji-based mood check-ins. See your emotional patterns over weeks.",
    color: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
    iconColor: "text-yellow-500",
  },
  {
    icon: UtensilsCrossed,
    emoji: "🍽️",
    title: "Meal Logging with AI Calories",
    desc: "Snap a photo of your meal. Our AI engine estimates calories and nutrition automatically.",
    color: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
    iconColor: "text-green-500",
  },
  {
    icon: Activity,
    emoji: "📊",
    title: "Blood Sugar Trend Charts",
    desc: "Visualize your glucose readings with beautiful 7, 14, and 30-day trend charts.",
    color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
    iconColor: "text-blue-500",
  },
  {
    icon: TrendingUp,
    emoji: "🔮",
    title: "Pattern Prediction",
    desc: "AI learns your unique health patterns — blood sugar spikes, mood dips, energy cycles — and predicts what's coming.",
    color: "bg-violet-50 border-violet-200 dark:bg-violet-900/20 dark:border-violet-800",
    iconColor: "text-violet-500",
  },
  {
    icon: Pill,
    emoji: "💊",
    title: "Medication Reminders",
    desc: "Never miss a dose. Get daily email reminders and track which meds you've taken.",
    color: "bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800",
    iconColor: "text-rose-500",
  },
  {
    icon: Bot,
    emoji: "🤖",
    title: "AI Care Companion",
    desc: "Your personal SWEETY AI understands your history and gives personalized care advice.",
    color: "bg-teal-50 border-teal-200 dark:bg-teal-900/20 dark:border-teal-800",
    iconColor: "text-teal-500",
  },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    base44.auth.loginWithProvider("google", "/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col lg:flex-row">

      {/* Left panel — Features showcase */}
      <div className="lg:w-1/2 xl:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30">
            <span className="text-white font-black text-sm">i</span>
          </div>
          <span className="font-black text-lg text-gray-900 dark:text-white tracking-tight">iamsweet</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            Unlock your full
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent block">health picture</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-base leading-relaxed">
            Sign in to access powerful AI-driven features designed to help you manage diabetes smarter — all free.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 gap-3">
          {FEATURES.map((f, i) => (
            <div key={i} className={`flex items-start gap-3 p-4 rounded-2xl border ${f.color} transition-all`}>
              <span className="text-2xl flex-shrink-0 mt-0.5">{f.emoji}</span>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{f.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
          <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
          Free forever · No credit card · Trusted by thousands with diabetes
        </div>
      </div>

      {/* Right panel — Login form */}
      <div className="lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-900/5 p-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Welcome back</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Sign in to your iamsweet account</p>

            {/* Google CTA — most prominent */}
            <Button
              variant="outline"
              className="w-full h-12 text-sm font-semibold mb-4 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 transition-all gap-2"
              onClick={handleGoogle}
            >
              <GoogleIcon className="w-5 h-5" />
              Continue with Google
            </Button>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-3 text-gray-400">or email</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="email" type="email" autoComplete="email" placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-gray-200 dark:border-gray-700 focus:border-blue-400" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">Forgot?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="password" type="password" autoComplete="current-password" placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-gray-200 dark:border-gray-700 focus:border-blue-400" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 font-semibold rounded-xl" disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging in…</> : "Log in"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              New to iamsweet?{" "}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">Create free account →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}