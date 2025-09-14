"use client";

import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

export function EmptyFileIcon(props: Props) {
  return (
    <svg
      width="214"
      height="103"
      viewBox="0 0 214 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // 외부에서 className, style, onClick 등 전달 가능
    >
      <path
        d="M44.8329 13C44.8329 11.8954 45.7283 11 46.8329 11H170.001C171.105 11 172.001 11.8954 172.001 13L172 101C172 102.105 171.105 103 170 103H46.832C45.7275 103 44.832 102.105 44.832 101L44.8329 13Z"
        fill="url(#paint0_linear_3768_24024)"
      />
      <path
        d="M28.5069 28.4114C28.2456 27.1685 29.194 26 30.4641 26H76.7876C77.5686 26 78.2781 26.4546 78.6045 27.1641L81.214 32.8359C81.5405 33.5454 82.25 34 83.031 34H154.23C155.158 34 155.965 34.6392 156.177 35.5433L171.424 100.543C171.718 101.798 170.766 103 169.477 103H45.8085C44.8625 103 44.0459 102.337 43.8513 101.411L28.5069 28.4114Z"
        fill="#F1F1F5"
      />
      <rect x="158" width="56" height="26" rx="13" fill="#C5C5C8" />
      <path
        d="M172 30.2338V26H182L173.514 31.0913C172.848 31.4912 172 31.0111 172 30.2338Z"
        fill="#C5C5C8"
      />
      <circle cx="180.5" cy="13.5" r="1.5" fill="#F1F1F5" />
      <circle cx="186.5" cy="13.5" r="1.5" fill="#F1F1F5" />
      <circle cx="192.5" cy="13.5" r="1.5" fill="#F1F1F5" />
      <rect
        width="56"
        height="26"
        rx="13"
        transform="matrix(-1 0 0 1 56 48)"
        fill="#C5C5C8"
      />
      <path
        d="M42 78.2338V74H32L40.4855 79.0913C41.152 79.4912 42 79.0111 42 78.2338Z"
        fill="#C5C5C8"
      />
      <circle
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="matrix(-1 0 0 1 35 60)"
        fill="#F1F1F5"
      />
      <circle
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="matrix(-1 0 0 1 29 60)"
        fill="#F1F1F5"
      />
      <circle
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="matrix(-1 0 0 1 23 60)"
        fill="#F1F1F5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3768_24024"
          x1="108.416"
          y1="11"
          x2="108.416"
          y2="153"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E1E1E4" />
          <stop offset="1" stopColor="#C5C5C8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
