import type { Meta, StoryObj } from "@storybook/nextjs";
import PersonalBanner from "../personalBanner";

const meta: Meta<typeof PersonalBanner> = {
  title: "Personal/PersonalBanner",
  component: PersonalBanner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    hasFiles: {
      control: "boolean",
      description: "파일 존재 여부 (파일이 있으면 배너가 숨겨짐)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hasFiles: false,
  },
};

export const WithFiles: Story = {
  args: {
    hasFiles: true,
  },
};
