import React from "react";

export function InfoCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.0043 14.8984V9.62087M10.0002 18.4167C12.0998 18.4167 14.1134 17.5826 15.5981 16.098C17.0828 14.6133 17.9168 12.5997 17.9168 10.5C17.9168 8.40041 17.0828 6.38677 15.5981 4.90211C14.1134 3.41745 12.0998 2.58337 10.0002 2.58337C7.90053 2.58337 5.8869 3.41745 4.40223 4.90211C2.91757 6.38677 2.0835 8.40041 2.0835 10.5C2.0835 12.5997 2.91757 14.6133 4.40223 16.098C5.8869 17.5826 7.90053 18.4167 10.0002 18.4167Z"
        stroke="#767678"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.96338 6.70251H9.97171"
        stroke="#767678"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


