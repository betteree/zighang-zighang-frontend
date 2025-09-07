export function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* 배경 */}
      <rect width="30" height="30" rx="15" fill="white" />

      {/* 파일 본체 */}
      <path
        d="M9.12287 6.52637H18.6672L22.0358 9.89496V22.2465C22.0358 22.8666 21.5331 23.3693 20.9129 23.3693H9.12286C8.50272 23.3693 8 22.8666 8 22.2465V7.64923C8 7.02909 8.50272 6.52637 9.12287 6.52637Z"
        fill="currentColor"
      />

      {/* 접힌 모서리 */}
      <path
        d="M23 11L18 6V9.87714C18 10.4973 18.5027 11 19.1229 11H23Z"
        fill="currentColor"
        stroke="white"
        strokeWidth={0.5}
      />

      {/* 파일 안 줄 (항상 흰색) */}
      <path
        d="M10.9492 12.0005H15.581"
        stroke="white"
        strokeWidth={0.842148}
        strokeLinecap="round"
      />
      <path
        d="M10.9492 14.5269H18.9496"
        stroke="white"
        strokeWidth={0.842148}
        strokeLinecap="round"
      />
      <path
        d="M10.9492 17.0532H15.581"
        stroke="white"
        strokeWidth={0.842148}
        strokeLinecap="round"
      />
    </svg>
  );
}
