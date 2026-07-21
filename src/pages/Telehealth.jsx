import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Stethoscope, Search, UserPlus, Globe, Video, Phone,
  MessageCircle, Filter, SlidersHorizontal, Users, BadgeCheck
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import DoctorCard from "@/components/telehealth/DoctorCard";
import CustomSelect from "@/components/ui/CustomSelect";
import ConsultationRequestModal from "@/components/telehealth/ConsultationRequestModal";
import ProviderRegistrationModal from "@/components/telehealth/ProviderRegistrationModal";

const ROLES = ["All Providers", "Doctor", "Endocrinologist", "Nurse", "Nurse Practitioner", "Diabetes Educator", "Dietitian"];
const MODES = ["Any Mode", "Video Call", "Phone Call", "Chat"];
const DIABETES_TYPES = ["All Types", "Type 1", "Type 2", "Prediabetes", "Gestational", "LADA"];

const STATS = [
  { value: "Global", label: "Providers Worldwide", icon: Globe },
  { value: "24/7", label: "Request Anytime", icon: MessageCircle },
  { value: "100%", label: "Diabetes-Focused", icon: BadgeCheck },
  { value: "Free", label: "To Request", icon: Video },
];

export default function Telehealth() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Providers");
  const [modeFilter, setModeFilter] = useState("Any Mode");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    base44.entities.DoctorProfile.filter({ status: "approved" })
      .then(setDoctors)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = doctors.filter(d => {
    if (roleFilter !== "All Providers" && d.role !== roleFilter) return false;
    if (modeFilter !== "Any Mode" && !d.consultation_modes?.includes(modeFilter)) return false;
    if (typeFilter !== "All Types" && !d.diabetes_types?.includes(typeFilter) && !d.diabetes_types?.includes("All Types")) return false;
    if (search) {
      const q = search.toLowerCase();
      const match = d.full_name?.toLowerCase().includes(q) ||
        d.country?.toLowerCase().includes(q) ||
        d.city?.toLowerCase().includes(q) ||
        d.specialty?.toLowerCase().includes(q) ||
        d.languages?.some(l => l.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950 pb-16 md:pb-0">
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 bg-blue-200/20 dark:bg-blue-900/10 pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 flex items-center justify-between sticky top-0 z-30 bg-blue-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-800" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}>
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="w-px h-5 bg-blue-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            <span className="font-heading font-bold text-base text-blue-900 dark:text-white">DiabetesHub Telehealth</span>
          </div>
        </div>
        <button
          onClick={() => setShowRegister(true)}
          className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Join as Provider</span>
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-32 w-32 h-32 rounded-full bg-white/5 translate-y-8" />
          <div className="relative max-w-2xl">
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">Global Diabetes Telehealth</p>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">Connect with a Diabetes Specialist — Anytime, Anywhere</h1>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Browse verified diabetes doctors, nurses, and educators from around the world. Request a consultation in minutes — they contact you directly.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map(s => (
                <div key={s.label} className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
                  <p className="font-bold text-lg">{s.value}</p>
                  <p className="text-blue-200 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, country, city, language, specialty…"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${showFilters ? "bg-blue-600 border-blue-600 text-white" : "bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-700 text-gray-600 hover:border-blue-400"}`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Filter dropdowns */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="grid sm:grid-cols-3 gap-3 mb-5">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Provider Role</label>
              <CustomSelect value={roleFilter} onChange={setRoleFilter} options={ROLES} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Consultation Mode</label>
              <CustomSelect value={modeFilter} onChange={setModeFilter} options={MODES} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Diabetes Type</label>
              <CustomSelect value={typeFilter} onChange={setTypeFilter} options={DIABETES_TYPES} />
            </div>
          </motion.div>
        )}

        {/* Role pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {ROLES.map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                roleFilter === r
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 border-blue-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600"
              }`}>
              {r}
              <span className={`ml-1.5 text-xs rounded-full px-1.5 font-semibold ${roleFilter === r ? "bg-blue-500 text-white" : "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"}`}>
                {r === "All Providers" ? doctors.length : doctors.filter(d => d.role === r).length}
              </span>
            </button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 p-5 animate-pulse">
                <div className="flex gap-3 mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded" />
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="font-semibold text-gray-500 dark:text-gray-400 mb-2">No providers found</p>
            <p className="text-sm text-gray-400 mb-6">Try adjusting your filters or search terms.</p>
            <button onClick={() => setShowRegister(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm">
              <UserPlus className="w-4 h-4" /> Be the first provider
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{filtered.length} provider{filtered.length !== 1 ? "s" : ""} found</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((doc, i) => (
                <DoctorCard key={doc.id} doctor={doc} delay={Math.min(i * 0.04, 0.4)} onRequest={setSelectedDoctor} />
              ))}
            </div>
          </>
        )}

        {/* Provider CTA banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-white">
            <h3 className="font-bold text-lg mb-1">Are you a diabetes healthcare professional?</h3>
            <p className="text-blue-200 text-sm">Join our global directory — doctors, nurses, educators, and dietitians welcome.</p>
          </div>
          <button onClick={() => setShowRegister(true)}
            className="flex-shrink-0 flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-lg">
            <UserPlus className="w-4 h-4" /> Register Now
          </button>
        </div>
      </div>

      {selectedDoctor && (
        <ConsultationRequestModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
      {showRegister && (
        <ProviderRegistrationModal onClose={() => setShowRegister(false)} />
      )}
    </div>
  );
}