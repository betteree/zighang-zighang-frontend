import client from "@/app/_api/client";

const API_BASE = "/api/resumes";

// 타입 정의
export interface ResumeUploadResponse {
  success: boolean;
  code: string | null;
  message: string | null;
  data: {
    id: string;
    fileName: string;
    fileUrl: string;
    size: number;
    uploadDate: string;
  };
}

export interface Resume {
  id: string;
  fileName: string;
  fileUrl: string;
  size: number;
  uploadDate: string;
}

export interface ResumeListResponse {
  resumes: Resume[];
}

import { ApiResponse } from "@/app/(pages)/recruitment/[slug]/_types/types";

// ... existing imports

export async function fetchResumes(): Promise<ResumeListResponse> {
  const url = API_BASE;
  const res = await client.get<ApiResponse<{ resumes: Resume[] }>>(url);

  return { resumes: (res.data.data as unknown as Resume[]) ?? [] };
}

export async function uploadResume(file: File): Promise<ResumeUploadResponse> {
  const url = API_BASE;

  const formData = new FormData();
  formData.append("resumeFile", file);

  const res = await client.post<ResumeUploadResponse>(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

export async function deleteResume(resumeId: string): Promise<void> {
  await client.delete(`${API_BASE}/${resumeId}`);
}

export async function downloadResume(resumeId: string): Promise<Blob> {
  const res = await client.get(`${API_BASE}/${resumeId}/download`, {
    responseType: "blob",
  });

  return res.data;
}
