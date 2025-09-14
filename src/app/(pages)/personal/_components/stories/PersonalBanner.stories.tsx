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
    files: {
      control: "object",
      description: "파일 목록 (파일이 있으면 배너가 숨겨짐)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    files: [],
  },
};

export const WithFiles: Story = {
  args: {
    files: [
      {
        id: "1",
        name: "resume.pdf",
        uploadedAt: "2024-01-15",
      },
    ],
  },
};

export const EmptyFiles: Story = {
  args: {
    files: [],
  },
};

export const MultipleFiles: Story = {
  args: {
    files: [
      {
        id: "1",
        name: "resume.pdf",
        uploadedAt: "2024-01-15",
      },
      {
        id: "2",
        name: "cover_letter.doc",
        uploadedAt: "2024-01-16",
      },
    ],
  },
};
