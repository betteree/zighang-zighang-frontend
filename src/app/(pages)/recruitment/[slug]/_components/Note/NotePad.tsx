"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import NoteItem from "./NoteItem";
import HoverIcon from "../Icons/HoverIcon";
import KebabMenu from "./KebabMenu";
import NotePadLarge from "./NotePadLarge";
import { useNotes } from "@/app/(pages)/recruitment/[slug]/_hooks/useNotes";

export default function NotePad() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const notesHook = useNotes({ storageKey: "notes" });

  const {
    notes,
    selected,
    editMode,
    setEditMode,
    addNote,
    deleteNote,
    openDetail,
    updateContent,
  } = notesHook;
  const frozenNotesRef = useRef<typeof notes | null>(null);

  const handleToggleLarge = useCallback(() => {
    setIsLargeOpen((prev) => {
      const next = !prev;
      if (next) {
        // 펼쳐보기 열리면 현재 notes를 스냅샷
        frozenNotesRef.current = notes.map((n) => ({ ...n }));
        console.log(frozenNotesRef.current);
      } else {
        // 닫히면 스냅 샷 해제
        frozenNotesRef.current = null;
      }

      return next;
    });
  }, [notes]);

  const listFrozen = isLargeOpen ? frozenNotesRef.current ?? notes : notes;
  return (
    <>
      <button
        onClick={() => setIsLoggedIn((v) => !v)}
        className="mb-2 rounded border px-2 py-1 text-xs"
      >
        {isLoggedIn ? "로그아웃" : "로그인"}
      </button>

      <div className="w-56 h-96 inline-flex flex-col justify-start items-start">
        {!isLargeOpen && editMode && isLoggedIn && selected ? (
          <div className="self-stretch h-11 pl-2.5 pr-3.5 py-2.5 bg-white rounded-tl-lg rounded-tr-lg outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setEditMode(false)}>
                <HoverIcon
                  variant="right"
                  className="rotate-180 hover:text-black cursor-pointer"
                />
              </button>
            </div>
            <KebabMenu
              type={"small"}
              onToggle={handleToggleLarge}
              note={selected}
              onDelete={deleteNote}
            />
          </div>
        ) : (
          <div className="self-stretch h-11 pl-4 pr-3.5 py-2.5 bg-white rounded-tl-lg rounded-tr-lg outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="text-black text-base font-semibold leading-snug">
                메모장
              </div>
            </div>
            <button
              onClick={handleToggleLarge}
              disabled={!isLoggedIn}
              className="
              cursor-pointer
              group relative inline-block h-6 w-6"
              title="크게 보기"
            >
              <HoverIcon
                variant="maximize"
                className="text-black cursor-pointer"
              />
            </button>
          </div>
        )}

        {!isLargeOpen && editMode && isLoggedIn && selected ? (
          <div className="relative self-stretch h-96 p-4 bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-zinc-200 flex flex-col gap-2.5">
            <textarea
              className="w-full h-full resize-none text-xs font-medium overflow-y-auto overflow-x-hidden outline-none"
              placeholder={"첫 줄이 제목이 됩니다.\n내용을 입력하세요…"}
              value={selected?.content ?? ""}
              onChange={(e) => updateContent(e.target.value)}
              disabled={!isLoggedIn || !selected}
            />
            <div className="border-t border-gray-300 pt-2.5">
              <p className="text-[10px] font-medium text-neutral-400">
                {selected?.date ?? new Date().toISOString().slice(0, 10)}
              </p>
            </div>
          </div>
        ) : (
          <div className="relative overflow-y-auto overflow-x-hidden self-stretch h-96  px-3.5 py-3 bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-zinc-200 inline-flex justify-center items-start gap-2.5">
            {!isLoggedIn && (
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-violet-50/20 via-violet-50/60 to-violet-50/80 rounded-bl-lg rounded-br-lg backdrop-blur-[1px]" />
            )}

            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
              {isLoggedIn && (
                <div className="flex flex-col gap-2">
                  <div
                    className={[
                      "w-50 border-2 border-dotted border-zinc-300 rounded-lg",
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

                  {listFrozen.map((note) => (
                    <NoteItem
                      key={note.id}
                      id={note.id}
                      title={note.title || ""}
                      onClick={() => openDetail(note.id)}
                      editMode={false}
                      onToggleEdit={() => setEditMode((v) => !v)}
                      onOpenDetail={() => openDetail(note.id)}
                      onTitleChange={notesHook.updateTitle}
                    />
                  ))}
                </div>
              )}

              {!isLoggedIn && (
                <div className="relative h-70">
                  <div className="space-y-2">
                    <NoteItem id={0} title="네이버 쇼핑 서비스 조사" />
                    <NoteItem id={1} title="네카라쿠배 공고들" />
                    <NoteItem id={2} title="네카라쿠배 특징" />
                  </div>
                  <div className="absolute h-full inset-0 z-10 flex flex-col items-center justify-center">
                    <div className="bg-white shadow-md rounded-lg px-2 py-4.5 border border-neutral-200">
                      <div className="text-center font-semibold text-sm">
                        로그인하고 관심있는 공고에{" "}
                        <span className="text-purple-700"> 메모를 기록</span>{" "}
                        해보세요!
                      </div>
                    </div>
                    <Link
                      href="/join"
                      className="mt-2 w-full inline-flex items-center justify-center rounded-md bg-purple-800 px-3 py-1.5 text-white text-sm hover:bg-purple-700"
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

      {isLargeOpen && (
        <NotePadLarge
          isOpen={isLargeOpen}
          onToggle={handleToggleLarge}
          isLoggedIn={isLoggedIn}
          notesHook={notesHook}
        />
      )}
    </>
  );
}
