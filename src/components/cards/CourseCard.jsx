import React from "react";
import { ExternalLink, BookOpen, Clock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CourseCard({ course, whyLine, compact = false }) {
  const categoryColors = {
    course: "bg-blue-50 text-blue-700",
    tool: "bg-purple-50 text-purple-700",
    research_paper: "bg-amber-50 text-amber-700",
    phd_funding: "bg-rose-50 text-rose-700"
  };

  const categoryLabels = {
    course: "Course",
    tool: "AI Tool",
    research_paper: "Research Paper",
    phd_funding: "PhD Funding"
  };

  return (
    <div className={`group bg-white dark:bg-gray-800 rounded-2xl border border-orange-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:shadow-orange-100/50 dark:hover:shadow-none hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300`}>
      {course.image_url && !compact && (
        <div className="h-36 overflow-hidden">
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[course.category] || categoryColors.course}`}>
            {categoryLabels[course.category] || "Course"}
          </span>
          {course.beginner_safe && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Beginner Safe
            </span>
          )}
          {course.price && (
            <span className="text-xs text-gray-500">{course.price}</span>
          )}
        </div>

        <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{course.provider}</p>

        {!compact && course.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{course.description}</p>
        )}

        {whyLine && (
          <div className="bg-orange-50/60 dark:bg-orange-900/20 rounded-xl p-3 mb-3 border border-orange-100 dark:border-orange-900/40">
            <p className="text-xs text-orange-600 font-medium">✨ Why this fits you</p>
            <p className="text-sm text-orange-900 dark:text-orange-300 mt-1">{whyLine}</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {course.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {course.duration}
              </span>
            )}
          </div>
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
          >
            Open <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}