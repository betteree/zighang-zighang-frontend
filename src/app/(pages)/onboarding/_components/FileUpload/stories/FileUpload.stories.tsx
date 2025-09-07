import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "@storybook/test";
import React from "react";
import FileUploadCard from "../FileUploadCard";

const meta = {
  title: "Onboarding/FileUpload/FileUploadCard",
  component: FileUploadCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full ">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onFiles: {
      control: false,
      description: "유효성 통과 후 업로드된 파일 배열 콜백",
    },
    onError: { control: false, description: "유효성 실패 시 에러 메시지 콜백" },
    multiple: { control: "boolean" },
    accept: {
      control: "text",
      description: "예: 'image/*,.pdf,.csv' (브라우저 accept 규칙과 동일)",
    },
    maxSizeMB: { control: { type: "number", min: 1, step: 1 } },
    disabled: { control: "boolean" },
  },
  parameters: {
    controls: { expanded: true },
    layout: "centered",
    a11y: { element: "#storybook-root" },
    docs: {
      description: {
        component:
          "드래그&드롭/버튼 클릭으로 파일을 선택하는 카드형 업로더 컴포넌트입니다. " +
          "`accept`, `maxSizeMB`로 클라이언트 검증을 수행하고 통과 시 `onFiles`가 호출됩니다.",
      },
    },
  },
} satisfies Meta<typeof FileUploadCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFiles: fn<(files: File[]) => void>().mockName("onFiles"),
    onError: fn<(message: string) => void>().mockName("onError"),
    multiple: false,
    accept: undefined,
    maxSizeMB: 10,
    disabled: false,
  },
};
