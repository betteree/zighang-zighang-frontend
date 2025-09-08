export function Ranking() {
  const items = [
    { rank: 1, title: "백엔드 개발자", company: "바카티오", count: 32 },
    { rank: 2, title: "프론트엔드 개발자", company: "테크나인", count: 28 },
    { rank: 3, title: "AI 엔지니어", company: "인텔리젠스랩", count: 25 },
  ];

  return (
    <div className="flex w-full border px-7 py-4 border-neutral-200 rounded-sm items-center gap-5">
      <div>
        <h3 className="text-purple-800 text-sm font-semibold">
          IT/개발 TOP 인기 공고
        </h3>
        <p className="text-neutral-400 text-[10px] font-medium">
          2025.08.28 16:00:40
        </p>
      </div>

      <div className="w-0 h-11 border border-dashed border-zinc-200"></div>

      <div className="flex gap-6">
        {items.map((item) => (
          <section key={item.rank} className="flex">
            <div className="flex gap-1 items-center">
              <p className="text-purple-800 text-lg font-medium pb-4">
                {item.rank}
              </p>
              <div className="flex flex-col">
                <p className="text-zinc-800 text-sm font-medium">
                  {item.title}
                </p>
                <p className="text-zinc-600 text-xs font-medium">
                  {item.company}
                </p>
              </div>
              <p className="text-red-500 text-xs font-medium pb-4">
                {item.count}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
