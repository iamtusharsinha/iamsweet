import React from "react";
import { motion } from "framer-motion";
import { MapPin, Globe, Star, BadgeCheck, Video, Phone, MessageCircle, Clock } from "lucide-react";

const MODE_ICONS = { "Video Call": Video, "Phone Call": Phone, "Chat": MessageCircle };

const ROLE_COLORS = {
  "Doctor": "bg-blue-100 text-blue-700",
  "Endocrinologist": "bg-purple-100 text-purple-700",
  "Nurse": "bg-green-100 text-green-700",
  "Nurse Practitioner": "bg-teal-100 text-teal-700",
  "Diabetes Educator": "bg-orange-100 text-orange-700",
  "Dietitian": "bg-pink-100 text-pink-700",
};

export default function DoctorCard({ doctor, delay = 0, onRequest }) {
  const initials = doctor.full_name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl p-5 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20 hover:border-blue-300 transition-all flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          {doctor.photo_url ? (
            <img src={doctor.photo_url} alt={doctor.full_name} className="w-14 h-14 rounded-2xl object-cover" />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
              {initials}
            </div>
          )}
          {doctor.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
              <BadgeCheck className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">{doctor.full_name}</h3>
            {doctor.rating > 0 && (
              <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold flex-shrink-0">
                <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                {doctor.rating.toFixed(1)}
                <span className="text-gray-400 font-normal">({doctor.review_count})</span>
              </div>
            )}
          </div>
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${ROLE_COLORS[doctor.role] || "bg-gray-100 text-gray-600"}`}>
            {doctor.role}
          </span>
          {doctor.credentials && (
            <p className="text-xs text-gray-400 mt-0.5">{doctor.credentials}</p>
          )}
        </div>
      </div>

      {/* Location & Languages */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
        {(doctor.city || doctor.country) && (
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{[doctor.city, doctor.country].filter(Boolean).join(", ")}</span>
        )}
        {doctor.languages?.length > 0 && (
          <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{doctor.languages.slice(0, 3).join(", ")}</span>
        )}
        {doctor.years_experience && (
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{doctor.years_experience} yrs exp</span>
        )}
      </div>

      {/* Bio */}
      {doctor.bio && (
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{doctor.bio}</p>
      )}

      {/* Diabetes types */}
      {doctor.diabetes_types?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {doctor.diabetes_types.map(t => (
            <span key={t} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
      )}

      {/* Consultation modes */}
      {doctor.consultation_modes?.length > 0 && (
        <div className="flex gap-2">
          {doctor.consultation_modes.map(m => {
            const Icon = MODE_ICONS[m] || MessageCircle;
            return (
              <span key={m} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-lg">
                <Icon className="w-3 h-3" />{m}
              </span>
            );
          })}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => onRequest(doctor)}
        disabled={!doctor.accepting_patients}
        className={`mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
          doctor.accepting_patients
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
      >
        {doctor.accepting_patients ? "Request Consultation" : "Not Accepting Patients"}
      </button>
    </motion.div>
  );
}