// ConstructionChip.tsx - 건설 칩 컴포넌트
interface ConstructionChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function ConstructionChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: ConstructionChipProps) {
  const backgroundColor = isSelected ? "#D3FFEE" : "#F1F1F5";
  const pathColor = isSelected ? "#05935C" : "#AAAAAD";

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
        d="M18.1667 13.1667V8.16667C18.1667 7.25 17.4167 6.5 16.5 6.5H11.5C10.5833 6.5 9.83333 7.25 9.83333 8.16667V9.83333H8.16667C7.25 9.83333 6.5 10.5833 6.5 11.5V19.8333C6.5 20.75 7.25 21.5 8.16667 21.5H12.3333C12.7917 21.5 13.1667 21.125 13.1667 20.6667V18.1667H14.8333V20.6667C14.8333 21.125 15.2083 21.5 15.6667 21.5H19.8333C20.75 21.5 21.5 20.75 21.5 19.8333V14.8333C21.5 13.9167 20.75 13.1667 19.8333 13.1667H18.1667ZM9.83333 19.8333H8.16667V18.1667H9.83333V19.8333ZM9.83333 16.5H8.16667V14.8333H9.83333V16.5ZM9.83333 13.1667H8.16667V11.5H9.83333V13.1667ZM13.1667 16.5H11.5V14.8333H13.1667V16.5ZM13.1667 13.1667H11.5V11.5H13.1667V13.1667ZM13.1667 9.83333H11.5V8.16667H13.1667V9.83333ZM16.5 16.5H14.8333V14.8333H16.5V16.5ZM16.5 13.1667H14.8333V11.5H16.5V13.1667ZM16.5 9.83333H14.8333V8.16667H16.5V9.83333ZM19.8333 19.8333H18.1667V18.1667H19.8333V19.8333ZM19.8333 16.5H18.1667V14.8333H19.8333V16.5Z"
        fill={pathColor}
      />
    </svg>
  );
}
