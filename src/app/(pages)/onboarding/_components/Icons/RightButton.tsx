type RightButtonProps = React.SVGProps<SVGSVGElement> & {
  disabled?: boolean;
};

export function RightButton({ disabled = false, ...props }: RightButtonProps) {
  return (
    <svg
      width="36"
      height="45"
      viewBox="0 0 36 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="35.5"
        y="40"
        width="35"
        height="35"
        rx="17.5"
        transform="rotate(-180 35.5 40)"
        fill="white"
      />
      <rect
        x="35.5"
        y="40"
        width="35"
        height="35"
        rx="17.5"
        transform="rotate(-180 35.5 40)"
        stroke="#DDDDE1"
      />
      <path
        d="M14.5 28.6773C14.955 29.1323 15.69 29.1323 16.145 28.6773L21.5 23.3223C21.955 22.8673 21.955 22.1323 21.5 21.6773L16.145 16.3223C15.69 15.8673 14.955 15.8673 14.5 16.3223C14.045 16.7773 14.045 17.5123 14.5 17.9673L19.0267 22.5056L14.5 27.0323C14.045 27.4873 14.0567 28.234 14.5 28.6773Z"
        fill={!disabled ? "black" : "#AAAAAD"} // ✅ disabled 상태면 검은색
      />
    </svg>
  );
}
