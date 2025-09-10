"use client";

import React from "react";

type InfoTooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function InfoTooltip({ content, children, className = "" }: InfoTooltipProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <span
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span tabIndex={0} className="inline-flex items-center cursor-default">
        {children}
      </span>

      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 top-[28px] z-50"
        >
          <span className="relative block max-w-[620px] rounded-[8px] bg-[#1F1F1F] text-white px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
            {/* caret */}
            <span
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#1F1F1F]"
            />
            {content}
          </span>
        </span>
      )}
    </span>
  );
}


