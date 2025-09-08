import type { Meta, StoryObj } from "@storybook/nextjs";
import { Ranking } from "../Ranking";

const meta: Meta<typeof Ranking> = {
  title: "category/Ranking",
  component: Ranking,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Ranking>;

export const Default: Story = {};
