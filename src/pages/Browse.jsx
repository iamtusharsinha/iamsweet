import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, BookOpen, Wrench, FileText, GraduationCap, Calendar, X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import CourseCard from "@/components/cards/CourseCard";
import EventCard from "@/components/cards/EventCard";
import Logo from "@/components/Logo";
import DarkModeToggle from "@/components/DarkModeToggle";

const RESOURCE_TABS = [
  { key: "all", label: "All", icon: null },
  { key: "course", label: "Courses", icon: BookOpen },
  { key: "tool", label: "AI Tools", icon: Wrench },
  { key: "research_paper", label: "Research", icon: FileText },
  { key: "phd_funding", label: "PhD Funding", icon: GraduationCap },
  { key: "events", label: "Events", icon: Calendar }
];

const EVENT_TYPES = [
  { key: "all", label: "All Events" },
  { key: "hackathon", label: "Hackathons" },
  { key: "meetup", label: "Meetups" },
  { key: "networking", label: "Networking" },
  { key: "workshop", label: "Workshops" },
  { key: "talk", label: "Talks" },
  { key: "study_group", label: "Study Groups" }
];

export default function Browse() {
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [eventType, setEventType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [c, e] = await Promise.all([
          base44.entities.Course.list(),
          base44.entities.Event.list()
        ]);
        setCourses(c);
        setEvents(e);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const query = searchQuery.toLowerCase();

  const filteredCourses = courses.filter(c => {
    if (activeTab !== "all" && activeTab !== "events" && c.category !== activeTab) return false;
    if (activeTab === "events") return false;
    if (query && !c.title.toLowerCase().includes(query) && !c.provider?.toLowerCase().includes(query) && !(c.tags || []).some(t => t.toLowerCase().includes(query))) return false;
    return true;
  });

  const filteredEvents = events.filter(e => {
    if (activeTab !== "all" && activeTab !== "events") return false;
    if (activeTab === "events" && eventType !== "all" && e.type !== eventType) return false;
    if (query && !e.title.toLowerCase().includes(query) && !e.location?.toLowerCase().includes(query) && !(e.tags || []).some(t => t.toLowerCase().includes(query))) return false;
    return true;
  });

  const totalCount = filteredCourses.length + filteredEvents.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-orange-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <Logo size="sm" />
            </Link>
            <DarkModeToggle />
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
            Browse everything
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {totalCount} curated resources across courses, tools, events, research, and funding.
          </p>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, events, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-orange-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-orange-100 dark:border-gray-800 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
            {RESOURCE_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setEventType("all"); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Event sub-filters */}
      {activeTab === "events" && (
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {EVENT_TYPES.map(t => (
              <button
                key={t.key}
                onClick={() => setEventType(t.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  eventType === t.key
                    ? "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredCourses.length > 0 && (
          <div className="mb-12">
            {activeTab === "all" && (
              <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-5">
                Learning & Resources
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {filteredEvents.length > 0 && (
          <div>
            {activeTab === "all" && (
              <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-5">
                Events & Rooms
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <EventCard event={event} showLearnFirst={false} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {totalCount === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No results found</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}