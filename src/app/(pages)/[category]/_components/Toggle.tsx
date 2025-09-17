"use client";
import { useState } from "react";

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="flex items-center gap-1.5 rounded-[10px] p-2 cursor-pointer"
    >
      <div className="relative inline-flex cursor-pointer items-center">
        <div
          className={`
            h-5 w-9 rounded-full transition-colors relative
            ${enabled ? "bg-[#7a52ff]" : "bg-gray-200"}
            after:absolute after:left-[2px] after:top-[2px]
            after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-md
            after:transition-all after:content-['']
            ${enabled ? "after:translate-x-4" : ""}
          `}
        ></div>
      </div>
    </button>
  );
}
