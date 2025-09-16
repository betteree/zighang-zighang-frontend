// Map.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { OnboardingMap } from "../OnboardingMap";
import { SIDO_GEO } from "../../../_types/onBoradingMap";
import { RegionValue } from "../../../_types/regionTypes";

const meta: Meta<typeof OnboardingMap> = {
  title: "Onboarding/Map/Map",
  component: OnboardingMap,
  parameters: { layout: "centered" },
  args: {
    geographies: SIDO_GEO,
    className: "",
  },
  argTypes: {
    geographies: { control: false },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof OnboardingMap>;

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<RegionValue[]>([]);

    return (
      <div className="flex flex-col items-center gap-4">
        <OnboardingMap
          {...args}
          value={value}
          onSelect={(r) => setValue([r])}
        />

        <div className="text-sm text-zinc-700">
          선택: {value.length > 0 ? value.join(", ") : "없음"}
        </div>

        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border"
            onClick={() => setValue(["전체"])}
          >
            전체
          </button>
          <button
            className="px-3 py-1 rounded border"
            onClick={() => setValue(["해외"])}
          >
            해외
          </button>
          <button
            className="px-3 py-1 rounded border"
            onClick={() => setValue([])}
          >
            초기화
          </button>
        </div>
      </div>
    );
  },
};
