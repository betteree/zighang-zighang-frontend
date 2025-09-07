import Image from "next/image";

export default function RecruitmentContent() {
  return (
    <div className="w-full">
      <Image
        alt="채용 공고 이미지"
        loading="lazy"
        width={0}
        height={0}
        className="w-full px-4"
        src="https://d2juy7qzamcf56.cloudfront.net/2025-08-14/a08240a0-e53f-4acc-b2b7-f928b92d3a2f.png"
        style={{ color: "transparent" }}
      />
      <div className="h-20"></div>
    </div>
  );
}
