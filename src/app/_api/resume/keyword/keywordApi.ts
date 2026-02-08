import client from "@/app/_api/client";

const API_BASE = "/api/resumes/keywords";

export interface KeywordResponse {
  success: boolean;
  code: string | null;
  message: string | null;
  data: {
    keywords: string[];
  };
}

export async function fetchKeywords(): Promise<string[]> {
  const url = API_BASE;
  const res = await client.get<KeywordResponse>(url);
  return res.data?.data?.keywords ?? [];
}
