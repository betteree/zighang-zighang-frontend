"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface JobCategory {
  name: string;
  href: string;
  icon: string;
}

interface JobCategoryGridProps {
  categories: JobCategory[];
}

export default function JobCategoryGrid({ categories }: JobCategoryGridProps) {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1416) {
        setColumns(5);
      } else if (window.innerWidth >= 768) {
        setColumns(4);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const totalCells = Math.ceil(categories.length / columns) * columns;
  const emptyCells = totalCells - categories.length;

  return (
    <div className="relative flex w-full flex-col items-center gap-4 px-0 py-0 lg:gap-9 lg:py-8 xl:py-0">
      <div className="mx-auto grid w-full max-w-[900px] grid-cols-3 gap-[1px] overflow-hidden rounded-[20px] lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="relative flex h-[44px] w-full items-center gap-2 bg-[#f7f7f7] px-2 py-0 lg:h-[68px] lg:px-4"
          >
            <Image
              alt={category.name}
              width={20}
              height={20}
              className="h-3.5 w-3.5 flex-shrink-0 lg:h-5 lg:w-5"
              src={category.icon}
            />
            <p className="w-fit whitespace-nowrap text-xs font-normal leading-normal text-black lg:text-base lg:font-medium">
              <span className="tracking-[0.05px]">{category.name}</span>
            </p>
          </Link>
        ))}

        {/* 빈 칸 추가 */}
        {Array.from({ length: emptyCells }, (_, index) => (
          <div
            key={`empty-${index}`}
            className="h-[44px] w-full bg-[#f7f7f7] lg:h-[68px]"
          />
        ))}
      </div>
    </div>
  );
}
