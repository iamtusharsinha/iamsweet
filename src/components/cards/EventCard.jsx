import React from "react";
import { ExternalLink, MapPin, Calendar, Users, Shield, BookOpen, Globe } from "lucide-react";
import moment from "moment";

function buildGoogleCalendarUrl(event) {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const title = encodeURIComponent(event.title || "");
  const details = encodeURIComponent((event.description || "") + (event.url ? `\n\nMore info: ${event.url}` : ""));
  const location = encodeURIComponent(event.location || (event.is_online ? "Online" : ""));

  // Format: YYYYMMDD or YYYYMMDDTHHmmssZ
  const fmt = (d) => moment(d).format("YYYYMMDD");
  const start = event.date ? fmt(event.date) : fmt(new Date());
  const end = event.end_date ? fmt(event.end_date) : fmt(moment(event.date || new Date()).add(1, "day"));

  return `${base}&text=${title}&details=${details}&location=${location}&dates=${start}/${end}`;
}

export default function EventCard({ event, showLearnFirst = true }) {
  const typeColors = {
    hackathon: "bg-orange-50 text-orange-700",
    meetup: "bg-blue-50 text-blue-700",
    workshop: "bg-violet-50 text-violet-700",
    talk: "bg-cyan-50 text-cyan-700",
    study_group: "bg-amber-50 text-amber-700",
    networking: "bg-pink-50 text-pink-700"
  };

  const formattedDate = event.date ? moment(event.date).format("MMM D, YYYY") : null;
  const isUpcoming = event.date ? moment(event.date).isAfter(moment()) : true;

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-orange-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:shadow-orange-100/50 dark:hover:shadow-none hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${typeColors[event.type] || "bg-gray-50 text-gray-700"}`}>
            {event.type?.replace("_", " ")}
          </span>
          {event.beginner_safe && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Beginner Safe
            </span>
          )}
          {!event.beginner_safe && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
              Stretch
            </span>
          )}
        </div>

        <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
          {event.title}
        </h3>

        {event.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
          {formattedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-orange-500" /> {formattedDate}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1">
              {event.is_online ? <Globe className="w-3.5 h-3.5 text-blue-500" /> : <MapPin className="w-3.5 h-3.5 text-red-400" />}
              {event.location}
            </span>
          )}
          {event.attendees_count > 0 && (
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-gray-400" /> {event.attendees_count.toLocaleString()}
            </span>
          )}
        </div>

        {event.beginner_safe && event.beginner_safe_reason && (
          <div className="bg-orange-50/60 dark:bg-orange-900/20 rounded-xl p-3 mb-3 border border-orange-100 dark:border-orange-900/40">
            <p className="text-xs text-orange-600 font-medium">🛡️ Why it's safe for beginners</p>
            <p className="text-sm text-orange-900 dark:text-orange-300 mt-1">{event.beginner_safe_reason}</p>
          </div>
        )}

        {showLearnFirst && event.learn_first_course && (
          <div className="bg-blue-50/60 rounded-xl p-3 mb-3 border border-blue-100">
            <p className="text-xs text-blue-700 font-medium flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Learn this first
            </p>
            <p className="text-sm text-blue-800 mt-1">{event.learn_first_course}</p>
          </div>
        )}

        <div className="flex items-center gap-2 mt-3">
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium bg-orange-500 text-white px-4 py-2.5 rounded-xl hover:bg-orange-600 transition-colors"
          >
            Register <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={buildGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            title="Add to Google Calendar"
            className="flex-shrink-0 w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
          >
            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  );
}