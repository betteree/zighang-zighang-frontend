import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import RegionButtonList from "../RegionButtonList";
import { type RegionValue } from "../../../_types/regionTypes";

const meta: Meta<typeof RegionButtonList> = {
  title: "Onboarding/Region/RegionButtonList",
  component: RegionButtonList,
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: "object" },
    onChange: { action: "change" },
  },
  args: { value: [] },
};
export default meta;

type Story = StoryObj<typeof RegionButtonList>;

export const Default: Story = {};

export const InteractiveLocalState: Story = {
  render: (args) => {
    const [value, setValue] = useState<RegionValue[]>(args.value ?? []);
    return (
      <RegionButtonList
        {...args}
        value={value}
        onChange={(next) => {
          setValue([next]);
          args.onChange?.(next);
        }}
      />
    );
  },
};

export const PreselectedSeoul: Story = { args: { value: ["서울"] } };
