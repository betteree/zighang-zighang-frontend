import type { Meta, StoryObj } from "@storybook/nextjs";
import FileList from "../fileList";

const meta: Meta<typeof FileList> = {
  title: "Personal/FileList",
  component: FileList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    files: {
      control: "object",
      description: "파일 목록 배열",
    },
    onDelete: {
      action: "deleted",
      description: "파일 삭제 콜백",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    files: [],
    onDelete: (id) => console.log("Delete file:", id),
  },
};

export const WithFiles: Story = {
  args: {
    files: [
      {
        id: "1",
        name: "resume.pdf",
        type: "application/pdf",
        size: 1024000,
        url: "https://example.com/resume.pdf",
        uploadDate: "2024-01-15",
      },
      {
        id: "2",
        name: "portfolio.pdf",
        type: "application/pdf",
        size: 2048000,
        url: "https://example.com/portfolio.pdf",
        uploadDate: "2024-01-16",
      },
      {
        id: "3",
        name: "cover-letter.pdf",
        type: "application/pdf",
        size: 512000,
        url: "https://example.com/cover-letter.pdf",
        uploadDate: "2024-01-17",
      },
    ],
    onDelete: (id) => console.log("Delete file:", id),
  },
};

export const SingleFile: Story = {
  args: {
    files: [
      {
        id: "1",
        name: "document.pdf",
        type: "application/pdf",
        size: 1536000,
        url: "https://example.com/document.pdf",
        uploadDate: "2024-01-18",
      },
    ],
    onDelete: (id) => console.log("Delete file:", id),
  },
};

export const ManyFiles: Story = {
  args: {
    files: Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      name: `file-${i + 1}.pdf`,
      type: "application/pdf",
      size: Math.floor(Math.random() * 5000000) + 100000,
      url: `https://example.com/file-${i + 1}.pdf`,
      uploadDate: `2024-01-${String(i + 1).padStart(2, "0")}`,
    })),
    onDelete: (id) => console.log("Delete file:", id),
  },
};
