interface ProblemSolvingIconProps {
  isSelected?: boolean;
}

export function ProblemSolvingIcon({
  isSelected = false,
  ...props
}: ProblemSolvingIconProps) {
  return (
    <svg
      width={52}
      height={52}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={
        isSelected
          ? "[filter:drop-shadow(0_0_8px_rgba(181,238,232,0.8))_drop-shadow(0_0_16px_rgba(181,238,232,0.5))]"
          : ""
      }
      {...props}
    >
      <rect
        x="-0.00366211"
        width="50"
        height="50"
        rx="8.33333"
        fill="#B5EEE8"
      />
      <path
        d="M31.5946 10.4142C32.3756 9.63317 33.642 9.63317 34.423 10.4142L40.0799 16.0711C40.8609 16.8521 40.8609 18.1184 40.0799 18.8995L21.6951 37.2843L13.2098 28.799L31.5946 10.4142Z"
        fill="#009F8E"
      />
      <path
        d="M13.208 28.7988L21.6933 37.2841L10.7331 39.0519L13.208 28.7988Z"
        fill="white"
      />
      <path
        d="M12.2354 32.7739L17.3978 37.9364L10.7355 39.0523L12.2354 32.7739Z"
        fill="#074F47"
      />
      <path
        d="M31.5946 10.4142C32.3756 9.63316 33.642 9.63317 34.423 10.4142L40.0799 16.0711C40.8609 16.8521 40.8609 18.1184 40.0799 18.8995L35.8372 23.1421L27.3519 14.6569L31.5946 10.4142Z"
        fill="#1CC6B4"
      />
    </svg>
  );
}
