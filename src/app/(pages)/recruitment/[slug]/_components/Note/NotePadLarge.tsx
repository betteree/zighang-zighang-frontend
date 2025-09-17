// NotePadLarge.tsx
"use client";

import HoverIcon from "../Icons/HoverIcon";
import KebabMenu from "./KebabMenu";
import NoteItem from "./NoteItem";
import { useNotes } from "@/app/(pages)/recruitment/[slug]/_hooks/useNotes";
import { NoteIcon } from "../Icons/NoteIcon";
import { useState, useEffect } from "react";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  isLoggedIn: boolean;
  notesHook: ReturnType<typeof useNotes>;
};

export default function NotePadLarge({
  isOpen,
  onToggle,
  isLoggedIn,
  notesHook,
}: Props) {
  const [textareaKey, setTextareaKey] = useState(0);
  const {
    notes,
    selected,
    editMode,
    setEditMode,
    addNote,
    deleteNote,
    openDetail,
    draft,
    flushContent,
    updateContent,
    saveStatus,
  } = notesHook;

  useEffect(() => {
    if (saveStatus === "success") {
      setTextareaKey((k) => k + 1);
    }
  }, [saveStatus]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[50]">
      <div className="absolute inset-0 bg-black/40" onClick={onToggle} />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] max-w-[92vw] rounded-xl bg-white shadow-2xl border border-neutral-200">
        {editMode && isLoggedIn ? (
          <div className="h-12 px-3.5 py-2.5 flex items-center justify-between rounded-t-xl border-b border-neutral-200">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setEditMode(false)}>
                <HoverIcon
                  variant="right"
                  className="rotate-180 hover:text-black cursor-pointer"
                />
              </button>
            </div>
            {selected && (
              <div className="flex-1 px-3 min-w-0">
                <div className="text-black text-sm font-medium truncate">
                  {selected.title || "제목 없음"}
                </div>
              </div>
            )}
            <KebabMenu
              type="large"
              onToggle={onToggle}
              note={selected}
              onDelete={deleteNote}
            />
          </div>
        ) : (
          <div className="h-12 px-3.5 py-2.5 flex items-center justify-between rounded-t-xl border-b border-neutral-200">
            <div className="flex items-center gap-2.5">
              <div className="text-black text-base font-semibold leading-snug">
                메모장
              </div>
            </div>
            <button
              onClick={onToggle}
              disabled={!isLoggedIn}
              className="group relative inline-block h-6 w-6"
              title="작게 보기"
            >
              <HoverIcon
                variant="minimize"
                className="text-black cursor-pointer"
              />
            </button>
          </div>
        )}

        {editMode && isLoggedIn ? (
          <div
            className={[
              "relative self-stretch h-96 p-4 bg-white rounded-bl-lg rounded-br-lg flex flex-col gap-2.5",
            ].join(" ")}
          >
            <textarea
              key={textareaKey}
              className={[
                "w-full h-full resize-none text-xs font-medium",
                "overflow-y-auto overflow-x-hidden outline-none",
              ].join(" ")}
              placeholder={"첫 줄이 제목이 됩니다.\n내용을 입력하세요…"}
              value={selected ? draft : ""}
              onChange={(e) => updateContent(e.target.value)}
              disabled={!isLoggedIn || !selected}
              onBlur={flushContent}
            />

            <div className="border-t border-gray-300 pt-2.5 pb-3">
              <p
                className={[
                  "text-[10px] font-medium",
                  saveStatus === "saving"
                    ? "text-neutral-400"
                    : saveStatus === "success"
                    ? "text-emerald-300"
                    : saveStatus === "error"
                    ? "text-rose-300"
                    : "text-neutral-400",
                ].join(" ")}
                aria-live="polite"
                role="status"
              >
                {saveStatus === "saving" ? (
                  <span className="inline-flex items-center gap-1 text-[10px]">
                    <NoteIcon status="saving" />
                    저장 중…
                  </span>
                ) : saveStatus === "success" ? (
                  <span className="inline-flex items-center gap-1 text-[10px]">
                    <NoteIcon status="success" />
                    저장 완료!
                  </span>
                ) : saveStatus === "error" ? (
                  <span className="inline-flex items-center gap-1 text-[10px]">
                    <NoteIcon status="error" />
                    저장 실패!
                  </span>
                ) : (
                  <span className="text-neutral-400 text-[10px] ml-auto">
                    {(() => {
                      if (!selected?.createdAt) {
                        return new Date().toISOString().slice(0, 10);
                      }
                      const date = new Date(selected.createdAt);
                      if (isNaN(date.getTime())) {
                        console.warn(
                          `Invalid createdAt: ${selected.createdAt}`
                        );
                        return new Date().toISOString().slice(0, 10);
                      }
                      return date.toISOString().slice(0, 10);
                    })()}
                  </span>
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full relative overflow-y-auto overflow-x-hidden self-stretch h-96 px-3.5 py-3 bg-white rounded-bl-lg rounded-br-lg inline-flex justify-center items-start gap-2.5">
            {!isLoggedIn && (
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-violet-50/20 via-violet-50/60 to-violet-50/80 rounded-bl-lg rounded-br-lg backdrop-blur-[1px]" />
            )}

            <div className="w-full flex-1 inline-flex flex-col justify-start items-start gap-2">
              {isLoggedIn ? (
                <div className="w-full flex flex-col gap-2">
                  <div
                    className={[
                      "w-full border-2 border-dotted border-zinc-300 rounded-lg",
                      "transition filter",
                    ].join(" ")}
                    aria-hidden={!isLoggedIn}
                  >
                    <div className="w-full px-3.5 py-2.5 text-purple-700 text-sm font-semibold leading-tight flex justify-between items-center">
                      <p>메모 추가</p>
                      <button onClick={addNote} disabled={!isLoggedIn}>
                        <HoverIcon variant="plus" />
                      </button>
                    </div>
                  </div>

                  {notes.map((note) => (
                    <NoteItem
                      key={note.id}
                      id={note.id}
                      title={note.title || ""}
                      onClick={() => openDetail(note.id)}
                      editMode={false}
                      onToggleEdit={() => setEditMode((v) => !v)}
                      onOpenDetail={() => openDetail(note.id)}
                      onTitleChange={notesHook.updateTitle}
                      onTitleBlur={notesHook.flushTitle}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-20 w-full flex flex-col items-center justify-center h-full">
                  <div className=" z-50 bg-white shadow-md rounded-lg px-8 py-4 border border-neutral-200 text-center">
                    <div className="text-center font-semibold text-base mb-2">
                      로그인하고 관심있는 공고에 <br />
                      <span className="text-zighang-1000">메모를 기록</span>
                      해보세요!
                    </div>
                    <Link
                      href="/join"
                      className="inline-flex items-center justify-center rounded-md bg-zighang-1000 px-6 py-2 text-white text-sm hover:bg-purple-700 transition-colors"
                    >
                      로그인
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
