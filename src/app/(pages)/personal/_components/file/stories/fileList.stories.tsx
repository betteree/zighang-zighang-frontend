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
    onFilesChange: {
      action: "filesChanged",
      description: "파일 목록 변경 콜백",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFilesChange: (hasFiles) => console.log("Files changed:", hasFiles),
  },
};
