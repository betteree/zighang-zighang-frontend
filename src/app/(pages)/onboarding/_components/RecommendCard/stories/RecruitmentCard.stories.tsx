import type { Meta, StoryObj } from "@storybook/nextjs";
import RecruitmentCard from "../RecruitmentCard"; // 실제 카드 컴포넌트 경로 맞게 수정

const meta: Meta<typeof RecruitmentCard> = {
  title: "Onboarding/RecruitmentCard/RecruitmentCard",
  component: RecruitmentCard,
};

export default meta;
type Story = StoryObj<typeof RecruitmentCard>;

export const Default: Story = {
  args: {
    experience: "1년차 이상",
    logo: "https://via.placeholder.com/64x64.png?text=Logo",
    title: "프론트엔드 개발자",
    company: "오픈AI",
    location: "서울특별시 강남구",
  },
};
