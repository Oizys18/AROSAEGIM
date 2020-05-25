import React from "react";
import HugeButton from "./HugeButton";
import { action } from "@storybook/addon-actions";
export default {
  component: HugeButton,
  title: "Button",
};

export const huge_btn = () => (
  <HugeButton onClick={action("clicked")} text="짱 큰 버튼 😉" />
);
