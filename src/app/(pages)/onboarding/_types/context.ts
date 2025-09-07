// 퍼널 단계별 컨텍스트 타입 정의 (단계 진행에 따라 필수 값 증가)
type 직군입력 = {
  직군?: string[];
  직무?: string[];
  경력?: number;
  학력?: string;
  지역?: string;
};

type 직무입력 = {
  직군: string[];
  직무?: string[];
  경력?: number;
  학력?: string;
  지역?: string;
};

type 경력입력 = {
  직군: string[];
  직무: string[];
  경력?: number;
  학력?: string;
  지역?: string;
};

type 학력입력 = {
  직군: string[];
  직무: string[];
  경력: number;
  학력?: string;
  지역?: string;
};

type 지역입력 = {
  직군: string[];
  직무: string[];
  경력: number;
  학력: string;
  지역?: string | null;
};

type 파일업로드 = Record<string, never>;
type 완료 = Record<string, never>;

export type {
  직군입력,
  직무입력,
  경력입력,
  학력입력,
  지역입력,
  파일업로드,
  완료,
};
