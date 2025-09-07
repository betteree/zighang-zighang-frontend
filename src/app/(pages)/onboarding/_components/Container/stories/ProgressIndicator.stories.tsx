
import { Meta, StoryObj } from "@storybook/nextjs";
import { ProgressIndicator } from "../ProgressIndicator";

const meta: Meta<typeof ProgressIndicator> = {
  title: "Onboarding/Container/ProgressIndicator",
  component: ProgressIndicator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "진행률을 시각적으로 표시하는 컴포넌트입니다. 현재 단계와 전체 단계 수를 받아 활성화된 단계는 보라색 원과 숫자로, 비활성화된 단계는 회색 점으로 표시합니다.",
      },
    },
  },
  argTypes: {
    stepNumber: {
      control: { type: "number", min: 0, max: 10 },
      description: "현재 진행 중인 단계 번호",
    },
    totalSteps: {
      control: { type: "number", min: 1, max: 10 },
      description: "전체 단계 수",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    stepNumber: 3,
    totalSteps: 5,
  },
};

// 첫 번째 단계
export const FirstStep: Story = {
  args: {
    stepNumber: 1,
    totalSteps: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "첫 번째 단계를 진행 중인 상태입니다. 첫 번째 원만 보라색이고 숫자가 표시됩니다.",
      },
    },
  },
};

// 마지막 단계
export const LastStep: Story = {
  args: {
    stepNumber: 5,
    totalSteps: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "마지막 단계를 진행 중인 상태입니다. 모든 원이 보라색이고 숫자가 표시됩니다.",
      },
    },
  },
};

// 중간 단계
export const MiddleStep: Story = {
  args: {
    stepNumber: 3,
    totalSteps: 7,
  },
  parameters: {
    docs: {
      description: {
        story: "중간 단계를 진행 중인 상태입니다. 1-3단계는 보라색, 4-7단계는 회색 점으로 표시됩니다.",
      },
    },
  },
};

// 단일 단계
export const SingleStep: Story = {
  args: {
    stepNumber: 1,
    totalSteps: 1,
  },
  parameters: {
    docs: {
      description: {
        story: "단일 단계만 있는 경우입니다. 하나의 보라색 원과 숫자가 표시됩니다.",
      },
    },
  },
};

// 많은 단계
export const ManySteps: Story = {
  args: {
    stepNumber: 8,
    totalSteps: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "많은 단계가 있는 경우입니다. 1-8단계는 보라색, 9-10단계는 회색 점으로 표시됩니다.",
      },
    },
  },
};

// 0단계 (시작 전)
export const ZeroStep: Story = {
  args: {
    stepNumber: 0,
    totalSteps: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "아직 시작하지 않은 상태입니다. 모든 단계가 회색 점으로 표시됩니다.",
      },
    },
  },
};

// 대화형 스토리
export const Interactive: Story = {
  args: {
    stepNumber: 2,
    totalSteps: 6,
  },
  parameters: {
    docs: {
      description: {
        story: "Controls 패널에서 stepNumber와 totalSteps를 조정하여 다양한 상태를 확인할 수 있습니다.",
      },
    },
  },
};
