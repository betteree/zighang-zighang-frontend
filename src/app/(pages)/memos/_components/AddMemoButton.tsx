import HoverIcon from "@/app/(pages)/recruitment/[slug]/_components/Icons/HoverIcon";

interface AddMemoButtonProps {
  onAdd?: () => void;
}

export default function AddMemoButton({ onAdd }: AddMemoButtonProps) {
  return (
    <button
      className="px-5 py-4 bg-white rounded-lg border border-[#E1E1E4] text-[#892EC3] w-full flex flex-col justify-between items-center text-center cursor-pointer"
      onClick={onAdd}
    >
      <p className="text-Heading5-14sb ">메모 추가</p>
      <div className="rounded-full bg-[#F7F1FB] w-[30px] h-[30px] flex items-center justify-center">
        <HoverIcon variant="plus" />
      </div>
    </button>
  );
}
