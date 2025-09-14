import type { Meta, StoryObj } from "@storybook/nextjs";
import RecommendArea from "../recommendArea";

const meta: Meta<typeof RecommendArea> = {
  title: "Personal/RecommendArea",
  component: RecommendArea,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 파일이 없을 때 (기본 상태)
export const WithoutFiles: Story = {
  args: {
    hasFiles: false,
  },
};

// 파일이 있을 때
export const WithFiles: Story = {
  args: {
    hasFiles: true,
  },
};

// 모바일 뷰 - 파일 없음
export const MobileWithoutFiles: Story = {
  ...WithoutFiles,
  parameters: {
    ...WithoutFiles.parameters,
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// 모바일 뷰 - 파일 있음
export const MobileWithFiles: Story = {
  ...WithFiles,
  parameters: {
    ...WithFiles.parameters,
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// 데스크톱 뷰 - 파일 없음
export const DesktopWithoutFiles: Story = {
  ...WithoutFiles,
  parameters: {
    ...WithoutFiles.parameters,
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

// 데스크톱 뷰 - 파일 있음
export const DesktopWithFiles: Story = {
  ...WithFiles,
  parameters: {
    ...WithFiles.parameters,
    viewport: {
      defaultViewport: "desktop",
    },
  },
};
