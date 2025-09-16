import type { Meta, StoryObj } from "@storybook/nextjs";
import PersonalizedRecruitmentList from "../PersonalizedRecruitmentList";

const meta: Meta<typeof PersonalizedRecruitmentList> = {
  title: "Personal/PersonalizedRecruitmentList",
  component: PersonalizedRecruitmentList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "채용 공고 아이템 배열",
    },
    itemsPerPage: {
      control: { type: "number", min: 1, max: 20 },
      description: "페이지당 표시할 아이템 수",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 데이터 생성 함수
const generateSampleData = (count: number) => {
  const companies = [
    "카카오",
    "네이버",
    "당근마켓",
    "토스",
    "라인",
    "쿠팡",
    "배달의민족",
    "우아한형제들",
    "야놀자",
    "직방",
    "마켓컬리",
    "뱅크샐러드",
    "스포카",
    "그린랩스",
    "가우디오랩",
    "플리토",
    "브랜디",
    "데이원",
    "스마일게이트",
  ];

  const positions = [
    "프론트엔드 개발자",
    "백엔드 개발자",
    "풀스택 개발자",
    "데이터 사이언티스트",
    "AI 엔지니어",
    "DevOps 엔지니어",
    "iOS 개발자",
    "Android 개발자",
    "UX/UI 디자이너",
    "프로덕트 매니저",
    "마케팅 매니저",
    "영업 매니저",
    "인사 담당자",
    "재무 담당자",
    "운영 담당자",
    "고객 서비스 담당자",
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `recruitment-${index + 1}`,
    logo: `https://via.placeholder.com/60x60/7951FF/FFFFFF?text=${companies[
      index % companies.length
    ].charAt(0)}`,
    company: companies[index % companies.length],
    title: positions[index % positions.length],
    bookmarked: Math.random() > 0.5,
    reason: `${
      positions[index % positions.length]
    } 경험과 기술 스택이 요구사항과 일치합니다.`,
  }));
};

// 기본 스토리 - 9개 아이템 (3x3 그리드)
export const Default: Story = {
  args: {
    items: generateSampleData(9),
    itemsPerPage: 9,
  },
};

// 많은 아이템 - 페이지네이션 테스트
export const WithPagination: Story = {
  args: {
    items: generateSampleData(25),
    itemsPerPage: 9,
  },
};

// 모바일 테스트용 - 3개 아이템 (1x3 그리드)
export const MobileView: Story = {
  args: {
    items: generateSampleData(3),
    itemsPerPage: 3,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// 적은 아이템 - 6개
export const FewItems: Story = {
  args: {
    items: generateSampleData(6),
    itemsPerPage: 9,
  },
};

// 페이지당 6개 아이템
export const SixItemsPerPage: Story = {
  args: {
    items: generateSampleData(18),
    itemsPerPage: 6,
  },
};

// 빈 리스트
export const EmptyList: Story = {
  args: {
    items: [],
    itemsPerPage: 9,
  },
};

// 북마크된 아이템들만
export const BookmarkedItems: Story = {
  args: {
    items: generateSampleData(12).map((item) => ({
      ...item,
      bookmarked: true,
    })),
    itemsPerPage: 9,
  },
};

// 커스텀 스타일
export const WithCustomStyle: Story = {
  args: {
    items: generateSampleData(9),
    itemsPerPage: 9,
    className: "bg-gray-50 p-4 rounded-lg",
  },
};
