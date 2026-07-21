import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import IntakeQuestion from "@/components/intake/IntakeQuestion";
import Logo from "@/components/Logo";
import DarkModeToggle from "@/components/DarkModeToggle";

const QUESTIONS = [
  {
    key: "level",
    question: "Where are you with AI right now?",
    subtitle: "Be honest — no wrong answer here.",
    options: [
      { value: "absolute_beginner", label: "Complete beginner", emoji: "🌱", description: "I've heard of ChatGPT but that's about it" },
      { value: "beginner", label: "Just getting started", emoji: "🌿", description: "I've tried a few AI tools or watched some videos" },
      { value: "intermediate", label: "Building things", emoji: "🌳", description: "I've built projects or taken courses in AI/ML" }
    ]
  },
  {
    key: "goal",
    question: "What are you trying to do?",
    subtitle: "Pick the one that feels most true right now.",
    options: [
      { value: "career_switch", label: "Switch into an AI career", emoji: "🚀", description: "I want a job in AI or data science" },
      { value: "upskill", label: "Add AI skills to my current role", emoji: "⚡", description: "Stay relevant, work smarter" },
      { value: "explore", label: "Just explore and understand AI", emoji: "🔍", description: "Curiosity, not a career move (yet)" },
      { value: "build_projects", label: "Build real AI projects", emoji: "🔨", description: "I want to make things, not just learn theory" }
    ]
  },
  {
    key: "city",
    question: "Where are you based?",
    subtitle: "So we can find real rooms near you.",
    options: [
      { value: "san_francisco", label: "San Francisco / Bay Area", emoji: "🌉" },
      { value: "washington_dc", label: "Washington, DC", emoji: "🏛️" },
      { value: "online_only", label: "Online only is fine", emoji: "🌐" },
      { value: "other", label: "Somewhere else", emoji: "📍" }
    ]
  },
  {
    key: "hours",
    question: "How many hours a week can you commit?",
    subtitle: "We'll size your plan to fit your real life.",
    options: [
      { value: "1-3", label: "1–3 hours", emoji: "⏱️", description: "A podcast's worth" },
      { value: "4-7", label: "4–7 hours", emoji: "📅", description: "A few evenings" },
      { value: "8+", label: "8+ hours", emoji: "🔥", description: "I'm going all in" }
    ]
  },
  {
    key: "motivation",
    question: "Why are you doing this — really?",
    subtitle: "This changes your plan more than anything else.",
    options: [
      { value: "escape", label: "I want a way out", emoji: "🚪", description: "My current path isn't working — AI feels like a fresh start" },
      { value: "compete", label: "I want an edge", emoji: "⚔️", description: "I need to stand out, get hired, or level up" },
      { value: "curious", label: "I'm just curious", emoji: "✨", description: "AI fascinates me and I want to understand it" },
      { value: "belong", label: "I want to find my people", emoji: "🤝", description: "I'm tired of learning alone — I want a room to walk into" }
    ]
  }
];

export default function Intake() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isBuilding, setIsBuilding] = useState(false);
  const navigate = useNavigate();

  const currentQ = QUESTIONS[step];

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [currentQ.key]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        setIsBuilding(true);
        const params = new URLSearchParams(newAnswers).toString();
        setTimeout(() => {
          navigate(`/plan?${params}`);
        }, 1500);
      }
    }, 300);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else navigate("/");
  };

  if (isBuilding) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: "linear-gradient(135deg, #fff7f0 0%, #fff3e8 50%, #ffecd6 100%)"}}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 dark:bg-orange-900/40 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
          </div>
          <h2 className="text-2xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
            Building your plan...
          </h2>
          <p className="text-gray-500 dark:text-gray-400">One course. A few real rooms. Just for you.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{background: "linear-gradient(160deg, #fff7f0 0%, #fff3e8 40%, #fffaf7 80%, #fff 100%)"}}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>
        <Logo size="sm" />
        <DarkModeToggle />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          <IntakeQuestion
            key={step}
            question={currentQ.question}
            subtitle={currentQ.subtitle}
            options={currentQ.options}
            selected={answers[currentQ.key]}
            onSelect={handleSelect}
            step={step}
            totalSteps={QUESTIONS.length}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}