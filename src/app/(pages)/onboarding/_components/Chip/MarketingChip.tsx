interface MarketingChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function MarketingChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: MarketingChipProps) {
  const backgroundColor = isSelected ? "#E4F1FF" : "#F1F1F5";
  const pathColor = isSelected ? "#0058B6" : "#AAAAAD";

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
        d="M22.2487 10.575L21.3737 7.76667C21.1904 7.01667 20.5404 6.5 19.782 6.5H8.20703C7.45703 6.5 6.7987 7.025 6.6237 7.76667L5.7487 10.575C5.36537 12.2167 6.45703 13.1667 6.4987 13.2167V19.8333C6.4987 20.75 7.2487 21.5 8.16537 21.5H19.832C20.7487 21.5 21.4987 20.75 21.4987 19.8333V13.2167C22.432 12.2833 22.407 11.2083 22.2487 10.575ZM14.832 8.16667H16.4654L16.9154 11.1C16.9904 11.6917 16.5904 12.3333 15.8487 12.3333C15.2904 12.3333 14.832 11.8417 14.832 11.2417V8.16667ZM9.36537 11.3833C9.2987 11.925 8.86537 12.3333 8.35703 12.3333C7.58203 12.3333 7.23203 11.525 7.36537 10.9667L8.20703 8.16667H9.8487L9.36537 11.3833ZM13.1654 11.2417C13.1654 11.8417 12.707 12.3333 12.0904 12.3333C11.4654 12.3333 11.007 11.75 11.0737 11.1L11.532 8.16667H13.1654V11.2417ZM19.6404 12.3333C19.132 12.3333 18.6904 11.925 18.632 11.3833L18.1487 8.16667L19.757 8.15833L20.632 10.9667C20.7654 11.525 20.4237 12.3333 19.6404 12.3333Z"
        fill={pathColor}
      />
    </svg>
  );
}
