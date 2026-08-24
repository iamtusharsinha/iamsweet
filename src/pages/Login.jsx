import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { safeReturnTo } from "@/lib/authReturnTo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail, Lock, Loader2, TrendingUp, UtensilsCrossed, Smile,
  Activity, Pill, Bot, BadgeCheck, ChefHat, Stethoscope, Globe
} from "lucide-react";
import GoogleIcon from "@/components/GoogleIcon";

const CONTENT = {
  en: {
    badge: "World's #1 Diabetes Support Platform",
    headline: "Unlock your full",
    headlineGradient: "health picture",
    subheadline: "Sign in to access powerful AI-driven features designed to help you manage diabetes smarter — all free.",
    welcomeBack: "Welcome back",
    signInSub: "Sign in to your iamsweet account",
    continueGoogle: "Continue with Google",
    orEmail: "or email",
    emailLabel: "Email",
    passwordLabel: "Password",
    forgot: "Forgot?",
    loginBtn: "Log in",
    loggingIn: "Logging in…",
    noAccount: "New to iamsweet?",
    createAccount: "Create free account →",
    trust: "Free forever · No credit card · Trusted by thousands with diabetes",
    features: [
      { emoji: "😄", title: "Mood & Emotion Tracking", desc: "Log daily moods and spot emotional patterns over weeks.", color: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800" },
      { emoji: "🍽️", title: "Meal Logging with AI Calories", desc: "Snap a photo — AI estimates calories and nutrition instantly.", color: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" },
      { emoji: "📊", title: "Blood Sugar Trend Charts", desc: "7, 14, 30-day glucose trend charts to spot your patterns.", color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" },
      { emoji: "🔮", title: "AI Pattern Prediction", desc: "AI learns your spikes, dips, and energy cycles — and predicts what's next.", color: "bg-violet-50 border-violet-200 dark:bg-violet-900/20 dark:border-violet-800" },
      { emoji: "💊", title: "Medication Reminders", desc: "Never miss a dose. Daily email reminders + med tracking.", color: "bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800" },
      { emoji: "📋", title: "Personalized Diet Chart", desc: "AI-generated meal plans based on your glucose, BMI & ethnicity.", color: "bg-teal-50 border-teal-200 dark:bg-teal-900/20 dark:border-teal-800" },
    ],
  },
  es: {
    badge: "Plataforma #1 de Apoyo para la Diabetes",
    headline: "Descubre tu cuadro",
    headlineGradient: "de salud completo",
    subheadline: "Inicia sesión para acceder a funciones potentes con IA diseñadas para manejar la diabetes de forma más inteligente — todo gratis.",
    welcomeBack: "Bienvenido de vuelta",
    signInSub: "Inicia sesión en tu cuenta iamsweet",
    continueGoogle: "Continuar con Google",
    orEmail: "o con correo",
    emailLabel: "Correo electrónico",
    passwordLabel: "Contraseña",
    forgot: "¿Olvidaste?",
    loginBtn: "Iniciar sesión",
    loggingIn: "Iniciando sesión…",
    noAccount: "¿Nuevo en iamsweet?",
    createAccount: "Crear cuenta gratis →",
    trust: "Gratis para siempre · Sin tarjeta de crédito · Miles de diabéticos confían en nosotros",
    features: [
      { emoji: "😄", title: "Seguimiento de Estado de Ánimo", desc: "Registra cómo te sientes cada día y detecta patrones emocionales.", color: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800" },
      { emoji: "🍽️", title: "Registro de Comidas con IA", desc: "Toma una foto — la IA estima calorías y nutrición al instante.", color: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" },
      { emoji: "📊", title: "Gráficas de Glucosa", desc: "Gráficas de tendencia de 7, 14 y 30 días para identificar tus patrones.", color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" },
      { emoji: "🔮", title: "Predicción de Patrones con IA", desc: "La IA aprende tus picos, caídas y ciclos de energía — y predice lo que viene.", color: "bg-violet-50 border-violet-200 dark:bg-violet-900/20 dark:border-violet-800" },
      { emoji: "💊", title: "Recordatorios de Medicamentos", desc: "Nunca olvides una dosis. Recordatorios diarios + seguimiento de medicamentos.", color: "bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800" },
      { emoji: "📋", title: "Plan de Dieta Personalizado", desc: "Planes de comidas generados por IA basados en tu glucosa, IMC y etnia.", color: "bg-teal-50 border-teal-200 dark:bg-teal-900/20 dark:border-teal-800" },
    ],
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("en");

  const c = CONTENT[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const returnTo = safeReturnTo();
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = returnTo;
    } catch (err) {
      setError(err.message || (lang === "es" ? "Correo o contraseña incorrectos" : "Invalid email or password"));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    const returnTo = safeReturnTo();
    base44.auth.loginWithProvider("google", returnTo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col lg:flex-row">

      {/* Left panel — Features showcase */}
      <div className="lg:w-1/2 xl:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
        {/* Logo + lang toggle */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="https://media.base44.com/images/public/6a5ebcfd68e6120b630c6ded/372d3e55c_iamsweet.png" alt="iamsweet" className="h-8 w-auto" />
          </Link>
          <button
            onClick={() => setLang(l => l === "en" ? "es" : "en")}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-blue-400 transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "🇪🇸 Español" : "🇬🇧 English"}
          </button>
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            {c.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            {c.headline}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent block">{c.headlineGradient}</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-base leading-relaxed">{c.subheadline}</p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 gap-3">
          {c.features.map((f, i) => (
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
          {c.trust}
        </div>
      </div>

      {/* Right panel — Login form */}
      <div className="lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-900/5 p-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{c.welcomeBack}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{c.signInSub}</p>

            <Button
              variant="outline"
              className="w-full h-12 text-sm font-semibold mb-4 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 transition-all gap-2"
              onClick={handleGoogle}
            >
              <GoogleIcon className="w-5 h-5" />
              {c.continueGoogle}
            </Button>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-3 text-gray-400">{c.orEmail}</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{c.emailLabel}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="email" type="email" autoComplete="email" placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-gray-200 dark:border-gray-700 focus:border-blue-400" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{c.passwordLabel}</Label>
                  <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">{c.forgot}</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="password" type="password" autoComplete="current-password" placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-gray-200 dark:border-gray-700 focus:border-blue-400" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 font-semibold rounded-xl" disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {c.loggingIn}</> : c.loginBtn}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              {c.noAccount}{" "}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">{c.createAccount}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}