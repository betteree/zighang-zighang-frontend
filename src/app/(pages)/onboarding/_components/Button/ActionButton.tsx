export function ActionButton({
  children,
  onClick,
  state = "disabled",
}: {
  children: React.ReactNode;
  onClick: () => void;
  state?: "disabled" | "abled";
}) {
  const getButtonClasses = () => {
    const baseClasses =
      "flex items-center justify-center text-Button2-16sb w-full md:w-auto px-4 md:px-[64px] h-[50px] md:h-[42px] text-white rounded-[8px] transition-all duration-200 ";

    switch (state) {
      case "abled":
        return `${baseClasses} bg-[#7951FF] hover:bg-[#6B47E6] cursor-pointer`;
      case "disabled":
      default:
        return `${baseClasses} bg-gray-400 cursor-not-allowed`;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={state === "disabled"}
      className={getButtonClasses()}
    >
      {children}
    </button>
  );
}
