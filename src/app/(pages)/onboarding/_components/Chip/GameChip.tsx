interface GameChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function GameChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: GameChipProps) {
  const backgroundColor = isSelected ? "#F7F1FB" : "#F1F1F5";
  const pathColor = isSelected ? "url(#paint0_linear_2218_13972)" : "#AAAAAD";

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
        d="M21.9834 17.4082L21.0751 11.0248C20.8418 9.38317 19.4334 8.1665 17.7751 8.1665H10.2251C8.56676 8.1665 7.15843 9.38317 6.92509 11.0248L6.01676 17.4082C5.83343 18.6915 6.82509 19.8332 8.11676 19.8332C8.68343 19.8332 9.21676 19.6082 9.61676 19.2082L11.5001 17.3332H16.5001L18.3751 19.2082C18.7751 19.6082 19.3168 19.8332 19.8751 19.8332C21.1751 19.8332 22.1668 18.6915 21.9834 17.4082ZM13.1668 13.1665H11.5001V14.8332H10.6668V13.1665H9.00009V12.3332H10.6668V10.6665H11.5001V12.3332H13.1668V13.1665ZM16.5001 12.3332C16.0418 12.3332 15.6668 11.9582 15.6668 11.4998C15.6668 11.0415 16.0418 10.6665 16.5001 10.6665C16.9584 10.6665 17.3334 11.0415 17.3334 11.4998C17.3334 11.9582 16.9584 12.3332 16.5001 12.3332ZM18.1668 14.8332C17.7084 14.8332 17.3334 14.4582 17.3334 13.9998C17.3334 13.5415 17.7084 13.1665 18.1668 13.1665C18.6251 13.1665 19.0001 13.5415 19.0001 13.9998C19.0001 14.4582 18.6251 14.8332 18.1668 14.8332Z"
        fill={pathColor}
      />
      {isSelected && (
        <defs>
          <linearGradient
            id="paint0_linear_2218_13972"
            x1="14.0001"
            y1="8.1665"
            x2="14.0001"
            y2="19.8332"
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
