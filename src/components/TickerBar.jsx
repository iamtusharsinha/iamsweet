import React from "react";

const TICKER_ITEMS = [
  "🤖 ChatGPT for Beginners",
  "🧠 Machine Learning Crash Course",
  "🛠️ Build with LangChain",
  "📊 Data Science Foundations",
  "🚀 AI Hackathon — NYC",
  "🎓 Deep Learning Specialization",
  "🌐 Prompt Engineering 101",
  "👾 TensorFlow Workshop",
  "🔬 AI Research Reading Group",
  "📡 Hugging Face Models",
  "🏙️ Meetup — San Francisco",
  "💡 Generative AI for Devs",
  "🔥 OpenAI API Bootcamp",
  "🎯 AI Ethics & Safety Talk",
  "🧩 RAG Systems Deep Dive",
];

export default function TickerBar() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative overflow-hidden mt-4 rounded-xl border border-orange-100/60 bg-white/50 backdrop-blur-sm py-2.5">
      {/* fade edges */}
      <div className="absolute left-0 top-0 h-full w-10 z-10 pointer-events-none" style={{background: "linear-gradient(to right, rgba(255,247,240,0.9), transparent)"}} />
      <div className="absolute right-0 top-0 h-full w-10 z-10 pointer-events-none" style={{background: "linear-gradient(to left, rgba(255,247,240,0.9), transparent)"}} />

      <div
        className="flex gap-6 w-max"
        style={{
          animation: "ticker-scroll 40s linear infinite",
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-sm text-gray-600 font-medium px-2"
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}