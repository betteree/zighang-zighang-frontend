"use client";

type Props = {
  selected: boolean;
  label: string;
  onClick: () => void;
};

export default function FilterButton({ selected, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-lg border text-sm transition cursor-pointer",
        selected
          ? "bg-violet-50 border-violet-500 text-violet-700"
          : "border-zinc-200 hover:bg-zinc-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
