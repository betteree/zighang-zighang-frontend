import client from "@/app/_api/client";

const API_BASE = "/api/recruitments/{recruitmentId}/applications/log";

export async function logApplication(recruitmentId: string): Promise<void> {
  const url = API_BASE.replace(
    "{recruitmentId}",
    encodeURIComponent(recruitmentId),
  );

  await client.post(url);
}
