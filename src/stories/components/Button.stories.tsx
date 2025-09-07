import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 버튼
 */
export const Default: Story = {
  args: {
    children: "버튼",
  },
};

/**
 * 작은 크기 버튼
 */
export const Small: Story = {
  args: {
    size: "small",
    children: "작은 버튼",
  },
};

/**
 * 큰 크기 버튼
 */
export const Large: Story = {
  args: {
    size: "large",
    children: "큰 버튼",
  },
};

/**
 * Secondary 스타일 버튼
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary 버튼",
  },
};

/**
 * Outline 스타일 버튼
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline 버튼",
  },
};

/**
 * 비활성화된 버튼
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "비활성화 버튼",
  },
};

/**
 * 클릭 이벤트가 있는 버튼
 */
export const WithClick: Story = {
  args: {
    children: "클릭해보세요",
    onClick: () => alert("버튼이 클릭되었습니다!"),
  },
};
