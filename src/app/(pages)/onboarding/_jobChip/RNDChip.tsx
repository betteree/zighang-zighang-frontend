interface RNDChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function RNDChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: RNDChipProps) {
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
        d="M9.2959 19.65L9.50423 21.5L10.8542 20.2167L13.1626 13.8833C12.5959 13.7417 12.0959 13.4583 11.6876 13.0667L9.2959 19.65Z"
        fill={pathColor}
      />
      <path
        d="M16.3042 13.0667C15.8959 13.4583 15.3876 13.7417 14.8292 13.8833L17.1376 20.2167L18.4876 21.5L18.7042 19.65L16.3042 13.0667Z"
        fill={pathColor}
      />
      <path
        d="M16.4459 11.1667C16.6959 9.86667 15.9459 8.71667 14.8292 8.31667V7.33333C14.8292 6.875 14.4542 6.5 13.9959 6.5C13.5376 6.5 13.1626 6.875 13.1626 7.33333V8.31667C12.1959 8.66667 11.4959 9.58333 11.4959 10.6667C11.4959 12.2 12.8792 13.4167 14.4626 13.125C15.4459 12.9417 16.2542 12.15 16.4459 11.1667ZM13.9959 11.5C13.5376 11.5 13.1626 11.125 13.1626 10.6667C13.1626 10.2083 13.5376 9.83333 13.9959 9.83333C14.4542 9.83333 14.8292 10.2083 14.8292 10.6667C14.8292 11.125 14.4542 11.5 13.9959 11.5Z"
        fill={pathColor}
      />
    </svg>
  );
}
