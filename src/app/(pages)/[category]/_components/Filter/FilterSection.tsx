import FilterOptionButton from "./FilterButton";

type Props = {
  title: string;
  options: readonly string[];
  selected: (o: string) => boolean;
  onToggle: (o: string) => void;
  note?: string;
};

export default function FilterSection({
  title,
  options,
  selected,
  onToggle,
  note,
}: Props) {
  return (
    <section className="space-y-2">
      <div className="flex items-end gap-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        {note && <span className="text-xs text-zinc-500">{note}</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <FilterOptionButton
            key={opt}
            label={opt}
            selected={selected(opt)}
            onClick={() => onToggle(opt)}
          />
        ))}
      </div>
    </section>
  );
}
