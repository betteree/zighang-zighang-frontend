import type { Meta, StoryObj } from "@storybook/nextjs";
import ExploreJobCard from "../ExploreJobCard";
import { ProblemSolvingIcon } from "../../../_exploreChip/ProblemSolvingIcon";

const meta: Meta<typeof ExploreJobCard> = {
  title: "Onboarding/ExploreJobCard/ExploreJobCard",
  component: ExploreJobCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on.*" }, // on* props 자동 액션
  },
  args: {
    jobKey: "problem-solving",
    category: "문제를 해결하고\n답을 찾는 활동",
    Icon: ProblemSolvingIcon,
    selected: false,
  },
  argTypes: {
    jobKey: {
      control: "select",
      options: [
        "problem-solving",
        "communicate-persuade",
        "creative-content",
        "data-analysis",
        "people-org-growth",
        "field-execution",
        "care-health",
        "law-compliance",
      ],
    },
    category: { control: "text" },
    Icon: { control: false },
    selected: { control: "boolean" },
    className: { control: false },
    onSelect: { action: "onSelect" },
  },
};

export default meta;
type Story = StoryObj<typeof ExploreJobCard>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
