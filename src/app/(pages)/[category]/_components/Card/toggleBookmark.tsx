"use server";

export async function toggleBookmark(id: string, next: boolean) {
  console.log("[server action] toggleBookmark", { id, next });
}
