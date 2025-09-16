"use client";

import { useCallback, useId, useRef, useState } from "react";
import { FileUploadIcon } from "./icons/fileUploadIcon";

type Props = {
  onFiles?: (files: File[]) => void;
  onError?: (message: string) => void;
  multiple?: boolean;
  accept?: string;
  maxSizeMB?: number;
  disabled?: boolean;
  hasFile?: boolean;
  modal?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
  error?: string | null;
};

export default function FileUploadCard({
  onFiles,
  onError,
  multiple = false,
  accept,
  maxSizeMB = 15,
  disabled = false,
  hasFile,
  modal = false,
  width,
  height,
  className,
  error: externalError,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setDragging] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const liveId = useId();

  // 외부 에러와 내부 에러를 합쳐서 사용
  const error = externalError || internalError;

  // modal 상태에 따른 스타일 조절
  const getContainerStyles = () => {
    const baseStyles = [
      "bg-white flex justify-center shadow-sm transition outline-none relative",
      disabled
        ? "opacity-60 cursor-not-allowed"
        : isDragging
        ? "border-violet-400 ring-4 ring-violet-100"
        : "border-zinc-200 hover:shadow",
      hasFile ? "h-[200px]" : "h-[228px]",
      // modal 상태일 때는 블러 처리하지 않음
      error && !modal ? "blur-sm select-none" : "",
    ];

    if (modal) {
      baseStyles.push("!shadow-none");
    } else {
      baseStyles.push("w-full min-w-[272px] md:w-[526px] rounded-2xl border");
    }

    if (className) {
      baseStyles.push(className);
    }

    return baseStyles.join(" ");
  };

  const getButtonStyles = () => {
    const baseStyles = [
      "h-8 px-4.5 py-1.5 rounded-full text-sm font-semibold text-white shadow-sm cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200",
      disabled ? "opacity-60 cursor-not-allowed" : "",
    ];

    if (modal) {
      baseStyles.push("bg-black text-white");
    } else {
      baseStyles.push("bg-violet-600 hover:bg-violet-700");
    }

    return baseStyles.join(" ");
  };

  const showError = useCallback(
    (msg: string) => {
      setInternalError(msg);
      onError?.(msg);
    },
    [onError]
  );

  const clearError = useCallback(() => {
    setInternalError(null);
  }, []);

  const validateAndEmit = useCallback(
    (list: FileList | null) => {
      if (!list || list.length === 0) return;
      const rawFiles = Array.from(list);
      const files = multiple ? rawFiles : rawFiles.slice(0, 1);

      // 파일 형식 검증
      if (accept) {
        const acceptParts = accept
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean);

        if (acceptParts.length) {
          const ok = files.every((f) => {
            const type = (f.type || "").toLowerCase();
            const name = (f.name || "").toLowerCase();
            return acceptParts.some((a) =>
              a.endsWith("/*")
                ? type.startsWith(a.replace("/*", ""))
                : type === a || name.endsWith(a)
            );
          });
          if (!ok) {
            return showError("허용되지 않는 파일 형식입니다.");
          }
        }
      }

      // 용량 검증
      const max = maxSizeMB * 1024 * 1024;
      const tooBig = files.find((f) => f.size > max);
      if (tooBig) {
        return showError(`파일은 최대 ${maxSizeMB}MB까지 업로드할 수 있어요.`);
      }

      // 성공
      clearError();
      onFiles?.(files);
    },
    [accept, maxSizeMB, multiple, onFiles, showError, clearError]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      validateAndEmit(e.dataTransfer.files);
    },
    [disabled, validateAndEmit]
  );

  const handlePick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      validateAndEmit(e.target.files);
      e.currentTarget.value = "";
    },
    [validateAndEmit]
  );

  return (
    <div className="relative">
      <div
        role="group"
        aria-labelledby={`${liveId}-title`}
        className={getContainerStyles()}
        style={{
          width: width
            ? typeof width === "number"
              ? `${width}px`
              : width
            : undefined,
          height: height
            ? typeof height === "number"
              ? `${height}px`
              : height
            : undefined,
        }}
        onDragEnter={(e) => {
          if (disabled) return;
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          if (disabled) return;
          e.preventDefault();
        }}
        onDragLeave={(e) => {
          if (disabled) return;
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragging(false);
          }
        }}
        onDrop={handleDrop}
        tabIndex={disabled || !!error ? -1 : 0}
        aria-disabled={disabled || !!error}
        aria-hidden={!!error}
        onKeyDown={(e) => {
          if (disabled || error) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <div className="flex flex-col items-center justify-center h-full text-center select-none">
          <div
            className={[
              isDragging ? "border-violet-400" : "border-zinc-300",
            ].join(" ")}
            aria-hidden="true"
          >
            <FileUploadIcon></FileUploadIcon>
          </div>

          <div id={`${liveId}-title`} className="text-sm font-semibold mt-2.5">
            파일 드롭하기
          </div>
          <div className="text-zinc-400 text-sm mb-1 font-semibold">or</div>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            className={getButtonStyles()}
          >
            파일 업로드
          </button>

          <input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            onChange={handlePick}
          />
        </div>
      </div>
      {error && !modal && (
        <div
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className="absolute inset-0 z-10 grid place-items-center cursor-pointer"
          onClick={clearError}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              clearError();
            }
          }}
          tabIndex={0}
          title="클릭해서 닫기"
        >
          <div className="px-4 py-2 rounded-md bg-white/85 backdrop-blur-sm border border-rose-200 shadow">
            <p className="text-sm font-semibold text-rose-700 text-center">
              {error}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
