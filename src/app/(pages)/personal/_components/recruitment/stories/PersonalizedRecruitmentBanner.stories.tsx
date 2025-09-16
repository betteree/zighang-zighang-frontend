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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: "민수",
  },
};

export const DifferentUser: Story = {
  args: {
    userName: "지영",
  },
};

export const Interactive: Story = {
  args: {
    userName: "테스트",
  },
};
