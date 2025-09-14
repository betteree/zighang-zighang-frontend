import type { Meta, StoryObj } from "@storybook/nextjs";
import KeywordButton from "../keywordButton";

const meta: Meta<typeof KeywordButton> = {
  title: "Personal/KeywordButton",
  component: KeywordButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    keyword: {
      control: "text",
      description: "키워드 텍스트",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    keyword: "재택",
  },
};

export const LongKeyword: Story = {
  args: {
    keyword: "원격근무",
  },
};

export const Interactive: Story = {
  args: {
    keyword: "스타트업",
  },
  render: (args) => {
    return (
      <div className="flex gap-2">
        <KeywordButton {...args} />
        <KeywordButton
          keyword="대기업"
          onClick={() => console.log("대기업 클릭됨")}
        />
        <KeywordButton
          keyword="프리랜서"
          onClick={() => console.log("프리랜서 클릭됨")}
        />
      </div>
    );
  },
};
