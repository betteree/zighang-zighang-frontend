"use client";

import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import ProgressIcon from "../../_Icons/progressIcon"; // ✅ 아까 만든 아이콘 컴포넌트 import
import UserName from "@/app/(pages)/personal/_components/UserName";

type FileExploreModalProps = {
  open: boolean;
  onClose: () => void;
  progress: number; // 진행 퍼센트 (0, 40, 70, 100)
};

export default function FileExploreModal({
  open,
  onClose,
  progress,
}: FileExploreModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      // 모달이 열릴 때 서서히 나타나기
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 ">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className={`h-95 flex flex-col gap-20 justify-center mx-auto w-full max-w-sm rounded-xl bg-white py-5 shadow-lg transition-all duration-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div
            className={`flex flex-col items-center gap-2 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-violet-500 text-sm font-semibold">공고 탐색</p>
            <p className="text-center font-medium">
              <UserName showFirstLetterOnly={true} />
              님의 맞춤 공고를 찾는 중이에요
            </p>
          </div>

          <div
            className={`flex justify-center my-6 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <ProgressIcon progress={progress} />
          </div>

          <div
            className={`flex items-center gap-2 px-6 transition-all duration-700 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-violet-500 rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
