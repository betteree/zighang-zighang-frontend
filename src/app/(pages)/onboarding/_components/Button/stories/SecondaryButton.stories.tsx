import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { SecondaryButton } from "../SecondaryButton";

const meta: Meta<typeof SecondaryButton> = {
  title: "Onboarding/Button/SecondaryButton",
  component: SecondaryButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "보조 액션용 버튼 컴포넌트입니다. `disabled` 속성으로 활성/비활성 상태를 제어하며, 비활성 상태에서는 클릭이 불가능합니다.",
      },
    },
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      description: "버튼 비활성화 여부",
      table: { defaultValue: { summary: "false" } },
    },
    children: {
      control: { type: "text" },
      description: "버튼에 표시될 텍스트",
    },
    onClick: {
      action: "clicked",
      description: "버튼 클릭 시 호출되는 함수 (disabled=false일 때만 동작)",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본(활성) */
export const Default: Story = {
  args: {
    children: "확인",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본 상태(활성)입니다. 흰색 배경에 회색 보더가 적용되며 클릭이 가능합니다.",
      },
    },
  },
};

/** 활성 상태 */
export const Enabled: Story = {
  args: {
    children: "확인",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "활성 상태의 버튼입니다. 클릭 시 액션 로그가 기록됩니다.",
      },
    },
  },
};

/** 비활성 상태 */
export const Disabled: Story = {
  args: {
    children: "확인",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "비활성 상태의 버튼입니다. 회색 톤으로 표시되며 클릭 이벤트가 발생하지 않습니다.",
      },
    },
  },
};

/** 다양한 텍스트 */
export const DifferentTexts: Story = {
  args: {
    children: "다음 단계로",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "버튼에 다양한 텍스트를 표시할 수 있습니다.",
      },
    },
  },
};

/** 긴 텍스트 */
export const LongText: Story = {
  args: {
    children: "매우 매우 긴 버튼 텍스트입니다",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "긴 텍스트도 줄바꿈 없이 영역 내에서 표시됩니다.",
      },
    },
  },
};

/** 한국어 텍스트 */
export const KoreanText: Story = {
  args: {
    children: "시작하기",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "한국어 텍스트도 잘 표시됩니다.",
      },
    },
  },
};

/** 대화형 스토리: Controls로 disabled 토글 */
export const Interactive: Story = {
  args: {
    children: "클릭해보세요",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Controls 패널에서 `disabled` 값을 변경하여 활성/비활성 상태를 확인할 수 있습니다.",
      },
    },
  },
};

/** 상태 전환 예시(외부 토글로 제어) */
export const StateTransition: Story = {
  render: (args) => {
    const [disabled, setDisabled] = React.useState(false);

    return (
      <div className="space-y-4">
        <SecondaryButton
          {...args}
          disabled={disabled}
          onClick={() => {
            // 비활성 상태에서는 onClick이 호출되지 않음(네이티브 disabled)
            if (!disabled) {
              args.onClick?.(); // 액션 로거 호출
            }
          }}
        >
          {disabled ? "활성화하기" : "비활성화하기"}
        </SecondaryButton>

        <div className="flex items-center gap-2">
          <label htmlFor="toggle" className="text-sm text-gray-600">
            외부 토글로 상태 전환
          </label>
          <input
            id="toggle"
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
          />
          <span className="text-sm text-gray-600">
            현재 상태: {disabled ? "비활성화" : "활성화"}
          </span>
        </div>
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
          "비활성 버튼은 클릭 이벤트가 발생하지 않으므로, 외부 토글(checkbox)로 상태를 전환해 데모합니다.",
      },
    },
  },
};
