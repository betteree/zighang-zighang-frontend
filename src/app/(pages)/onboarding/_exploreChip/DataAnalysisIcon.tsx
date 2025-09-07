interface DataAnalysisIconProps extends React.SVGProps<SVGSVGElement> {
  isSelected?: boolean;
}

export function DataAnalysisIcon({
  isSelected = false,
  ...props
}: DataAnalysisIconProps) {
  return (
    <svg
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={
        isSelected
          ? "[filter:drop-shadow(0_0_8px_rgba(177,223,255,0.85))_drop-shadow(0_0_16px_rgba(177,223,255,0.45))]"
          : ""
      }
      {...props}
    >
      <rect x="0.22583" width="50" height="50" rx="8.33333" fill="#B1DFFF" />
      <rect
        x="8.56055"
        y="8.3335"
        width="33.3333"
        height="33.3333"
        rx="5.55556"
        fill="#45B3FF"
      />
      <path
        d="M25.2246 8.3335V42.5928"
        stroke="#B1DFFF"
        strokeWidth={1.85185}
      />
      <path d="M42.8197 25L8.56044 25" stroke="#B1DFFF" strokeWidth={1.85185} />
      <path
        d="M12.7246 16.6665H21.0579"
        stroke="#002D4C"
        strokeWidth={1.50489}
      />
      <path
        d="M30.4343 32.2915H37.726"
        stroke="#002D4C"
        strokeWidth={1.50489}
      />
      <path
        d="M30.4343 35.4165H37.726"
        stroke="#002D4C"
        strokeWidth={1.50489}
      />
      <path
        d="M12.7246 33.3335H21.0579"
        stroke="#002D4C"
        strokeWidth={1.50489}
      />
      <path
        d="M30.4343 13.5415L36.3269 19.4341"
        stroke="#002D4C"
        strokeWidth={1.50489}
      />
      <path
        d="M16.8899 29.1665L16.8899 37.4998"
        stroke="#002D4C"
        strokeWidth={1.50489}
      />
      <path
        d="M36.6334 13.5439L30.7409 19.4365"
        stroke="#002D4C"
        strokeWidth={1.50489}
      />
    </svg>
  );
}
