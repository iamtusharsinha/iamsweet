import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Mic, MicOff, Bot, User, Loader2, Volume2, VolumeX } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";

const SUGGESTIONS = [
  "What foods should I avoid with Type 2 diabetes?",
  "How does exercise affect blood sugar?",
  "What is the difference between Type 1 and Type 2 diabetes?",
  "How do I count carbohydrates?",
  "What are the symptoms of low blood sugar (hypoglycemia)?",
  "Can Type 2 diabetes be reversed?",
  "What is A1C and what should my target be?",
  "How does stress affect blood sugar levels?",
];

const SYSTEM_CONTEXT = `You are SWEETY, a warm and friendly diabetes support assistant. Keep responses short, conversational, and practical — like texting a knowledgeable friend.

Rules:
- Be concise. 2-4 short paragraphs max. No long lists unless truly needed.
- Use simple, natural language. No jargon.
- Only answer diabetes-related questions.
- Add a brief reminder to consult a doctor for serious medical decisions (one short sentence, not a disclaimer block).
- Be warm and encouraging.`;

export default function DiabetesChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! I'm **SWEETY** 🩵 — your diabetes support buddy. Ask me anything about blood sugar, nutrition, meds, lifestyle, or just how you're feeling today."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const history = newMessages.map(m => `${m.role === "user" ? "User" : "SWEETY"}: ${m.content}`).join("\n");
      const prompt = `${SYSTEM_CONTEXT}\n\nConversation:\n${history}\n\nSWEETY:`;

      const response = await base44.integrations.Core.InvokeLLM({ prompt });
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I ran into an issue. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function toggleVoiceInput() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please try Chrome.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = e => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  function speakMessage(text) {
    if (!window.speechSynthesis) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950 flex flex-col pb-16 md:pb-0">
      {/* Header */}
      <header className="px-4 sm:px-6 pt-5 pb-4 flex items-center justify-between sticky top-0 z-30 bg-blue-50/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-blue-100 dark:border-gray-800 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="w-px h-5 bg-blue-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-blue-900 dark:text-white block leading-none">SWEETY</span>
              <span className="text-xs text-green-500 font-medium">● Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleVoiceInput}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${listening ? "bg-red-500 text-white animate-pulse" : "bg-white dark:bg-gray-800 text-gray-500 border border-blue-200 dark:border-gray-700 hover:border-blue-400"}`}
            title={listening ? "Stop listening" : "Voice input"}
          >
            {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 space-y-5">

        {/* Suggestion chips — show only if just the greeting */}
        {messages.length === 1 && (
          <div className="mb-2">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 text-center">Tap a question to get started</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "user" ? "bg-blue-600" : "bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-600"}`}>
              {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-blue-600" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] relative group ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-blue-100 dark:border-gray-700 rounded-tl-sm shadow-sm"
              }`}>
                {msg.role === "assistant" ? (
                  <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:text-sm prose-headings:font-semibold prose-headings:my-1">
                    {msg.content}
                  </ReactMarkdown>
                ) : msg.content}
              </div>
              {msg.role === "assistant" && (
                <button
                  onClick={() => speakMessage(msg.content)}
                  className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1"
                >
                  {speaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  {speaking ? "Stop" : "Listen"}
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <div className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3">
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pb-6 pt-2">
        <div className="flex gap-2 items-end bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-2xl shadow-sm p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
          <button
            onClick={toggleVoiceInput}
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${listening ? "bg-red-500 text-white" : "text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"}`}
          >
            {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask anything about diabetes…"
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none py-2 px-1 max-h-32 overflow-y-auto"
            style={{ minHeight: "36px" }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">SWEETY is an AI — always check with your doctor for medical decisions.</p>
      </div>
    </div>
  );
}