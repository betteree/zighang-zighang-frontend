"use client";

import { useState } from "react";
import MemoList from "./MemoList";
import MemoView from "./MemoView";
import { MemoGroup } from "../_types/memoTypes";

// API 응답 형식의 샘플 데이터
const sampleMemoGroups: MemoGroup[] = [
  {
    recruitment: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      title: "프론트엔드 개발자",
      endDate: "2025-09-20T15:20:28.501Z",
      deadlineType: "상시_채용",
      companyName: "원티드",
    },
    memos: [
      {
        id: "memo-1",
        createdAt: "2025-01-15T15:20:28.501Z",
        updatedAt: "2025-01-15T15:20:28.501Z",
        title: "기술 스택 정리",
        content:
          "React, TypeScript, Next.js 경험 있음. 프로젝트 경험 풍부하고 팀워크 좋음.",
      },
      {
        id: "memo-2",
        createdAt: "2025-01-16T15:20:28.501Z",
        updatedAt: "2025-01-16T15:20:28.501Z",
        title: "면접 준비",
        content:
          "포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.",
      },
      {
        id: "memo-3",
        createdAt: "2025-01-17T15:20:28.501Z",
        updatedAt: "2025-01-17T15:20:28.501Z",
        title: "질문 리스트",
        content:
          "포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.포트폴리오 정리 완료. 기술 질문 대비 준비 중. 회사 문화 조사 필요.",
      },
    ],
  },
  {
    recruitment: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      title: "백엔드 개발자",
      endDate: "2025-01-20T15:20:28.501Z",
      deadlineType: "상시_채용",
      companyName: "토스",
    },
    memos: [
      {
        id: "memo-4",
        createdAt: "2025-01-10T15:20:28.501Z",
        updatedAt: "2025-01-10T15:20:28.501Z",
        title: "기술 스택 분석",
        content:
          "Node.js, Python, PostgreSQL 경험. 마이크로서비스 아키텍처 경험 있음.",
      },
      {
        id: "memo-5",
        createdAt: "2025-01-12T15:20:28.501Z",
        updatedAt: "2025-01-12T15:20:28.501Z",
        title: "회사 조사",
        content: "토스의 핀테크 서비스, 기술 스택, 개발 문화에 대해 조사 완료.",
      },
    ],
  },
  {
    recruitment: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      title: "풀스택 개발자",
      endDate: "2025-01-18T15:20:28.501Z",
      deadlineType: "상시_채용",
      companyName: "네이버",
    },
    memos: [
      {
        id: "memo-6",
        createdAt: "2025-01-14T15:20:28.501Z",
        updatedAt: "2025-01-14T15:20:28.501Z",
        title: "지원 동기",
        content: "대규모 서비스 개발 경험을 쌓고 싶음. 네이버의 기술력에 관심.",
      },
    ],
  },
];

export default function MemoBoard() {
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"single" | "split">("single");
  const [leftSelectedMemo, setLeftSelectedMemo] = useState<string | null>(null);
  const [rightSelectedMemo, setRightSelectedMemo] = useState<string | null>(null);

  const handleMemoSelect = (memoId: string) => {
    if (viewMode === "split") {
      // 스플릿뷰에서는 중복 방지 및 토글 기능
      if (leftSelectedMemo === memoId) {
        // 왼쪽에 선택된 메모를 다시 클릭하면 취소
        setLeftSelectedMemo(null);
      } else if (rightSelectedMemo === memoId) {
        // 오른쪽에 선택된 메모를 다시 클릭하면 취소
        setRightSelectedMemo(null);
      } else if (!leftSelectedMemo) {
        // 왼쪽이 비어있으면 왼쪽에 배치
        setLeftSelectedMemo(memoId);
      } else if (!rightSelectedMemo) {
        // 오른쪽이 비어있으면 오른쪽에 배치
        setRightSelectedMemo(memoId);
      } else {
        // 둘 다 채워져 있으면 왼쪽을 새로운 메모로 교체
        setLeftSelectedMemo(memoId);
      }
    } else {
      // 단일뷰에서는 기존 방식
      setSelectedMemoId(memoId);
    }
  };

  const handleViewChange = (mode: "single" | "split") => {
    setViewMode(mode);
    if (mode === "single") {
      // 단일뷰로 전환할 때 왼쪽 선택된 메모를 메인으로
      if (leftSelectedMemo) {
        setSelectedMemoId(leftSelectedMemo);
      }
      setLeftSelectedMemo(null);
      setRightSelectedMemo(null);
    }
  };

  return (
    <div className="w-full h-[522px] flex">
      <MemoList 
        memoGroups={sampleMemoGroups}
        selectedMemoId={selectedMemoId}
        onMemoSelect={handleMemoSelect}
        viewMode={viewMode}
        leftSelectedMemo={leftSelectedMemo}
        rightSelectedMemo={rightSelectedMemo}
      />
      <MemoView 
        selectedMemo={selectedMemoId} 
        memoGroups={sampleMemoGroups}
        viewMode={viewMode}
        onViewChange={handleViewChange}
        leftSelectedMemo={leftSelectedMemo}
        rightSelectedMemo={rightSelectedMemo}
        onLeftMemoChange={setLeftSelectedMemo}
        onRightMemoChange={setRightSelectedMemo}
      />
    </div>
  );
}
