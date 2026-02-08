"use client";

import client from "@/app/_api/client";

const API_BASE = "/api/bookmarks";

export async function addBookmark(recruitmentId: string | number) {
  const url = `${API_BASE}/${encodeURIComponent(String(recruitmentId))}`;
  await client.post(url);
}

export async function removeBookmark(recruitmentId: string | number) {
  const url = `${API_BASE}/${encodeURIComponent(String(recruitmentId))}`;
  await client.delete(url);
}
