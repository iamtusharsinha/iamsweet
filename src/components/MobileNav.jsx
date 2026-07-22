import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, ChefHat, Stethoscope, MessageCircle, Home } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function MobileNav() {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const NAV = [
    { to: "/", icon: Home, label: t("home") },
    { to: "/care", icon: Heart, label: t("care") },
    { to: "/meals", icon: ChefHat, label: t("meals") },
    { to: "/telehealth", icon: Stethoscope, label: t("doctors") },
    { to: "/chat", icon: MessageCircle, label: t("askAI") },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="flex items-center justify-around px-2 py-2">
        {NAV.map(({ to, icon: Icon, label }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-0 ${
                active
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "stroke-[2.5px]" : ""}`} />
              <span className={`text-[10px] font-medium leading-none ${active ? "font-bold" : ""}`}>
                {label}
              </span>
              {active && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}