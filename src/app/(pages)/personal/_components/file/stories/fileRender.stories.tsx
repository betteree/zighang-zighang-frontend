import type { Meta, StoryObj } from "@storybook/nextjs";
import FileRender from "../fileRender";

const meta: Meta<typeof FileRender> = {
  title: "Personal/FileRender",
  component: FileRender,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    file: {
      control: "object",
      description: "파일 정보 객체",
    },
    index: {
      control: "number",
      description: "파일 인덱스",
    },
    onDelete: {
      action: "deleted",
      description: "파일 삭제 콜백",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PDFFile: Story = {
  args: {
    file: {
      id: "1",
      name: "resume.pdf",
      type: "application/pdf",
      size: 1024000,
      url: "https://example.com/resume.pdf",
      uploadDate: "2024.01.15",
    },
    index: 0,
    onDelete: (id) => console.log("Delete file:", id),
  },
};
