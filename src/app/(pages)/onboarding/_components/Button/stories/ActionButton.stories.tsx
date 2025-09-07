import React from "react";

import { ActionButton } from "../ActionButton";
import { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof ActionButton> = {
  title: "Onboarding/Button/ActionButton",
  component: ActionButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "주요 액션을 위한 버튼 컴포넌트입니다. disabled와 abled 두 가지 상태를 지원하며, abled 상태에서만 클릭이 가능합니다.",
      },
    },
  },
  argTypes: {
    state: {
      control: { type: "select" },
      options: ["disabled", "abled"],
      description: "버튼의 상태 (disabled: 비활성화, abled: 활성화)",
    },
    children: {
      control: { type: "text" },
      description: "버튼에 표시될 텍스트",
    },
    onClick: {
      action: "clicked",
      description: "버튼 클릭 시 호출되는 함수",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (disabled 상태)
export const Default: Story = {
  args: {
    children: "확인",
    state: "disabled",
  },
};

// 활성화된 상태
export const Abled: Story = {
  args: {
    children: "확인",
    state: "abled",
  },
  parameters: {
    docs: {
      description: {
        story:
          "활성화된 상태의 버튼입니다. 보라색 배경에 hover 효과가 적용되며 클릭이 가능합니다.",
      },
    },
  },
};

// 비활성화된 상태
export const Disabled: Story = {
  args: {
    children: "확인",
    state: "disabled",
  },
  parameters: {
    docs: {
      description: {
        story: "비활성화된 상태의 버튼입니다. 회색 배경에 클릭이 불가능합니다.",
      },
    },
  },
};

// 다양한 텍스트
export const DifferentTexts: Story = {
  args: {
    children: "다음 단계로",
    state: "abled",
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 텍스트를 표시할 수 있습니다.",
      },
    },
  },
};

// 긴 텍스트
export const LongText: Story = {
  args: {
    children: "매우 긴 버튼 텍스트입니다",
    state: "abled",
  },
  parameters: {
    docs: {
      description: {
        story: "긴 텍스트도 적절하게 표시됩니다.",
      },
    },
  },
};

// 한국어 텍스트
export const KoreanText: Story = {
  args: {
    children: "시작하기",
    state: "abled",
  },
  parameters: {
    docs: {
      description: {
        story: "한국어 텍스트도 잘 표시됩니다.",
      },
    },
  },
};

// 대화형 스토리
export const Interactive: Story = {
  args: {
    children: "클릭해보세요",
    state: "abled",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Controls 패널에서 state를 변경하여 다양한 상태를 확인할 수 있습니다.",
      },
    },
  },
};

// 상태 전환 예시
export const StateTransition: Story = {
  render: (args) => {
    const [state, setState] = React.useState<"disabled" | "abled">("disabled");

    return (
      <div className="space-y-4">
        <ActionButton
          {...args}
          state={state}
          onClick={() =>
            setState(state === "disabled" ? "abled" : "disabled")
          }
        >
          {state === "disabled" ? "활성화하기" : "비활성화하기"}
        </ActionButton>
        <p className="text-sm text-gray-600">
          현재 상태: {state === "disabled" ? "비활성화" : "활성화"}
        </p>
      </div>
    );
  },
  args: {
    children: "상태 변경",
  },
  parameters: {
    docs: {
      description: {
        story:
          "버튼을 클릭하여 상태를 전환할 수 있습니다. disabled와 abled 상태 간의 변화를 확인해보세요.",
      },
    },
  },
};
