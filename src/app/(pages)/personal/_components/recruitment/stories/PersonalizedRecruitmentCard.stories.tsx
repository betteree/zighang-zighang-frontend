import type { Meta, StoryObj } from "@storybook/nextjs";
import PersonalizedRecruitmentCard from "../PersonalizedRecruitmentCard";

const meta: Meta<typeof PersonalizedRecruitmentCard> = {
  title: "Personal/PersonalizedRecruitmentCard",
  component: PersonalizedRecruitmentCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    item: {
      control: "object",
      description: "채용 공고 정보",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      id: "1",
      logo: "https://via.placeholder.com/48x48/4F46E5/FFFFFF?text=LOGO",
      company: "테크스타트업",
      title: "프론트엔드 개발자",
      bookmarked: false,
      reason: "프론트엔드 개발 경험과 React 기술 스택이 일치합니다.",
    },
  },
};
