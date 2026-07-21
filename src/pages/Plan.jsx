import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { matchCourse, matchEvents, generateWhyLine } from "@/lib/matcherEngine";
import CourseCard from "@/components/cards/CourseCard";
import EventCard from "@/components/cards/EventCard";
import Logo from "@/components/Logo";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useToast } from "@/components/ui/use-toast";

export default function Plan() {
  const [course, setCourse] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const params = new URLSearchParams(window.location.search);
  const answers = {
    level: params.get("level") || "beginner",
    goal: params.get("goal") || "explore",
    city: params.get("city") || "online_only",
    hours: params.get("hours") || "4-7",
    motivation: params.get("motivation") || "curious"
  };

  useEffect(() => {
    async function loadPlan() {
      try {
        const [allCourses, allEvents] = await Promise.all([
          base44.entities.Course.list(),
          base44.entities.Event.list()
        ]);
        setCourse(matchCourse(allCourses, answers));
        setEvents(matchEvents(allEvents, answers, 3));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadPlan();
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await base44.entities.PlanCapture.create({
        email,
        level: answers.level,
        goal: answers.goal,
        motivation: answers.motivation,
        city: answers.city,
        hours_per_week: answers.hours,
        plan_course_id: course?.id || "",
        plan_event_ids: events.map(ev => ev.id)
      });
      setEmailSent(true);
      toast({ title: "Plan saved!", description: "We'll send you your plan and nudge you when it's time for step 2." });
    } catch (err) {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: "linear-gradient(135deg, #fff7f0 0%, #fff3e8 50%, #ffecd6 100%)"}}>
        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{background: "linear-gradient(160deg, #fff7f0 0%, #fff3e8 30%, #fffaf7 70%, #fff 100%)"}}>
      {/* Header */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <Logo size="sm" />
        </Link>
        <DarkModeToggle />
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-20">
        {/* Plan Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> Your personal plan
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
            Here's your next step
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Not 500 options. Just the right ones for you.
          </p>

          {/* Progress steps */}
          <div className="flex items-center justify-center gap-3 mt-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5 text-orange-500 font-medium">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">1</span>
              Learn
            </span>
            <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700" />
            <span className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-xs">2</span>
              Show up
            </span>
            <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700" />
            <span className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-xs">3</span>
              Build
            </span>
          </div>
        </motion.div>

        {/* Step 1: Course */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="flex items-center gap-3 text-lg font-heading font-semibold text-gray-900 dark:text-white mb-4">
            <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm flex-shrink-0">①</span>
            Start here — this week
          </h2>
          {course && (
            <CourseCard
              course={course}
              whyLine={generateWhyLine(answers.motivation, course)}
            />
          )}
        </motion.div>

        {/* Step 2: Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <h2 className="flex items-center gap-3 text-lg font-heading font-semibold text-gray-900 dark:text-white mb-4">
            <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm flex-shrink-0">②</span>
            Show up here — this month
          </h2>
          <div className="space-y-4">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Email capture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100/70 shadow-sm shadow-orange-50"
        >
          {emailSent ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-orange-500 mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-lg mb-1">You're in!</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your plan is saved. We'll nudge you when it's time for step 2.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white">Email me my plan</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Get your plan in your inbox — plus a weekly "do this next" nudge when it's time for step 2.
                  </p>
                </div>
              </div>
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl border border-orange-200/60 bg-white/80 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium text-sm hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {submitting ? "..." : "Send"}
                </button>
              </form>
            </>
          )}
        </motion.div>

        {/* Browse all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-8"
        >
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
          >
            Browse all courses & events <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}