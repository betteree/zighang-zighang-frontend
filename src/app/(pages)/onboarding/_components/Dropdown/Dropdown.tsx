"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/app/_utils/cn";

interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  placeholder: string;
  options: Array<string | DropdownOption>;
  value: string | null;
  onChange: (next: string) => void;
  className?: string;
  disabled?: boolean;
}

const PANEL_MAX_HEIGHT_PX = 508;

export default function Dropdown({
  placeholder,
  options,
  value,
  onChange,
  className,
  disabled = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const normalizedOptions = useMemo<DropdownOption[]>(
    () =>
      options.map((opt) =>
        typeof opt === "string" ? { value: opt, label: opt } : opt
      ),
    [options]
  );

  const selectedLabel = useMemo(() => {
    if (!value) return "";
    const found = normalizedOptions.find((o) => o.value === value);
    return found?.label ?? value;
  }, [value, normalizedOptions]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!rootRef.current) return;
      if (rootRef.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    setOpen((o) => !o);
  }, [disabled]);
  const handleSelect = useCallback(
    (next: string) => {
      onChange(next);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <div
      ref={rootRef}
      className={`relative w-full min-w-[240px] md:w-[509px] ${
        className ?? ""
      }`}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-disabled={disabled}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between rounded-xl border bg-white px-4 py-3 text-left",
          open ? "border-[#303030]" : "border-line",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={
            value
              ? "text-foreground text-Navigation1-16m"
              : "text-zighangtext-60 text-Navigation1-16m"
          }
        >
          {value ? selectedLabel : placeholder}
        </span>
        <ChevronIcon direction={open ? "up" : "down"} />
      </button>

      {open && !disabled && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 z-50 w-full overflow-hidden rounded-[8px] border border-[#C5C5C8] bg-white"
          style={{ maxHeight: PANEL_MAX_HEIGHT_PX, overflowY: "auto" }}
          aria-label={placeholder}
        >
          <ul className="divide-y divide-line px-4 py-[2px] text-Navigation1-16m">
            {normalizedOptions.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  className="w-full text-left py-[10px] cursor-pointer"
                  onClick={() => handleSelect(opt.value)}
                  role="option"
                  aria-selected={value === opt.value}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  const rotation = direction === "down" ? "rotate-0" : "rotate-180";
  return (
    <svg
      className={`h-5 w-5 text-zinc-500 transition-transform ${rotation}`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 8l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
