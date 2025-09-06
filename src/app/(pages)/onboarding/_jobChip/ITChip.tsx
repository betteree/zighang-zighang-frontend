interface ITChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function ITChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: ITChipProps) {
  const backgroundColor = isSelected ? "#F7F1FB" : "#F1F1F5";
  const pathColor = isSelected ? "url(#paint0_linear_2218_14301)" : "#AAAAAD";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {!backgroundless && (
        <rect width="28" height="28" rx="14" fill={backgroundColor} />
      )}
      <path
        d="M20.6667 19.0002C21.5833 19.0002 22.325 18.2502 22.325 17.3335L22.3333 9.00016C22.3333 8.0835 21.5833 7.3335 20.6667 7.3335H7.33333C6.41667 7.3335 5.66667 8.0835 5.66667 9.00016V17.3335C5.66667 18.2502 6.41667 19.0002 7.33333 19.0002H4.83333C4.375 19.0002 4 19.3752 4 19.8335C4 20.2918 4.375 20.6668 4.83333 20.6668H23.1667C23.625 20.6668 24 20.2918 24 19.8335C24 19.3752 23.625 19.0002 23.1667 19.0002H20.6667ZM8.16667 9.00016H19.8333C20.2917 9.00016 20.6667 9.37516 20.6667 9.8335V16.5002C20.6667 16.9585 20.2917 17.3335 19.8333 17.3335H8.16667C7.70833 17.3335 7.33333 16.9585 7.33333 16.5002V9.8335C7.33333 9.37516 7.70833 9.00016 8.16667 9.00016Z"
        fill={pathColor}
      />
      {isSelected && (
        <defs>
          <linearGradient
            id="paint0_linear_2218_14301"
            x1="14"
            y1="7.3335"
            x2="14"
            y2="20.6668"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6F00B6" />
            <stop offset="1" stopColor="#6F00B6" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
}
