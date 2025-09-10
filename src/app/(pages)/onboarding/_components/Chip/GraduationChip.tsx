interface GraduationChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export function GraduationChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
}: GraduationChipProps) {
  const backgroundColor = isSelected ? "#F7F1FB" : "#F1F1F5";
  const primaryFill = isSelected ? "url(#paint0_linear_2901_3027)" : "#AAAAAD";
  const accentStroke = isSelected ? "#6F00B6" : "#AAAAAD";
  const accentFill = isSelected ? "#8561FF" : "#AAAAAD";
  const circleFill = isSelected ? "#7951FF" : "#767678";
  const borderStroke = isSelected ? "#DACFFF" : "#E4E4E7";

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
        stroke={borderStroke}
        strokeWidth="1.4"
      />
      <path
        d="M11 19.0952C11 18.4904 11.4904 18 12.0952 18H31.9048C32.5096 18 33 18.4904 33 19.0952V29.4477C33 29.8828 32.7425 30.2766 32.3439 30.451L22.3926 34.8069C22.1115 34.93 21.7917 34.9294 21.511 34.8055L11.6528 30.4521C11.256 30.2769 11 29.884 11 29.4502L11 19.0952Z"
        fill={primaryFill}
      />
      <path d="M35.0952 18V25.5672" stroke={accentStroke} strokeWidth="1.09524" />
      <path
        d="M7.57206 16.667L21.2962 11.2862C21.7655 11.1022 22.2869 11.1022 22.7562 11.2862L36.4803 16.667C37.4039 17.0291 37.4088 18.3342 36.488 18.7033L22.4337 24.3367C22.1721 24.4415 21.8803 24.4415 21.6187 24.3367L7.56434 18.7033C6.6436 18.3342 6.64854 17.0291 7.57206 16.667Z"
        fill={accentFill}
      />
      <circle cx="35.0952" cy="25.6656" r="1.09524" fill={circleFill} />
      {isSelected && (
        <defs>
          <linearGradient id="paint0_linear_2901_3027" x1="22" y1="35" x2="22" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6D42FF" />
            <stop offset="1" stopColor="#6342D2" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
}
