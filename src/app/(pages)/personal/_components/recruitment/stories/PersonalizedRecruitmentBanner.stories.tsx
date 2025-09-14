import type { Meta, StoryObj } from "@storybook/nextjs";
import PersonalizedRecruitmentBanner from "../PersonalizedRecruitmentBanner";

const meta: Meta<typeof PersonalizedRecruitmentBanner> = {
  title: "Personal/PersonalizedRecruitmentBanner",
  component: PersonalizedRecruitmentBanner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    userName: {
      control: "text",
      description: "사용자 이름",
    },
    keywords: {
      control: "object",
      description: "키워드 배열",
    },
    onKeywordClick: {
      action: "keywordClicked",
      description: "키워드 클릭 이벤트 핸들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: "민수",
    keywords: [
      { id: "1", keyword: "재택" },
      { id: "2", keyword: "스타트업" },
      { id: "3", keyword: "대기업" },
      { id: "4", keyword: "프리랜서" },
      { id: "5", keyword: "원격근무" },
    ],
  },
};

export const DifferentUser: Story = {
  args: {
    userName: "지영",
    keywords: [
      { id: "1", keyword: "대기업" },
      { id: "2", keyword: "정규직" },
      { id: "3", keyword: "복지" },
      { id: "4", keyword: "성장" },
    ],
  },
};

export const ManyKeywords: Story = {
  args: {
    userName: "현우",
    keywords: [
      { id: "1", keyword: "재택" },
      { id: "2", keyword: "스타트업" },
      { id: "3", keyword: "대기업" },
      { id: "4", keyword: "프리랜서" },
      { id: "5", keyword: "원격근무" },
      { id: "6", keyword: "정규직" },
      { id: "7", keyword: "복지" },
      { id: "8", keyword: "성장" },
    ],
  },
};

export const Interactive: Story = {
  args: {
    userName: "테스트",
    keywords: [
      { id: "1", keyword: "재택" },
      { id: "2", keyword: "스타트업" },
      { id: "3", keyword: "대기업" },
      { id: "4", keyword: "프리랜서" },
      { id: "5", keyword: "원격근무" },
    ],
    onKeywordClick: (keywordId) => {
      console.log(`키워드 ${keywordId}가 클릭되었습니다.`);
    },
  },
};
