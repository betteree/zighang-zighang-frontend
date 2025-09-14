interface KeywordButtonProps {
  keyword: string;
  onClick?: () => void;
}

export default function KeywordButton({
  keyword,
  onClick,
}: KeywordButtonProps) {
  return (
    <button
      onClick={onClick}
      className=" text-violet-500 text-sm font-semibold px-2 py-1 bg-violet-500/10 rounded inline-flex justify-center items-center gap-1"
    >
      #{keyword}
    </button>
  );
}
