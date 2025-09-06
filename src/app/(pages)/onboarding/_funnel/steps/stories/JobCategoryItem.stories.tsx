import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { JobCategoryItem } from "../JobCategoryItem";

const meta: Meta<typeof JobCategoryItem> = {
  title: "Onboarding/Button/JobCategoryItem",
  component: JobCategoryItem,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "직군/직무 카테고리 선택용 배지 버튼입니다. 선택 여부에 따라 스타일이 달라집니다.",
      },
    },
  },
  argTypes: {
    name: {
      control: { type: "text" },
      description: "표시할 카테고리명",
    },
    isSelected: {
      control: { type: "boolean" },
      description: "선택 여부",
      table: { defaultValue: { summary: "false" } },
    },
    onClick: {
      action: "clicked",
      description: "클릭 시 호출되는 함수",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본(비선택) */
export const Default: Story = {
  args: {
    name: "프론트엔드",
    isSelected: false,
  },
  parameters: {
    docs: {
      description: { story: "비선택 상태의 카테고리 버튼입니다." },
    },
  },
};

/** 선택 상태 */
export const Selected: Story = {
  args: {
    name: "프론트엔드",
    isSelected: true,
  },
  parameters: {
    docs: {
      description: { story: "선택 상태의 카테고리 버튼입니다." },
    },
  },
};

/** 다양한 라벨 */
export const DifferentNames: Story = {
  args: {
    name: "백엔드",
    isSelected: false,
  },
  parameters: {
    docs: { description: { story: "라벨 텍스트를 자유롭게 바꿔보세요." } },
  },
};

/** 긴 라벨 */
export const LongName: Story = {
  args: {
    name: "풀스택(프론트엔드 + 백엔드)",
    isSelected: false,
  },
  parameters: {
    docs: { description: { story: "긴 텍스트도 버튼 내부에 표시됩니다." } },
  },
};

/** 대화형: 내부에서 선택 토글 */
export const Interactive: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState(!!args.isSelected);

    return (
      <div className="space-y-4">
        <JobCategoryItem
          {...args}
          isSelected={selected}
          onClick={() => {
            setSelected((s) => !s);
            args.onClick?.();
          }}
        />
        <p className="text-sm text-gray-600">
          현재 상태: {selected ? "선택됨" : "비선택"}
        </p>
      </div>
    );
  },
  args: {
    name: "프론트엔드",
    isSelected: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "버튼을 클릭해 선택 상태를 토글할 수 있습니다. Controls 패널에서 `name`을 변경해보세요.",
      },
    },
  },
};
