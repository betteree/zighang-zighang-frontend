interface CommunicatePersuadeIconProps extends React.SVGProps<SVGSVGElement> {
  isSelected?: boolean;
}

export function CommunicatePersuadeIcon({
  isSelected = false,
  ...props
}: CommunicatePersuadeIconProps) {
  return (
    <svg
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={
        isSelected
          ? "[filter:drop-shadow(0_0_8px_rgba(255,232,239,0.9))_drop-shadow(0_0_16px_rgba(255,232,239,0.45))]"
          : ""
      }
      {...props}
    >
      <g>
        <rect x="0.5" y="0" width="50" height="50" rx="10" fill="#FFE8EF" />

        <g opacity="0.35">
          <circle cx="32.5" cy="30" r="10.5" fill="#FF6C93" />
          <path
            d="M28.7 29.5h2.1c.17 0 .31-.12.35-.28l.48-1.74c.15-.55.64-.98 1.23-1.06.86-.11 1.53.23 1.79 1.45.06.3.33.52.64.52h1.86c.49 0 .9.4.9.9v3.58c0 .09-.03.18-.09.25l-1.06 1.37a.38.38 0 0 1-.29.14h-3.73a.48.48 0 0 1-.34-.14l-1.02-1.02a.48.48 0 0 0-.34-.14h-1.19a.9.9 0 0 1-.9-.9v-1.94c0-.49.4-.9.9-.9Z"
            fill="white"
          />
        </g>

        <path
          d="M15 14h13c1.66 0 3 1.34 3 3v6c0 1.66-1.34 3-3 3h-5.2l-3.05 2.3c-.38.29-.92.01-.92-.45V26H15c-1.66 0-3-1.34-3-3v-6c0-1.66 1.34-3 3-3Z"
          fill="#FF3F76"
        />

        <rect
          x="17.8"
          y="18.6"
          width="2.2"
          height="2.2"
          rx="0.5"
          fill="white"
        />
        <rect
          x="21.8"
          y="18.6"
          width="2.2"
          height="2.2"
          rx="0.5"
          fill="white"
        />
        <rect
          x="25.8"
          y="18.6"
          width="2.2"
          height="2.2"
          rx="0.5"
          fill="white"
        />
      </g>
    </svg>
  );
}
