import * as React from "react";

interface LawComplianceIconProps extends React.SVGProps<SVGSVGElement> {
  isSelected?: boolean;
}

export function LawComplianceIcon({
  isSelected = false,
  ...props
}: LawComplianceIconProps) {
  return (
    <svg
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={
        isSelected
          ? "[filter:drop-shadow(0_0_8px_rgba(182,247,213,0.85))_drop-shadow(0_0_16px_rgba(182,247,213,0.45))]"
          : ""
      }
      {...props}
    >
      <rect x="0.460205" width="50" height="50" rx="8.33333" fill="#B6F7D5" />

      <rect
        x="18.4602"
        y="20"
        width="18"
        height="5"
        transform="rotate(90 18.4602 20)"
        fill="#0A9E55"
      />
      <rect
        x="27.4602"
        y="20"
        width="18"
        height="5"
        transform="rotate(90 27.4602 20)"
        fill="#0A9E55"
      />
      <rect
        x="36.4602"
        y="20"
        width="18"
        height="5"
        transform="rotate(90 36.4602 20)"
        fill="#0A9E55"
      />
      <path
        d="M23.4827 9.17462C24.3467 8.48711 25.5709 8.48711 26.4348 9.17462L38.638 18.886C40.3936 20.2831 39.4056 23.1111 37.1619 23.1111H12.7556C10.5119 23.1111 9.52394 20.2831 11.2796 18.886L23.4827 9.17462Z"
        fill="#1DD075"
      />
      <rect
        x="10.1422"
        y="34.0742"
        width="29.6296"
        height="5.92593"
        rx="2.37037"
        fill="#1DD075"
      />
    </svg>
  );
}
