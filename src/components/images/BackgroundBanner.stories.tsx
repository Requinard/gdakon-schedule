import { Meta, StoryFn } from "@storybook/react";

import { BackgroundBanner } from "./BackgroundBanner";

export default {
    component: BackgroundBanner,
} as Meta<typeof BackgroundBanner>;

export const Default: StoryFn<typeof BackgroundBanner> = (args) => (
    <BackgroundBanner {...args} />
);
