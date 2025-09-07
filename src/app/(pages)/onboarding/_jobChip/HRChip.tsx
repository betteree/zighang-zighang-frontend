interface HRChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function HRChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: HRChipProps) {
  const backgroundColor = isSelected ? "#E2F8FF" : "#F1F1F5";
  const pathColor = isSelected ? "#2896BB" : "#AAAAAD";

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
        d="M17.3333 13.1665C18.7166 13.1665 19.8249 12.0498 19.8249 10.6665C19.8249 9.28317 18.7166 8.1665 17.3333 8.1665C15.9499 8.1665 14.8333 9.28317 14.8333 10.6665C14.8333 12.0498 15.9499 13.1665 17.3333 13.1665ZM10.6666 13.1665C12.0499 13.1665 13.1583 12.0498 13.1583 10.6665C13.1583 9.28317 12.0499 8.1665 10.6666 8.1665C9.28325 8.1665 8.16658 9.28317 8.16658 10.6665C8.16658 12.0498 9.28325 13.1665 10.6666 13.1665ZM10.6666 14.8332C8.72492 14.8332 4.83325 15.8082 4.83325 17.7498V18.9998C4.83325 19.4582 5.20825 19.8332 5.66659 19.8332H15.6666C16.1249 19.8332 16.4999 19.4582 16.4999 18.9998V17.7498C16.4999 15.8082 12.6083 14.8332 10.6666 14.8332ZM17.3333 14.8332C17.0916 14.8332 16.8166 14.8498 16.5249 14.8748C16.5416 14.8832 16.5499 14.8998 16.5583 14.9082C17.5083 15.5998 18.1666 16.5248 18.1666 17.7498V18.9998C18.1666 19.2915 18.1083 19.5748 18.0166 19.8332H22.3333C22.7916 19.8332 23.1666 19.4582 23.1666 18.9998V17.7498C23.1666 15.8082 19.2749 14.8332 17.3333 14.8332Z"
        fill={pathColor}
      />
    </svg>
  );
}
