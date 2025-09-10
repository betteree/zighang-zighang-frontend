"use client";

import React from "react";

type NoteIconProps = {
  status: "saving" | "success" | "error";
  className?: string;
};

export function NoteIcon({ status, className }: NoteIconProps) {
  switch (status) {
    case "saving":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="저장 중"
          role="img"
        >
          <g clipPath="url(#clip0_1601_21512)">
            <path
              d="M0.583984 2.33325V5.83325H4.08398"
              stroke="#AAAAAD"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.416 11.6667V8.16675H9.91602"
              stroke="#AAAAAD"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.9532 5.24984C11.6573 4.4138 11.1545 3.66633 10.4916 3.07717C9.82877 2.48801 9.02746 2.07637 8.16248 1.88066C7.29751 1.68495 6.39704 1.71154 5.54512 1.95796C4.6932 2.20438 3.91759 2.66259 3.29065 3.28984L0.583984 5.83317M13.4173 8.16651L10.7107 10.7098C10.0837 11.3371 9.3081 11.7953 8.45618 12.0417C7.60426 12.2881 6.7038 12.3147 5.83882 12.119C4.97384 11.9233 4.17253 11.5117 3.50967 10.9225C2.84681 10.3334 2.344 9.58588 2.04815 8.74984"
              stroke="#AAAAAD"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_1601_21512">
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );

    case "success":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M2 7.57143L5 11L12 3"
            stroke="#6FDB93"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "error":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M8.16732 4.66667H11.084V1.75M10.9142 9.54155C10.3707 10.3786 9.57307 11.0193 8.63854 11.3696C7.70402 11.7199 6.68157 11.7614 5.72172 11.488C4.76187 11.2146 3.91521 10.6408 3.30558 9.85059C2.69595 9.06039 2.35555 8.09551 2.33465 7.0977C2.31375 6.09989 2.61332 5.12167 3.18933 4.30664C3.76534 3.49161 4.58764 2.88283 5.5352 2.56946C6.48275 2.25608 7.50577 2.25458 8.45414 2.56547C9.40252 2.87636 10.2261 3.48305 10.8043 4.29658"
            stroke="#FAB4B4"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
}
