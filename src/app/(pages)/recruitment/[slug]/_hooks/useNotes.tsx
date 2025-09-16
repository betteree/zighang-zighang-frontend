"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import {
  useMemos,
  useCreateMemo,
  useUpdateMemo,
  useDeleteMemo,
} from "@/app/_api/memos/useMemos";
import { useQueryClient } from "@tanstack/react-query";
import { fetchMemos } from "@/app/_api/memos/memoApi";
import type { Memo } from "@/app/_types/memos";

export type Note = Memo;

const AUTOSAVE_DEBOUNCE_MS = 600;

export function useNotes(recruitmentId?: string) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const { data: memosData, isLoading, error } = useMemos(recruitmentId);
  const createMemoMutation = useCreateMemo(recruitmentId);
  const updateMemoMutation = useUpdateMemo(recruitmentId);
  const deleteMemoMutation = useDeleteMemo(recruitmentId);
  const queryClient = useQueryClient();

  const notes = useMemo(() => memosData?.memos ?? [], [memosData]);
  const selected = useMemo(
    () => (selectedId ? notes.find((n) => n.id === selectedId) ?? null : null),
    [notes, selectedId]
  );

  const [draft, setDraft] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const skipNextAutosaveRef = useRef(false);

  // 선택 변경 시 draft 동기화
  useEffect(() => {
    const next = selected?.content ?? "";
    setDraft(next);
    lastSentRef.current = next;
    skipNextAutosaveRef.current = true;
  }, [selected?.id, selected?.content]);

  // 최신/중복 전송 방지
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSentRef = useRef<string>("");

  const normalize = (s: string) => (s ?? "").replace(/\r\n/g, "\n");

  // ★ onBlur 저장 중에는 autosave가 "saving"을 띄우지 않도록 막는 플래그
  const isBlurSavingRef = useRef(false);

  // 제목 디바운스용 레퍼런스
  const titleTimersRef = useRef<
    Record<string, ReturnType<typeof setTimeout> | undefined>
  >({});
  const lastSentTitleRef = useRef<Record<string, string>>({});

  const pickNewest = (list: Memo[]) => {
    if (!list.length) return null;
    const ts = (m: Memo) => {
      const dateStr = m.updatedAt ?? m.createdAt;
      if (!dateStr) return 0;

      const date = new Date(dateStr);
      // 유효하지 않은 날짜인 경우 0 반환
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date value: ${dateStr}`, m);
        return 0;
      }
      return date.getTime();
    };
    return [...list].sort((a, b) => ts(b) - ts(a))[0];
  };

  // 메모추가
  const addNote = useCallback(async () => {
    try {
      await createMemoMutation.mutateAsync({
        title: "제목 없음",
        content: "",
      });

      const fresh = await queryClient.fetchQuery({
        queryKey: ["memos", { recruitmentId }],
        queryFn: () => fetchMemos(recruitmentId),
        staleTime: 0,
      });

      const newest = pickNewest(fresh.memos ?? []);
      if (newest) {
        setSelectedId(newest.id);
        setEditMode(false);
      } else {
        console.warn("생성은 성공했지만 최신 메모를 찾지 못했습니다.", fresh);
      }
    } catch (e) {
      console.error("addNote 실패!", e);
    }
  }, [createMemoMutation, queryClient, recruitmentId]);

  // 메모 삭제
  const deleteNote = useCallback(
    (id: string) => {
      deleteMemoMutation.mutate(id, {
        onSuccess: () => {
          if (selectedId === id) {
            setSelectedId(null);
            setEditMode(false);
          }
        },
        onError: (err) => console.error("deleteNote 실패!", err),
      });
    },
    [selectedId, deleteMemoMutation]
  );

  /** draft만 갱신 , 저장은 디바운스 이펙트에서 처리 */
  const updateContent = useCallback((value: string) => {
    setDraft(value);
  }, []);

  // 디바운스
  useEffect(() => {
    if (!selected) return;

    if (skipNextAutosaveRef.current) {
      skipNextAutosaveRef.current = false;
      return;
    }

    const serverContent = normalize(selected.content ?? "");
    const draftNorm = normalize(draft);

    if (
      draftNorm === serverContent ||
      draftNorm === normalize(lastSentRef.current)
    ) {
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    // ★ onBlur 저장 중에는 "saving" 문구를 띄우지 않음
    if (!isBlurSavingRef.current) setSaveStatus("saving");

    debounceRef.current = setTimeout(() => {
      // 실행 시점에 다시 비교
      const freshServer = normalize(selected.content ?? "");
      const freshDraft = normalize(draft);
      if (
        freshDraft === freshServer ||
        freshDraft === normalize(lastSentRef.current)
      )
        return;

      const [firstLine, ...rest] = freshDraft.split("\n");
      const newTitle = (firstLine ?? "").trim();
      const newContent = [firstLine, ...rest].join("\n");

      updateMemoMutation.mutate(
        { memoId: selected.id, data: { title: newTitle, content: newContent } },
        {
          onSuccess: () => {
            lastSentRef.current = freshDraft;
            // onBlur 모드가 아니면 success→idle
            if (!isBlurSavingRef.current) {
              setTimeout(() => {
                setSaveStatus("success");
                setTimeout(() => setSaveStatus("idle"), 3000);
              }, 3000);
            }
          },
          onError: () => {
            setSaveStatus("error");
          },
        }
      );
    }, AUTOSAVE_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [draft, selected, updateMemoMutation]);

  // 포커스 아웃 시 자동저장
  const flushContent = useCallback(() => {
    if (!selected) return;

    const server = normalize(selected.content ?? "");
    const draftNorm = normalize(draft);

    // 변경 없음 → UX용 success만 찍고 종료
    if (draftNorm === server || draftNorm === normalize(lastSentRef.current)) {
      setSaveStatus("idle");
      return;
    }

    // 디바운스 취소 + blur saving 모드 진입
    if (debounceRef.current) clearTimeout(debounceRef.current);
    isBlurSavingRef.current = true;

    const [firstLine, ...rest] = draftNorm.split("\n");
    const newTitle = (firstLine ?? "").trim();
    const newContent = [firstLine, ...rest].join("\n");

    updateMemoMutation.mutate(
      { memoId: selected.id, data: { title: newTitle, content: newContent } },
      {
        onSuccess: () => {
          lastSentRef.current = draftNorm;
          // "저장 중"은 절대 띄우지 않고, 곧바로 "성공"만
          setTimeout(() => {
            setSaveStatus("success");
            setTimeout(() => setSaveStatus("idle"), 3000);
          }, 3000);
          isBlurSavingRef.current = false;
        },
        onError: () => {
          setSaveStatus("error");
          isBlurSavingRef.current = false;
        },
      }
    );
  }, [draft, selected, updateMemoMutation]);

  // 본문 편집
  const openDetail = useCallback((id: string) => {
    setSelectedId(id);
    setEditMode(true);
  }, []);

  //제목 수정
  const updateTitle = useCallback(
    (id: string, title: string) => {
      // 타이머 초기화
      const t = titleTimersRef.current[id];
      if (t) clearTimeout(t);

      // 디바운스 타이머 설정
      titleTimersRef.current[id] = setTimeout(() => {
        const note = notes.find((n) => n.id === id);
        if (!note) return;

        // 중복 전송 방지
        if (lastSentTitleRef.current[id] === title) return;

        updateMemoMutation.mutate(
          { memoId: id, data: { title, content: note.content } },
          {
            onSuccess: () => {
              lastSentTitleRef.current[id] = title;
            },
            onError: (err) => {
              console.error("updateTitle(디바운스) 실패!", err);
            },
          }
        );
      }, 300);
    },
    [notes, updateMemoMutation]
  );

  // 제목 즉시 저장
  const flushTitle = useCallback(
    (id: string, title: string) => {
      // 타이머 제거
      const t = titleTimersRef.current[id];
      if (t) clearTimeout(t);

      const note = notes.find((n) => n.id === id);
      if (!note) return;

      if (lastSentTitleRef.current[id] === title) return;

      updateMemoMutation.mutate(
        { memoId: id, data: { title, content: note.content } },
        {
          onSuccess: () => {
            lastSentTitleRef.current[id] = title;
          },
          onError: (err) => {
            console.error("flushTitle 실패!", err);
          },
        }
      );
    },
    [notes, updateMemoMutation]
  );

  return {
    notes,
    selectedId,
    selected,
    editMode,
    setEditMode,
    isLoading,
    error,
    addNote,
    flushContent,
    deleteNote,
    openDetail,
    updateContent,
    updateTitle,
    flushTitle,
    setSelectedId,
    draft,
    saveStatus,
  };
}
