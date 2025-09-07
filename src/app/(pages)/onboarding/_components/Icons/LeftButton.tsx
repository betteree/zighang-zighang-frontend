type LeftButtonProps = React.SVGProps<SVGSVGElement> & {
  disabled?: boolean;
};

export function LeftButton({ disabled = false, ...props }: LeftButtonProps) {
  return (
    <svg
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="1" width="35" height="35" rx="17.5" fill="white" />
      <rect x="0.5" y="1" width="35" height="35" rx="17.5" stroke="#DDDDE1" />
      <path
        d="M21.5 12.3227C21.045 11.8677 20.31 11.8677 19.855 12.3227L14.5 17.6777C14.045 18.1327 14.045 18.8677 14.5 19.3227L19.855 24.6777C20.31 25.1327 21.045 25.1327 21.5 24.6777C21.955 24.2227 21.955 23.4877 21.5 23.0327L16.9733 18.4944L21.5 13.9677C21.955 13.5127 21.9433 12.766 21.5 12.3227Z"
        fill={!disabled ? "black" : "#AAAAAD"}
      />
    </svg>
  );
}
