import type { Meta, StoryObj } from "@storybook/nextjs";
import React, { useState } from "react";
import Dropdown, { type DropdownProps } from "../Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Onboarding/Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function Template(args: DropdownProps) {
  const [value, setValue] = useState<string | null>(args.value ?? null);
  return (
    <Dropdown
      {...args}
      value={value}
      onChange={(next) => setValue(next)}
    />
  );
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    placeholder: "선택하세요",
    options: [
      { value: "a", label: "옵션 A" },
      { value: "b", label: "옵션 B" },
      { value: "c", label: "옵션 C" },
    ],
    value: null,
    disabled: false,
  },
};

export const WithInitialValue: Story = {
  render: (args) => <Template {...args} />,
  args: {
    placeholder: "선택하세요",
    options: [
      { value: "a", label: "옵션 A" },
      { value: "b", label: "옵션 B" },
      { value: "c", label: "옵션 C" },
    ],
    value: "b",
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args) => <Template {...args} />,
  args: {
    placeholder: "비활성화됨",
    options: ["A", "B", "C"],
    value: null,
    disabled: true,
  },
};


