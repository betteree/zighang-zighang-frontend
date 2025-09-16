interface ShareIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function ShareIcon({
  className = "",
  width = 18,
  height = 19,
}: ShareIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.79922 11.1985C5.95902 11.1985 6.89922 10.2583 6.89922 9.09854C6.89922 7.93874 5.95902 6.99854 4.79922 6.99854C3.63942 6.99854 2.69922 7.93874 2.69922 9.09854C2.69922 10.2583 3.63942 11.1985 4.79922 11.1985Z"
        stroke="#5E5E5F"
        strokeWidth="1.44"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2016 15.3987C14.3614 15.3987 15.3016 14.4585 15.3016 13.2987C15.3016 12.1389 14.3614 11.1987 13.2016 11.1987C12.0418 11.1987 11.1016 12.1389 11.1016 13.2987C11.1016 14.4585 12.0418 15.3987 13.2016 15.3987Z"
        stroke="#5E5E5F"
        strokeWidth="1.44"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2016 6.99883C14.3614 6.99883 15.3016 6.05863 15.3016 4.89883C15.3016 3.73903 14.3614 2.79883 13.2016 2.79883C12.0418 2.79883 11.1016 3.73903 11.1016 4.89883C11.1016 6.05863 12.0418 6.99883 13.2016 6.99883Z"
        stroke="#5E5E5F"
        strokeWidth="1.44"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.89844 10.1487L11.0984 12.2487M6.89844 8.04873L11.0984 5.94873"
        stroke="#5E5E5F"
        strokeWidth="1.44"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
