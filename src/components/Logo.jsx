import React from "react";

const BASE44_LOGO = "https://media.base44.com/images/public/6a58169d7409d26e73f9d4a3/689e70458_base44.svg";
const TAVILY_LOGO = "https://media.base44.com/images/public/6a58169d7409d26e73f9d4a3/754d4c9ca_Dark_Tavily_Logo.png";

export default function Logo({ size = "md" }) {
  const sizes = {
    sm: { text: "text-base", powered: "text-[9px]", b44h: "h-3", tavh: "h-2.5" },
    md: { text: "text-xl", powered: "text-[10px]", b44h: "h-4", tavh: "h-3" },
    lg: { text: "text-2xl", powered: "text-xs", b44h: "h-5", tavh: "h-4" }
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-200 dark:shadow-orange-900/40 p-1">
        <img src="https://media.base44.com/images/public/6a58169d7409d26e73f9d4a3/0cb7d8c0d_image.png" alt="OnRamp" className="w-full h-full object-contain invert" />
      </div>
      <div className="flex flex-col leading-none gap-1">
        <span className={`font-heading font-extrabold text-gray-900 dark:text-white ${s.text} tracking-tight leading-none`}>
          OnRamp
        </span>
        <div className={`${s.powered} flex items-center gap-1 text-gray-400 dark:text-gray-500 font-medium tracking-wide uppercase`}>
          <span>Powered by</span>
          <img src={BASE44_LOGO} alt="Base44" className={`${s.b44h} object-contain dark:invert`} />
          <span>&amp;</span>
          <img src={TAVILY_LOGO} alt="Tavily" className={`${s.tavh} object-contain dark:invert`} />
        </div>
      </div>
    </div>
  );
}