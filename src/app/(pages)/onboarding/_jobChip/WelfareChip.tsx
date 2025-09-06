interface WelfareChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function WelfareChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: WelfareChipProps) {
  const backgroundColor = isSelected ? "#FFF2EC" : "#F1F1F5";
  const pathColor = isSelected ? "#EF5108" : "#AAAAAD";

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
        d="M6.91667 13.1665C6 13.1665 5.25 13.9165 5.25 14.8332V20.6665C5.25 21.5832 6 22.3332 6.91667 22.3332C7.83333 22.3332 8.58333 21.5832 8.58333 20.6665V14.8332C8.58333 13.9165 7.83333 13.1665 6.91667 13.1665Z"
        fill={pathColor}
      />
      <path
        d="M12.75 8.4165C12.75 6.87484 13.9583 5.6665 15.5 5.6665C16.3667 5.6665 17.2083 6.07484 17.75 6.70817C18.2917 6.07484 19.1333 5.6665 20 5.6665C21.5417 5.6665 22.75 6.87484 22.75 8.4165C22.75 10.1665 20.6667 12.1748 18.3083 14.3248C17.9917 14.6165 17.5 14.6165 17.1833 14.3248C14.8333 12.1748 12.75 10.1665 12.75 8.4165Z"
        fill={pathColor}
      />
      <path
        d="M21.075 18.1665H15.3833C15.2917 18.1665 15.2 18.1498 15.1083 18.1165L13.8833 17.6915C13.6667 17.6165 13.5583 17.3832 13.6333 17.1665C13.7083 16.9498 13.95 16.8332 14.1667 16.9165L15.1 17.2748C15.1917 17.3082 15.3 17.3332 15.4 17.3332H17.5917C18.1333 17.3332 18.575 16.8915 18.575 16.3498C18.575 15.9415 18.3167 15.5748 17.9333 15.4248L12.1667 13.2748C11.9833 13.1998 11.7833 13.1665 11.5833 13.1665H10.25V20.6832L15.5583 22.1915C15.9 22.2915 16.2667 22.2748 16.6 22.1498L22.75 19.8332C22.75 18.9082 22 18.1665 21.075 18.1665Z"
        fill={pathColor}
      />
    </svg>
  );
}
