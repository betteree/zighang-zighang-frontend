interface ServiceChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function ServiceChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: ServiceChipProps) {
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
        d="M17.7333 12.677C17.4083 13.002 16.8666 13.002 16.5416 12.677L12.8166 8.96038L6.94165 14.827L6.39165 14.302C5.41665 13.327 5.41665 11.7437 6.39165 10.7687L9.92498 7.23538C10.9 6.26038 12.4833 6.26038 13.4583 7.23538L17.7333 11.502C18.0583 11.827 18.0583 12.352 17.7333 12.677ZM18.3166 10.9104C18.9666 11.5604 18.9666 12.6187 18.3166 13.2687C17.2583 14.327 16.1416 13.452 15.9583 13.2687L12.825 10.1354L8.18332 14.777C7.85832 15.102 7.85832 15.627 8.18332 15.952C8.50832 16.277 9.03332 16.277 9.36665 15.952L13.2166 12.102L13.8083 12.6937L9.95832 16.5437C9.63332 16.8687 9.63332 17.3937 9.95832 17.7187C10.2833 18.0437 10.8083 18.0437 11.1416 17.7187L14.9916 13.8687L15.5833 14.4604L11.7333 18.3104C11.4083 18.6354 11.4083 19.1604 11.7333 19.4854C12.0583 19.8104 12.5833 19.8104 12.9083 19.4854L16.7583 15.6354L17.35 16.227L13.5 20.077C13.175 20.402 13.175 20.927 13.5 21.252C13.825 21.577 14.35 21.577 14.675 21.252L21.6083 14.302C22.5833 13.327 22.5833 11.7437 21.6083 10.7687L18.075 7.23538C17.1166 6.27704 15.5666 6.26038 14.5916 7.18538L18.3166 10.9104Z"
        fill={pathColor}
      />
    </svg>
  );
}
