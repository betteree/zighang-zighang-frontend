import { Meta, StoryObj } from "@storybook/nextjs";
import { RegionButton } from "../RegionButton";

const meta: Meta<typeof RegionButton> = {
  title: "Onboarding/Region/RegionButton",
  component: RegionButton,
  parameters: { layout: "centered" },
  args: { label: "서울", active: false },
  argTypes: {
    label: {
      control: "select",
      options: [
        "전체",
        "서울",
        "경기",
        "인천",
        "부산",
        "대구",
        "광주",
        "대전",
        "울산",
        "세종",
        "강원",
        "경남",
        "경북",
        "전남",
        "전북",
        "충남",
        "충북",
        "제주",
        "해외",
      ],
    },
    active: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};
export default meta;

type Story = StoryObj<typeof RegionButton>;

export const Default: Story = {};

export const Active: Story = { args: { active: true } };
