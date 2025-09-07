interface ProductChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function ProductChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: ProductChipProps) {
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
        d="M21.84 13.5106L14.4817 6.15228C14.1734 5.84395 13.7484 5.66895 13.3067 5.66895H7.33171C6.41504 5.66895 5.66504 6.41895 5.66504 7.33561V13.3106C5.66504 13.7523 5.84004 14.1773 6.15671 14.4856L13.515 21.8439C14.165 22.4939 15.2234 22.4939 15.8734 21.8439L21.8484 15.8689C22.4984 15.2189 22.4984 14.1689 21.84 13.5106ZM9.41504 10.6689C8.72337 10.6689 8.16504 10.1106 8.16504 9.41895C8.16504 8.72728 8.72337 8.16895 9.41504 8.16895C10.1067 8.16895 10.665 8.72728 10.665 9.41895C10.665 10.1106 10.1067 10.6689 9.41504 10.6689Z"
        fill={pathColor}
      />
    </svg>
  );
}
