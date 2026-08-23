import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, BadgeCheck, Globe, Heart, ChefHat, Stethoscope, Bot, Activity, Pill } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import GoogleIcon from "@/components/GoogleIcon";
import { toast } from "@/components/ui/use-toast";

const CONTENT = {
  en: {
    badge: "Join 10,000+ Managing Diabetes Smarter",
    headline: "Your diabetes journey,",
    headlineGradient: "starts here.",
    subheadline: "Create your free account and unlock AI-powered tools that go beyond generic advice — personalized to your health data.",
    createTitle: "Create your account",
    createSub: "Free forever · No credit card needed",
    continueGoogle: "Sign up with Google",
    orEmail: "or with email",
    emailLabel: "Email",
    passwordLabel: "Password",
    confirmLabel: "Confirm Password",
    passwordMismatch: "Passwords do not match",
    createBtn: "Create Free Account",
    creating: "Creating account…",
    haveAccount: "Already have an account?",
    loginLink: "Log in →",
    verifyTitle: "Verify your email",
    verifySub: (email) => `We sent a 6-digit code to ${email}`,
    verifyBtn: "Verify & Continue",
    verifying: "Verifying…",
    noCode: "Didn't receive the code?",
    resend: "Resend",
    trust: "Free forever · No credit card · Trusted by thousands with diabetes",
    perks: [
      { emoji: "📋", title: "Personalized Diet Chart", desc: "10 meal options per category, tailored to your culture & glucose levels." },
      { emoji: "📊", title: "Glucose Trend Tracking", desc: "Log daily readings and see 30-day trend charts automatically." },
      { emoji: "💊", title: "Medication Reminders", desc: "Set up daily reminders so you never miss a dose." },
      { emoji: "🤖", title: "SWEETY AI Assistant", desc: "Get personalized diabetes advice based on your history and profile." },
      { emoji: "🩺", title: "Telehealth Access", desc: "Connect directly with verified diabetes specialists worldwide." },
      { emoji: "😄", title: "Mood & Energy Logs", desc: "Track how you feel and correlate it with your blood sugar patterns." },
    ],
  },
  es: {
    badge: "Únete a +10,000 que manejan la diabetes de forma inteligente",
    headline: "Tu viaje con la diabetes",
    headlineGradient: "comienza aquí.",
    subheadline: "Crea tu cuenta gratuita y accede a herramientas de IA que van más allá del consejo genérico — personalizadas a tus datos de salud.",
    createTitle: "Crea tu cuenta",
    createSub: "Gratis para siempre · Sin tarjeta de crédito",
    continueGoogle: "Registrarse con Google",
    orEmail: "o con correo electrónico",
    emailLabel: "Correo electrónico",
    passwordLabel: "Contraseña",
    confirmLabel: "Confirmar contraseña",
    passwordMismatch: "Las contraseñas no coinciden",
    createBtn: "Crear Cuenta Gratis",
    creating: "Creando cuenta…",
    haveAccount: "¿Ya tienes una cuenta?",
    loginLink: "Iniciar sesión →",
    verifyTitle: "Verifica tu correo",
    verifySub: (email) => `Enviamos un código de 6 dígitos a ${email}`,
    verifyBtn: "Verificar y Continuar",
    verifying: "Verificando…",
    noCode: "¿No recibiste el código?",
    resend: "Reenviar",
    trust: "Gratis para siempre · Sin tarjeta · Confiado por miles con diabetes",
    perks: [
      { emoji: "📋", title: "Plan de Dieta Personalizado", desc: "10 opciones por categoría de comida, adaptadas a tu cultura y glucosa." },
      { emoji: "📊", title: "Seguimiento de Glucosa", desc: "Registra lecturas diarias y ve gráficas de tendencia de 30 días." },
      { emoji: "💊", title: "Recordatorios de Medicamentos", desc: "Configura recordatorios diarios para no olvidar una dosis." },
      { emoji: "🤖", title: "Asistente IA SWEETY", desc: "Recibe consejos personalizados basados en tu historial y perfil." },
      { emoji: "🩺", title: "Acceso a Telesalud", desc: "Conéctate directamente con especialistas en diabetes de todo el mundo." },
      { emoji: "😄", title: "Registro de Ánimo y Energía", desc: "Registra cómo te sientes y correla con tus niveles de azúcar en sangre." },
    ],
  },
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [lang, setLang] = useState("en");

  const c = CONTENT[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) { setError(c.passwordMismatch); return; }
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setShowOtp(true);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode });
      if (result?.access_token) base44.auth.setToken(result.access_token);
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await base44.auth.resendOtp(email);
      toast({ title: lang === "es" ? "Código enviado" : "Code sent", description: lang === "es" ? "Revisa tu correo." : "Check your email." });
    } catch (err) {
      setError(err.message || "Failed to resend");
    }
  };

  const handleGoogle = () => {
    base44.auth.loginWithProvider("google", "/");
  };

  // OTP verification screen
  if (showOtp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-900/5 p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{c.verifyTitle}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{c.verifySub(email)}</p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <div className="flex justify-center mb-6">
              <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} autoFocus autoComplete="one-time-code">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button className="w-full h-12 font-semibold rounded-xl" onClick={handleVerify} disabled={loading || otpCode.length < 6}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{c.verifying}</> : c.verifyBtn}
            </Button>

            <p className="text-sm text-gray-500 mt-4">
              {c.noCode}{" "}
              <button onClick={handleResend} className="text-blue-600 font-semibold hover:underline">{c.resend}</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col lg:flex-row">

      {/* Left panel */}
      <div className="lg:w-1/2 xl:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
        {/* Logo + lang */}
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
          <div className="inline-flex items-center gap-2 bg-emerald-600/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            {c.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            {c.headline}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent block">{c.headlineGradient}</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-base leading-relaxed">{c.subheadline}</p>
        </div>

        {/* Perks grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          {c.perks.map((p, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-2xl border bg-white dark:bg-gray-800/60 border-gray-100 dark:border-gray-700">
              <span className="text-2xl flex-shrink-0 mt-0.5">{p.emoji}</span>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{p.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
          <BadgeCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          {c.trust}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-900/5 p-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{c.createTitle}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{c.createSub}</p>

            <Button variant="outline"
              className="w-full h-12 text-sm font-semibold mb-4 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 transition-all gap-2"
              onClick={handleGoogle}>
              <GoogleIcon className="w-5 h-5" />
              {c.continueGoogle}
            </Button>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
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
                  <Input id="email" type="email" autoComplete="email" autoFocus placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-gray-200 dark:border-gray-700 focus:border-blue-400" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{c.passwordLabel}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="password" type="password" autoComplete="new-password" placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-gray-200 dark:border-gray-700 focus:border-blue-400" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm" className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{c.confirmLabel}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="confirm" type="password" autoComplete="new-password" placeholder="••••••••"
                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-gray-200 dark:border-gray-700 focus:border-blue-400" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 border-0" disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{c.creating}</> : c.createBtn}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              {c.haveAccount}{" "}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">{c.loginLink}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}