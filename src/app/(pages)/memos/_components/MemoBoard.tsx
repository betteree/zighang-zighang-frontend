"use client";

import { useState } from "react";
import MemoList from "./MemoList";
import MemoView from "./MemoView";
import { useMemoGroups } from "../../../_api/memos/useMemoGroups";
import {
  useBulkDeleteMemos,
  useDeleteMemo,
} from "../../../_api/memos/useMemos";
import { useIsDesktop } from "../../../_hooks/useIsDesktop";

export default function MemoBoard() {
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"single" | "split">("single");
  const [leftSelectedMemo, setLeftSelectedMemo] = useState<string | null>(null);
  const [rightSelectedMemo, setRightSelectedMemo] = useState<string | null>(
    null
  );
  const [mobileViewMode, setMobileViewMode] = useState<"list" | "detail">(
    "list"
  );

  const isDesktop = useIsDesktop();
  const { data: memoGroups = [], isLoading, error } = useMemoGroups();
  const bulkDeleteMemosMutation = useBulkDeleteMemos();
  const deleteMemoMutation = useDeleteMemo();

  const handleMemoSelect = (memoId: string) => {
    if (!isDesktop) {
      // 모바일에서는 상세 뷰로 전환
      setSelectedMemoId(memoId);
      setMobileViewMode("detail");
      return;
    }

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

  const handleMobileBackToList = () => {
    setMobileViewMode("list");
    setSelectedMemoId(null);
  };

  const handleDeleteMemo = (memoId: string) => {
    deleteMemoMutation.mutate(memoId, {
      onSuccess: () => {
        // 삭제된 메모가 현재 선택된 메모라면
        if (selectedMemoId === memoId) {
          // 해당 공고에 다른 메모가 있는지 확인
          const memoGroup = memoGroups.find((group) =>
            group.memos.some((memo) => memo.id === memoId)
          );
          if (memoGroup) {
            const remainingMemos = memoGroup.memos.filter(
              (memo) => memo.id !== memoId
            );
            if (remainingMemos.length > 0) {
              // 다른 메모가 있으면 첫 번째 메모를 선택
              setSelectedMemoId(remainingMemos[0].id);
            } else {
              // 메모가 더 이상 없으면 선택 해제
              setSelectedMemoId(null);
            }
          } else {
            setSelectedMemoId(null);
          }
        }

        if (leftSelectedMemo === memoId) {
          const memoGroup = memoGroups.find((group) =>
            group.memos.some((memo) => memo.id === memoId)
          );
          if (memoGroup) {
            const remainingMemos = memoGroup.memos.filter(
              (memo) => memo.id !== memoId
            );
            if (remainingMemos.length > 0) {
              setLeftSelectedMemo(remainingMemos[0].id);
            } else {
              setLeftSelectedMemo(null);
            }
          } else {
            setLeftSelectedMemo(null);
          }
        }

        if (rightSelectedMemo === memoId) {
          const memoGroup = memoGroups.find((group) =>
            group.memos.some((memo) => memo.id === memoId)
          );
          if (memoGroup) {
            const remainingMemos = memoGroup.memos.filter(
              (memo) => memo.id !== memoId
            );
            if (remainingMemos.length > 0) {
              setRightSelectedMemo(remainingMemos[0].id);
            } else {
              setRightSelectedMemo(null);
            }
          } else {
            setRightSelectedMemo(null);
          }
        }
      },
      onError: (error) => {
        console.error("메모 삭제 실패:", error);
      },
    });
  };

  const handleBulkDeleteRecruitments = (recruitmentIds: string[]) => {
    bulkDeleteMemosMutation.mutate(recruitmentIds, {
      onSuccess: () => {
        // 삭제된 공고에 속한 메모들의 선택 상태 초기화
        const deletedMemoIds = new Set<string>();
        recruitmentIds.forEach((recruitmentId) => {
          const memoGroup = memoGroups.find(
            (group) => group.recruitment.id === recruitmentId
          );
          if (memoGroup) {
            memoGroup.memos.forEach((memo) => deletedMemoIds.add(memo.id));
          }
        });

        // 삭제된 메모가 현재 선택된 메모라면 선택 해제
        if (selectedMemoId && deletedMemoIds.has(selectedMemoId)) {
          setSelectedMemoId(null);
        }
        if (leftSelectedMemo && deletedMemoIds.has(leftSelectedMemo)) {
          setLeftSelectedMemo(null);
        }
        if (rightSelectedMemo && deletedMemoIds.has(rightSelectedMemo)) {
          setRightSelectedMemo(null);
        }
      },
      onError: (error) => {
        console.error("공고별 메모 일괄 삭제 실패:", error);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-[522px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-gray-600">메모를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[522px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">오류가 발생했습니다</p>
          <p className="text-gray-600 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:w-full h-[522px] md:flex">
      {/* 데스크톱 레이아웃 */}
      {isDesktop ? (
        <>
          <MemoList
            memoGroups={memoGroups}
            selectedMemoId={selectedMemoId}
            onMemoSelect={handleMemoSelect}
            viewMode={viewMode}
            leftSelectedMemo={leftSelectedMemo}
            rightSelectedMemo={rightSelectedMemo}
            onBulkDeleteRecruitments={handleBulkDeleteRecruitments}
          />
          <MemoView
            selectedMemo={selectedMemoId}
            memoGroups={memoGroups}
            viewMode={viewMode}
            onViewChange={handleViewChange}
            leftSelectedMemo={leftSelectedMemo}
            rightSelectedMemo={rightSelectedMemo}
            onDeleteMemo={handleDeleteMemo}
            onMemoSelect={handleMemoSelect}
          />
        </>
      ) : (
        /* 모바일 레이아웃 */
        <>
          {mobileViewMode === "list" ? (
            <div className="flex flex-col">
              <h1 className="text-Heading2-20sb mt-[26px] mb-[18px] mx-7">
                메모장 관리페이지
              </h1>
              <MemoList
                memoGroups={memoGroups}
                selectedMemoId={selectedMemoId}
                onMemoSelect={handleMemoSelect}
                viewMode={viewMode}
                leftSelectedMemo={leftSelectedMemo}
                rightSelectedMemo={rightSelectedMemo}
                onBulkDeleteRecruitments={handleBulkDeleteRecruitments}
                isMobile={true}
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col">
              {/* 모바일 뒤로가기 버튼 */}
              <div className="px-3.5 h-[58px] flex items-center flex-shrink-0 border-b border-neutral-200 mb-[26px]">
                <button
                  onClick={handleMobileBackToList}
                  className="flex items-center gap-2 text-Heading3-18sb text-[#303030] cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 15L7.5 10L12.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  목록으로
                </button>
              </div>
              {/* 메모 상세 뷰 */}
              <div className="flex-1 mx-5">
                <MemoView
                  selectedMemo={selectedMemoId}
                  memoGroups={memoGroups}
                  viewMode="single"
                  onViewChange={handleViewChange}
                  leftSelectedMemo={null}
                  rightSelectedMemo={null}
                  onDeleteMemo={handleDeleteMemo}
                  onMemoSelect={handleMemoSelect}
                  isMobile={true}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
