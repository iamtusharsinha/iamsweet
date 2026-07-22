import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Twitter, Github, Heart, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Opens default mail client with pre-filled content as a lightweight contact method
    const subject = encodeURIComponent(`iamsweet contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:hello@iamsweet.app?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950 pb-16 md:pb-0">
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pb-4 flex items-center sticky top-0 z-30 bg-blue-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-800" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}>
        <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30 mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Have a question, suggestion, or want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Send a message</h2>

            {submitted ? (
              <div className="flex flex-col items-center text-center py-8 gap-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <p className="font-semibold text-gray-900 dark:text-white">Thanks for reaching out!</p>
                <p className="text-sm text-gray-500">Your mail client should have opened. We'll get back to you soon.</p>
                <button onClick={() => setSubmitted(false)} className="text-sm text-blue-600 hover:underline">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Your name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Tell us how we can help…"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-md shadow-blue-600/25"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
              </div>
              <a href="mailto:hello@iamsweet.app" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                hello@iamsweet.app
              </a>
              <p className="text-xs text-gray-400 mt-1">We aim to respond within 48 hours.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center">
                  <Twitter className="w-4 h-4 text-sky-500" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Twitter / X</h3>
              </div>
              <a href="https://twitter.com/iamsweet" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                @iamsweet
              </a>
              <p className="text-xs text-gray-400 mt-1">DM us or tag us in your diabetes journey.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Github className="w-4 h-4 text-gray-700 dark:text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">GitHub</h3>
              </div>
              <a href="https://github.com/iamsweet" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                github.com/iamsweet
              </a>
              <p className="text-xs text-gray-400 mt-1">Open source projects and contributions.</p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/10 rounded-2xl p-6 border border-rose-100 dark:border-rose-800/40">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Our promise</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                iamsweet is built with love for the diabetes community. Every message we receive helps us build a better platform. Thank you for being part of our mission.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}