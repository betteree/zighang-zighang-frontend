"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type Note = { id: number; title: string; content: string; date: string };

type Options = {
  storageKey?: string;
};
export function useNotes(opts: Options = {}) {
  const { storageKey } = opts;

  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);

  const selected = useMemo(
    () => notes.find((n) => n.id === selectedId) ?? null,
    [notes, selectedId]
  );

  useEffect(() => {
    if (!storageKey) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setNotes(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(notes));
      } catch {}
    }, 300);
    return () => clearTimeout(t);
  }, [notes, storageKey]);

  const addNote = useCallback(() => {
    const n: Note = {
      id: Date.now(),
      title: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
    };
    setNotes((prev) => [n, ...prev]);
    setSelectedId(n.id);
  }, []);

  const deleteNote = useCallback(
    (id: number) => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (selectedId === id) {
        setSelectedId(null);
        setEditMode(false);
      }
    },
    [selectedId]
  );

  const openDetail = useCallback((id: number) => {
    setSelectedId(id);
    setEditMode(true);
  }, []);

  const updateContent = useCallback(
    (value: string) => {
      if (!selected) return;
      const [firstLine, ...rest] = value.replace(/\r\n/g, "\n").split("\n");
      const newTitle = (firstLine ?? "").trim();
      const newContent = [firstLine, ...rest].join("\n");
      setNotes((prev) =>
        prev.map((n) =>
          n.id === selected.id
            ? { ...n, title: newTitle, content: newContent }
            : n
        )
      );
    },
    [selected]
  );

  const updateTitle = useCallback((id: number, title: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, title } : n)));
  }, []);

  return {
    notes,
    selectedId,
    selected,
    editMode,
    setEditMode,

    addNote,
    deleteNote,
    openDetail,
    updateContent,
    updateTitle,

    setSelectedId,
    setNotes,
  };
}
