import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import RegionButtonList from "../RegionButtonList";
import {
  REGION_VALUES,
  type RegionValue,
} from "../../../_types/regionTypes";

const meta: Meta<typeof RegionButtonList> = {
  title: "Onboarding/Region/RegionButtonList",
  component: RegionButtonList,
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: "select", options: [null, ...REGION_VALUES] },
    onChange: { action: "change" },
  },
  args: { value: null },
};
export default meta;

type Story = StoryObj<typeof RegionButtonList>;

export const Default: Story = {};

export const InteractiveLocalState: Story = {
  render: (args) => {
    const [value, setValue] = useState<RegionValue | null>(args.value ?? null);
    return (
      <RegionButtonList
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
          args.onChange?.(next);
        }}
      />
    );
  },
};

export const PreselectedSeoul: Story = { args: { value: "서울" } };
