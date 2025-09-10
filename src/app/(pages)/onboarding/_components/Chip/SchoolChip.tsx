interface SchoolChipProps {
  width?: number;
  height?: number;
  className?: string;
}

export function SchoolChip({
  width = 28,
  height = 28,
  className,
}: SchoolChipProps) {
  const backgroundColor = "#F7F1FB";
  const primaryFill = "url(#paint0_linear_2901_3026)";
  const accentFill = "#6F00B6";
  const accentStroke = "#6F00B6";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="0.7" y="0.7" width="42.6" height="42.6" rx="21.3" fill={backgroundColor} />
      <rect
        x="0.7"
        y="0.7"
        width="42.6"
        height="42.6"
        rx="21.3"
        stroke="#DACFFF"
        strokeWidth="1.4"
      />
      <path
        d="M22 7H26.7679C26.8961 7 27 7.10393 27 7.23213V9.76787C27 9.89607 26.8961 10 26.7679 10H22V7Z"
        fill={accentFill}
      />
      <path
        d="M22.2319 7.00049V11.9432"
        stroke={accentStroke}
        strokeWidth="0.928534"
        strokeLinecap="round"
      />
      <path
        d="M21.8218 11.7979C22.0801 11.6708 22.3837 11.6708 22.6421 11.7979L30.5337 15.6787C30.8512 15.8348 31.0531 16.1579 31.0532 16.5117V20H34.0015C34.5537 20 35.0014 20.4478 35.0015 21V32C35.0015 32.5523 34.5537 33 34.0015 33H10.0015C9.44918 33 9.00146 32.5523 9.00146 32V21C9.00154 20.4478 9.44922 20 10.0015 20H13.4106V16.5117C13.4107 16.1579 13.6126 15.8348 13.9302 15.6787L21.8218 11.7979Z"
        fill={primaryFill}
      />
      <path
        d="M19 25.9285C19 25.4157 19.4157 25 19.9285 25H25.0355C25.5483 25 25.964 25.4157 25.964 25.9285V32.8925H19V25.9285Z"
        fill="#A387FF"
      />
      <rect
        x="20.6074"
        y="15.4258"
        width="3.24987"
        height="3.24987"
        rx="0.232133"
        fill="#A387FF"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2901_3026"
          x1="22.4998"
          y1="12"
          x2="18.9995"
          y2="34.001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7951FF" />
          <stop offset="1" stopColor="#6A3EFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.7" y="0.7" width="42.6" height="42.6" rx="21.3" fill="#F7F1FB"/>
<rect x="0.7" y="0.7" width="42.6" height="42.6" rx="21.3" stroke="#DACFFF" stroke-width="1.4"/>
<path d="M22 7H26.7679C26.8961 7 27 7.10393 27 7.23213V9.76787C27 9.89607 26.8961 10 26.7679 10H22V7Z" fill="#7951FF"/>
<path d="M22.2319 7.00049V11.9432" stroke="black" stroke-width="0.928534" stroke-linecap="round"/>
<path d="M21.8218 11.7979C22.0801 11.6708 22.3837 11.6708 22.6421 11.7979L30.5337 15.6787C30.8512 15.8348 31.0531 16.1579 31.0532 16.5117V20H34.0015C34.5537 20 35.0014 20.4478 35.0015 21V32C35.0015 32.5523 34.5537 33 34.0015 33H10.0015C9.44918 33 9.00146 32.5523 9.00146 32V21C9.00154 20.4478 9.44922 20 10.0015 20H13.4106V16.5117C13.4107 16.1579 13.6126 15.8348 13.9302 15.6787L21.8218 11.7979Z" fill="url(#paint0_linear_2901_3026)"/>
<path d="M19 25.9285C19 25.4157 19.4157 25 19.9285 25H25.0355C25.5483 25 25.964 25.4157 25.964 25.9285V32.8925H19V25.9285Z" fill="#A387FF"/>
<rect x="20.6074" y="15.4258" width="3.24987" height="3.24987" rx="0.232133" fill="#A387FF"/>
<defs>
<linearGradient id="paint0_linear_2901_3026" x1="22.4998" y1="12" x2="18.9995" y2="34.001" gradientUnits="userSpaceOnUse">
<stop stop-color="#7951FF"/>
<stop offset="1" stop-color="#6A3EFF"/>
</linearGradient>
</defs>
</svg>
