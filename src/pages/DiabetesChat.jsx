import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Mic, MicOff, Bot, User, Loader2, Volume2, VolumeX, Waves } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/lib/LanguageContext";

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
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! I'm **SWEETY** 🩵 — your diabetes support buddy. Ask me anything about blood sugar, nutrition, meds, lifestyle, or just how you're feeling today."
    }
  ]);
  const [input, setInput] = useState("");
  const [interim, setInterim] = useState(""); // live transcript while listening
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false); // full voice mode (auto-speak responses)
  const [speaking, setSpeaking] = useState(false);
  const [speakingMsgIdx, setSpeakingMsgIdx] = useState(null);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);
  const autoSendRef = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, interim]);

  // Auto-speak last assistant message when voiceMode is on
  useEffect(() => {
    if (!voiceMode) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.role === "assistant") {
      speakMessage(lastMsg.content, messages.length - 1);
    }
  }, [messages, voiceMode]); // eslint-disable-line

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
    setSpeakingMsgIdx(null);
  }, []);

  async function sendMessage(text) {
    const userText = (text ?? input).trim();
    if (!userText) return;
    setInput("");
    setInterim("");
    stopSpeaking();

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const history = newMessages.map(m => `${m.role === "user" ? "User" : "SWEETY"}: ${m.content}`).join("\n");
      const prompt = `${SYSTEM_CONTEXT}\n\nConversation:\n${history}\n\nSWEETY:`;
      const response = await base44.integrations.Core.InvokeLLM({ prompt });
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I ran into an issue. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function startListening(autoSend = false) {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please try Chrome.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    stopSpeaking();
    autoSendRef.current = autoSend;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = e => {
      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalTranscript += e.results[i][0].transcript;
        else interimTranscript += e.results[i][0].transcript;
      }
      if (finalTranscript) {
        setInterim("");
        setInput(finalTranscript);
        if (autoSendRef.current) sendMessage(finalTranscript);
      } else {
        setInterim(interimTranscript);
      }
    };
    recognition.onerror = () => { setListening(false); setInterim(""); };
    recognition.onend = () => { setListening(false); setInterim(""); };
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setListening(false);
    setInterim("");
  }

  function speakMessage(text, idx) {
    if (!window.speechSynthesis) return;
    // If already speaking this message, stop
    if (speaking && speakingMsgIdx === idx) {
      stopSpeaking();
      return;
    }
    stopSpeaking();
    // Strip markdown for cleaner TTS
    const clean = text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1").replace(/#{1,3} /g, "").replace(/`/g, "");
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.onend = () => { setSpeaking(false); setSpeakingMsgIdx(null); };
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
    setSpeakingMsgIdx(idx);
  }

  function toggleVoiceMode() {
    if (voiceMode) {
      stopSpeaking();
      stopListening();
      setVoiceMode(false);
    } else {
      setVoiceMode(true);
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950 flex flex-col pb-16 md:pb-0">
      {/* Header */}
      <header className="px-4 sm:px-6 pb-4 flex items-center justify-between sticky top-0 z-30 bg-blue-50/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-blue-100 dark:border-gray-800 max-w-4xl mx-auto w-full" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}>
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("home")}
          </Link>
          <div className="w-px h-5 bg-blue-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-blue-900 dark:text-white block leading-none">{t("chatTitle")}</span>
              <span className="text-xs text-green-500 font-medium">● {t("chatOnline")}</span>
            </div>
          </div>
        </div>
        {/* Voice Mode Toggle */}
        <button
          onClick={toggleVoiceMode}
          title={voiceMode ? "Exit voice mode" : "Enable voice mode"}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            voiceMode
              ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-400/30"
              : "bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400"
          }`}
        >
          <Waves className="w-3.5 h-3.5" />
          {voiceMode ? "Voice On" : "Voice"}
        </button>
      </header>

      {/* Voice Mode UI Overlay */}
      <AnimatePresence>
        {voiceMode && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-4"
          >
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-5 flex flex-col items-center gap-4">
              {/* Animated mic orb */}
              <div className="relative flex items-center justify-center">
                {listening && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ repeat: Infinity, duration: 1.4 }}
                      className="absolute w-20 h-20 rounded-full bg-white/30"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.4, delay: 0.3 }}
                      className="absolute w-24 h-24 rounded-full bg-white/20"
                    />
                  </>
                )}
                {speaking && (
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="absolute w-20 h-20 rounded-full bg-white/25"
                  />
                )}
                <button
                  onMouseDown={() => startListening(true)}
                  onMouseUp={stopListening}
                  onTouchStart={e => { e.preventDefault(); startListening(true); }}
                  onTouchEnd={e => { e.preventDefault(); stopListening(); }}
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    listening ? "bg-red-500 shadow-red-400/50" : "bg-white shadow-white/30 hover:scale-105"
                  }`}
                >
                  {listening
                    ? <MicOff className="w-7 h-7 text-white" />
                    : <Mic className="w-7 h-7 text-blue-600" />
                  }
                </button>
              </div>

              {/* Status text */}
              <div className="text-center">
                {listening ? (
                  <p className="text-white font-semibold text-sm animate-pulse">
                    {interim ? `"${interim}"` : "Listening…"}
                  </p>
                ) : speaking ? (
                  <div className="flex items-center gap-2">
                    <p className="text-blue-100 text-sm">SWEETY is speaking</p>
                    <button onClick={stopSpeaking} className="text-white/70 hover:text-white text-xs underline">stop</button>
                  </div>
                ) : (
                  <p className="text-blue-100 text-sm">Hold mic to speak • release to send</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 space-y-5">
        {messages.length === 1 && (
          <div className="mb-2">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 text-center">{t("tapQuestion")}</p>
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
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "user" ? "bg-blue-600" : "bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-600"}`}>
              {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-blue-600" />}
            </div>

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
                  onClick={() => speakMessage(msg.content, i)}
                  className={`mt-1 transition-all text-xs flex items-center gap-1 ${
                    speakingMsgIdx === i
                      ? "opacity-100 text-blue-600"
                      : "opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600"
                  }`}
                >
                  {speakingMsgIdx === i
                    ? <><VolumeX className="w-3 h-3" /> Stop</>
                    : <><Volume2 className="w-3 h-3" /> Listen</>
                  }
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
            <div className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              <span className="text-xs text-gray-400">SWEETY is thinking…</span>
            </div>
          </motion.div>
        )}

        {/* Live interim transcript bubble */}
        <AnimatePresence>
          {interim && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3 flex-row-reverse"
            >
              <div className="w-8 h-8 rounded-full flex-shrink-0 bg-blue-300 flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm text-sm bg-blue-200/60 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 italic">
                {interim}…
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Text Input bar (hidden in voice mode) */}
      {!voiceMode && (
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pb-6 pt-2">
          <div className="flex gap-2 items-end bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-2xl shadow-sm p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <button
              onClick={() => listening ? stopListening() : startListening(false)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${listening ? "bg-red-500 text-white animate-pulse" : "text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"}`}
              title={listening ? "Stop" : "Voice input"}
            >
              {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <textarea
              value={input || interim}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder={listening ? "Listening…" : t("chatPlaceholder")}
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none py-2 px-1 max-h-32 overflow-y-auto"
              style={{ minHeight: "36px" }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={(!input.trim() && !interim.trim()) || loading}
              className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">{t("chatDisclaimer")}</p>
        </div>
      )}

      {/* Voice mode bottom bar */}
      {voiceMode && (
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pb-6 pt-2 text-center">
          <button
            onClick={toggleVoiceMode}
            className="text-xs text-gray-400 hover:text-blue-600 transition-colors underline"
          >
            Switch to text mode
          </button>
        </div>
      )}
    </div>
  );
}