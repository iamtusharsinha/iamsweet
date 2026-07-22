import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Globe, Users, Sparkles, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950 pb-16 md:pb-0">
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pb-4 flex items-center sticky top-0 z-30 bg-blue-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-800" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}>
        <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30 mb-6">
            <span className="text-white font-black text-2xl">i</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
            About iamsweet
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The world's most complete free platform for people living with diabetes.
          </p>
        </div>

        {/* Main content */}
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white m-0">What is iamsweet?</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed m-0">
              iamsweet is a free, all-in-one diabetes support platform built to end the frustrating experience of bouncing between dozens of websites just to manage your health. We bring together lifestyle guidance, low-glycemic meal recipes, medication information, blood sugar tracking, telehealth access, educational videos, curated research resources, and an AI-powered support assistant — all in one beautifully simple place. Whether you've just been diagnosed or have been living with diabetes for decades, iamsweet gives you the tools, knowledge, and community to thrive every single day.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center">
                <Users className="w-5 h-5 text-rose-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white m-0">Who is it for?</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed m-0">
              iamsweet is built for every person touched by diabetes — from newly diagnosed patients navigating Type 1 or Type 2 for the first time, to long-term diabetes warriors who want smarter tools, to parents supporting children with diabetes, to caregivers, and to healthcare professionals seeking trusted resources to share with their patients. We serve a global audience across more than 180 countries, with content available in English, Hindi, and Arabic, because diabetes doesn't respect borders and neither should world-class support.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-violet-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white m-0">Who builds it?</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed m-0">
              iamsweet is built by a passionate team of health-tech developers and diabetes advocates who believe that access to quality health information should be universal and free. We curate resources exclusively from credible organizations — including leading diabetes research centers, certified diabetes educators, and internationally recognized medical institutions. Our AI assistant SWEETY is powered by state-of-the-art large language models trained to give warm, practical, evidence-aware support. Every feature on iamsweet is designed with a single mission: to make your diabetes journey easier, safer, and more empowered.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white m-0">Our commitment</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed m-0">
              iamsweet is and will always be free. No paywalls, no hidden fees, no subscription required. We are committed to keeping our content up to date with the latest diabetes science and clinical guidance, and to expanding our platform to support more languages, more conditions, and more communities around the world. The information on iamsweet is for educational purposes and should complement — never replace — the advice of your qualified healthcare provider.
            </p>
          </div>

        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "537M+", label: "People with diabetes worldwide" },
            { value: "100+", label: "Curated resources" },
            { value: "50+", label: "Low-GI recipes" },
            { value: "3", label: "Languages supported" },
          ].map(s => (
            <div key={s.label} className="bg-blue-600 rounded-2xl p-5 text-center">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs text-blue-200 mt-1 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md shadow-blue-600/25">
            Get in touch →
          </Link>
        </div>
      </main>
    </div>
  );
}