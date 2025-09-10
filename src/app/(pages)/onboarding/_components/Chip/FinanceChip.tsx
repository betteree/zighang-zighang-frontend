interface FinanceChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function FinanceChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: FinanceChipProps) {
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
        d="M19.8333 9.83333H11.5C10.5833 9.83333 9.83333 10.5833 9.83333 11.5V19.8333C9.83333 20.75 10.5833 21.5 11.5 21.5H19.8333C20.75 21.5 21.5 20.75 21.5 19.8333V11.5C21.5 10.5833 20.75 9.83333 19.8333 9.83333ZM19.8333 12.3333C19.8333 12.7917 19.4583 13.1667 19 13.1667H12.3333C11.875 13.1667 11.5 12.7917 11.5 12.3333C11.5 11.875 11.875 11.5 12.3333 11.5H19C19.4583 11.5 19.8333 11.875 19.8333 12.3333ZM14.8333 16.5V14.8333H16.5V16.5H14.8333ZM16.5 18.1667V19.8333H14.8333V18.1667H16.5ZM13.1667 16.5H11.5V14.8333H13.1667V16.5ZM18.1667 14.8333H19.8333V16.5H18.1667V14.8333ZM11.5 18.1667H13.1667V19.8333H11.5V18.1667ZM18.1667 19.8333V18.1667H19.8333V19.8333H18.1667ZM9 18.1667H8.16667C7.25 18.1667 6.5 17.4167 6.5 16.5V8.16667C6.5 7.25 7.25 6.5 8.16667 6.5H16.5C17.4167 6.5 18.1667 7.25 18.1667 8.16667V9H16.5V8.16667H8.16667V16.5H9V18.1667Z"
        fill={pathColor}
      />
    </svg>
  );
}
