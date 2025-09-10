"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import NoteItem from "./NoteItem";
import HoverIcon from "../Icons/HoverIcon";
import KebabMenu from "./KebabMenu";
import NotePadLarge from "./NotePadLarge";
import {
  useNotes,
  type Note,
} from "@/app/(pages)/recruitment/[slug]/_hooks/useNotes";
import { useAuthState } from "@/app/_api/auth/useAuthState";
import { NoteIcon } from "../Icons/NoteIcon";

export default function NotePad({ recruitmentId }: { recruitmentId: string }) {
  const { isLoggedIn } = useAuthState();
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const notesHook = useNotes(recruitmentId);
  const [textareaKey, setTextareaKey] = useState(0);

  const {
    notes,
    selected,
    editMode,
    setEditMode,
    addNote,
    deleteNote,
    openDetail,
    updateContent,
    flushContent,
    saveStatus,
    draft,
    isLoading,
  } = notesHook;

  const frozenNotesRef = useRef<Note[] | null>(null);

  useEffect(() => {
    if (saveStatus === "success") {
      setTextareaKey((k) => k + 1); // key 변경으로 강제 리렌더
    }
  }, [saveStatus]);

  const handleToggleLarge = useCallback(() => {
    setIsLargeOpen((prev) => {
      const next = !prev;
      if (next) {
        // 펼쳐보기 열리면 현재 notes를 스냅샷
        frozenNotesRef.current = notes.map((n) => ({ ...n }));
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
      <div className="h-96 inline-flex flex-col justify-start items-start">
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
              type="small"
              note={selected}
              onToggle={handleToggleLarge}
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
              className="cursor-pointer group relative inline-block h-6 w-6"
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
              key={textareaKey}
              className="w-full h-full resize-none text-xs font-medium overflow-y-auto overflow-x-hidden outline-none"
              placeholder={"첫 줄이 제목이 됩니다.\n내용을 입력하세요…"}
              value={selected ? draft : ""}
              onChange={(e) => updateContent(e.target.value)}
              disabled={!isLoggedIn || !selected}
              onBlur={flushContent}
            />
            <div className="border-t border-gray-300 pt-2.5 pb-3 flex">
              <p
                className={[
                  "text-[10px] font-medium",
                  saveStatus === "saving"
                    ? "text-neutral-400"
                    : saveStatus === "success"
                    ? "text-emerald-300"
                    : saveStatus === "error"
                    ? "text-rose-300"
                    : "text-neutral-400", // 기본(날짜)
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
                    {selected?.createdAt
                      ? new Date(selected.createdAt).toISOString().slice(0, 10)
                      : new Date().toISOString().slice(0, 10)}
                  </span>
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="relative  overflow-y-auto overflow-x-hidden self-stretch h-96 px-3.5 py-3 bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-zinc-200 inline-flex justify-center items-start gap-2.5">
            {!isLoggedIn && (
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-violet-50/20 via-violet-50/60 to-violet-50/80 rounded-bl-lg rounded-br-lg backdrop-blur-[1px]" />
            )}

            <div className=" flex-1 inline-flex flex-col justify-start items-start gap-2">
              {isLoggedIn && (
                <div className="flex flex-col gap-2 w-full">
                  <div
                    className={[
                      "w-full border-2 border-dotted border-zinc-300 rounded-lg",
                      "transition filter",
                    ].join(" ")}
                  >
                    <div className="w-full px-3.5 py-2.5 text-purple-700 text-sm font-semibold leading-tight flex justify-between items-center">
                      <p>메모 추가</p>
                      <button onClick={addNote} disabled={!isLoggedIn}>
                        <HoverIcon variant="plus" />
                      </button>
                    </div>
                  </div>

                  {isLoading && (
                    <p className="text-xs text-neutral-400">불러오는 중…</p>
                  )}

                  {listFrozen.map((note) => (
                    <NoteItem
                      key={note.id}
                      id={note.id}
                      title={note.title || ""}
                      onClick={() => openDetail(note.id)}
                      editMode={false}
                      onToggleEdit={() => setEditMode((v) => !v)}
                      onOpenDetail={() => openDetail(note.id)}
                      onTitleChange={(id, title) =>
                        notesHook.updateTitle(id, title)
                      }
                      onTitleBlur={(id, title) =>
                        notesHook.flushTitle(id, title)
                      }
                    />
                  ))}
                </div>
              )}

              {!isLoggedIn && (
                <div className="relative h-70">
                  <div className="space-y-2">
                    <NoteItem
                      id={"placeholder-0"}
                      title="네이버 쇼핑 서비스 조사"
                    />
                    <NoteItem id={"placeholder-1"} title="네카라쿠배 공고들" />
                    <NoteItem id={"placeholder-2"} title="네카라쿠배 특징" />
                  </div>
                  <div className="absolute h-full inset-0 z-10 flex flex-col items-center justify-center">
                    <div className="bg-white shadow-md rounded-lg px-2 py-4.5 border border-neutral-200">
                      <div className="text-center font-semibold text-sm">
                        로그인하고 관심있는 공고에{" "}
                        <span className="text-purple-700">메모를 기록</span>{" "}
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
