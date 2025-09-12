"use client";

import {
  ApiResponse,
  Recruitment,
} from "@/app/(pages)/recruitment/[slug]/_types/types";

export type GetRecruitmentDetailResponse = ApiResponse<Recruitment>;

function getAccessToken(): string | null {
  try {
    return localStorage.getItem("zh_access_token");
  } catch {
    return null;
  }
}

const API_BASE = "/api/recruitments";

export async function fetchRecruitmentDetail(
  recruitmentId: string
): Promise<GetRecruitmentDetailResponse> {
  const token = getAccessToken();
  const url = `${API_BASE}/${recruitmentId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  return json;
}
