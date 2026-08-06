import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Loader2, X, ExternalLink, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";

export default function HeroSearch({ resources = [], onScrollToResults, placeholder }) {
  const [query, setQuery] = useState("");
  const [aiAnswer, setAiAnswer] = useState(null);
  const [relatedResources, setRelatedResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const inputRef = useRef(null);

  async function handleSearch() {
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setShowAnswer(false);
    setAiAnswer(null);

    // Find top matching resources to use as knowledge base
    const qLower = q.toLowerCase();
    const matched = resources
      .filter(r =>
        r.title?.toLowerCase().includes(qLower) ||
        r.description?.toLowerCase().includes(qLower) ||
        r.category?.toLowerCase().includes(qLower) ||
        r.tags?.some(t => t.toLowerCase().includes(qLower)) ||
        r.org_name?.toLowerCase().includes(qLower)
      )
      .slice(0, 6);

    // Build knowledge context from matched resources
    const knowledgeContext = matched.length > 0
      ? matched.map(r => `- ${r.title} (${r.category}, ${r.org_name || ""}): ${r.description || ""}`).join("\n")
      : "No specific articles matched, use general diabetes knowledge.";

    try {
      const prompt = `You are SWEETY, iamsweet's diabetes knowledge assistant. A user asked: "${q}"

Using this curated knowledge base from credible diabetes organizations:
${knowledgeContext}

Give a direct, helpful answer in 3-5 sentences. Be specific and practical — not generic.
- If the question is about food/diet: mention specific foods and GI values.
- If about medication: mention general guidance (not a prescription).
- If about symptoms: explain what they might mean and what to watch for.
- End with ONE practical action they can take today.
- Do NOT list bullet points or headers. Write in flowing, friendly prose.
- Keep it under 120 words.`;

      const answer = await base44.integrations.Core.InvokeLLM({ prompt });
      setAiAnswer(answer);
      setRelatedResources(matched.slice(0, 3));
      setShowAnswer(true);
    } catch (e) {
      setAiAnswer("I couldn't get an answer right now. Try searching our resources below.");
      setShowAnswer(true);
    }

    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  function dismiss() {
    setShowAnswer(false);
    setAiAnswer(null);
    setQuery("");
  }

  return (
    <div className="relative max-w-xl mx-auto">
      {/* Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder || "Ask anything about diabetes…"}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-14 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg shadow-blue-900/5"
        />
        <button
          onClick={handleSearch}
          disabled={!query.trim() || loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/30 disabled:opacity-50"
        >
          {loading
            ? <Loader2 className="w-4 h-4 text-white animate-spin" />
            : <ArrowRight className="w-5 h-5 text-white" />
          }
        </button>
      </div>

      {/* AI Answer Panel */}
      <AnimatePresence>
        {showAnswer && aiAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-3 left-0 right-0 bg-white dark:bg-gray-900 rounded-2xl border border-blue-100 dark:border-gray-700 shadow-2xl shadow-blue-900/15 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/40 dark:to-violet-950/40">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400">SWEETY's Answer</span>
              </div>
              <button onClick={dismiss} className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X className="w-3 h-3 text-gray-500" />
              </button>
            </div>

            {/* Answer */}
            <div className="px-4 py-4">
              <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{aiAnswer}</p>
            </div>

            {/* Related Resources */}
            {relatedResources.length > 0 && (
              <div className="px-4 pb-4 space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Related Resources</p>
                {relatedResources.map(r => (
                  <a key={r.id} href={r.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all group">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{r.title}</p>
                      {r.org_name && <p className="text-[10px] text-blue-500 mt-0.5">{r.org_name}</p>}
                    </div>
                    <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-blue-500 flex-shrink-0" />
                  </a>
                ))}
              </div>
            )}

            {/* Browse all */}
            <div className="px-4 pb-4">
              <button
                onClick={() => { dismiss(); onScrollToResults && onScrollToResults(); }}
                className="w-full text-center text-xs font-semibold text-blue-600 dark:text-blue-400 py-2 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
              >
                Browse all resources →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}