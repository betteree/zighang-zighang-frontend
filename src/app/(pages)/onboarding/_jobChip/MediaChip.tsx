interface MediaChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function MediaChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: MediaChipProps) {
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
        d="M21.4999 6.5H6.49992C5.58325 6.5 4.83325 7.25 4.83325 8.16667V18.1667C4.83325 19.0833 5.58325 19.8333 6.49992 19.8333H10.6666V20.6667C10.6666 21.125 11.0416 21.5 11.4999 21.5H16.4999C16.9583 21.5 17.3333 21.125 17.3333 20.6667V19.8333H21.4999C22.4166 19.8333 23.1583 19.0833 23.1583 18.1667L23.1666 8.16667C23.1666 7.24167 22.4166 6.5 21.4999 6.5ZM20.6666 18.1667H7.33325C6.87492 18.1667 6.49992 17.7917 6.49992 17.3333V9C6.49992 8.54167 6.87492 8.16667 7.33325 8.16667H20.6666C21.1249 8.16667 21.4999 8.54167 21.4999 9V17.3333C21.4999 17.7917 21.1249 18.1667 20.6666 18.1667ZM16.0666 13.8917L12.7499 15.7917C12.1916 16.1083 11.4999 15.7 11.4999 15.0667V11.2667C11.4999 10.625 12.1916 10.225 12.7499 10.5417L16.0666 12.4417C16.6249 12.7667 16.6249 13.5667 16.0666 13.8917Z"
        fill={pathColor}
      />
    </svg>
  );
}
