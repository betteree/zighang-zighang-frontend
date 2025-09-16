"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchResumes,
  uploadResume,
  deleteResume,
  downloadResume,
} from "../resumeApi";

// Query Keys
export const resumeKeys = {
  all: ["resumes"] as const,
  lists: () => [...resumeKeys.all, "list"] as const,
  list: (filters: string) => [...resumeKeys.lists(), { filters }] as const,
};

// 이력서 목록 조회
export function useResumes() {
  return useQuery({
    queryKey: resumeKeys.lists(),
    queryFn: fetchResumes,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

// 이력서 업로드
export function useUploadResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadResume,
    onSuccess: () => {
      // 업로드 성공 시 목록 새로고침
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
    },
    onError: (error) => {
      console.error("이력서 업로드 실패:", error);
    },
  });
}

// 이력서 삭제
export function useDeleteResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      // 삭제 성공 시 목록 새로고침
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
    },
    onError: (error) => {
      console.error("이력서 삭제 실패:", error);
    },
  });
}

// 이력서 다운로드
export function useDownloadResume() {
  return useMutation({
    mutationFn: async (resumeId: string) => {
      const blob = await downloadResume(resumeId);
      return blob;
    },
    onSuccess: (blob, resumeId) => {
      // 다운로드 성공 시 파일 다운로드 실행
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume-${resumeId}.pdf`; // 파일명 설정
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error("이력서 다운로드 실패:", error);
      alert("파일 다운로드에 실패했습니다.");
    },
  });
}
