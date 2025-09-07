interface StrategyChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function StrategyChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: StrategyChipProps) {
  const backgroundColor = isSelected ? "#F7F1FB" : "#F1F1F5";
  const pathColor = isSelected ? "url(#paint0_linear_2218_14302)" : "#AAAAAD";

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
        d="M19.8333 7.33317H16.35C16 6.3665 15.0833 5.6665 14 5.6665C12.9167 5.6665 12 6.3665 11.65 7.33317H8.16667C7.25 7.33317 6.5 8.08317 6.5 8.99984V20.6665C6.5 21.5832 7.25 22.3332 8.16667 22.3332H19.8333C20.75 22.3332 21.5 21.5832 21.5 20.6665V8.99984C21.5 8.08317 20.75 7.33317 19.8333 7.33317ZM14 7.33317C14.4583 7.33317 14.8333 7.70817 14.8333 8.1665C14.8333 8.62484 14.4583 8.99984 14 8.99984C13.5417 8.99984 13.1667 8.62484 13.1667 8.1665C13.1667 7.70817 13.5417 7.33317 14 7.33317ZM14.8333 18.9998H10.6667C10.2083 18.9998 9.83333 18.6248 9.83333 18.1665C9.83333 17.7082 10.2083 17.3332 10.6667 17.3332H14.8333C15.2917 17.3332 15.6667 17.7082 15.6667 18.1665C15.6667 18.6248 15.2917 18.9998 14.8333 18.9998ZM17.3333 15.6665H10.6667C10.2083 15.6665 9.83333 15.2915 9.83333 14.8332C9.83333 14.3748 10.2083 13.9998 10.6667 13.9998H17.3333C17.7917 13.9998 18.1667 14.3748 18.1667 14.8332C18.1667 15.2915 17.7917 15.6665 17.3333 15.6665ZM17.3333 12.3332H10.6667C10.2083 12.3332 9.83333 11.9582 9.83333 11.4998C9.83333 11.0415 10.2083 10.6665 10.6667 10.6665H17.3333C17.7917 10.6665 18.1667 11.0415 18.1667 11.4998C18.1667 11.9582 17.7917 12.3332 17.3333 12.3332Z"
        fill={pathColor}
      />
      {isSelected && (
        <defs>
          <linearGradient
            id="paint0_linear_2218_14302"
            x1="14"
            y1="5.6665"
            x2="14"
            y2="22.3332"
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
