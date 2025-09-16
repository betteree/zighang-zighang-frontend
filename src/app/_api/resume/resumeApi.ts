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

// 토큰 가져오기
function getAccessToken(): string | null {
  try {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("zh_access_token");
  } catch {
    return null;
  }
}

export async function fetchResumes(): Promise<ResumeListResponse> {
  const token = getAccessToken();
  const url = API_BASE;

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
  return { resumes: json?.data ?? [] };
}

export async function uploadResume(file: File): Promise<ResumeUploadResponse> {
  const token = getAccessToken();
  const url = API_BASE;

  const formData = new FormData();
  formData.append("resumeFile", file);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  return json;
}

export async function deleteResume(resumeId: string): Promise<void> {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE}/${resumeId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

export async function downloadResume(resumeId: string): Promise<Blob> {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE}/${resumeId}/download`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  return res.blob();
}
