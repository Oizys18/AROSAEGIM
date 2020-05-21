import React from "react";
import { action } from "@storybook/addon-actions";
import SmallButton from "./SmallButton";

export default {
  component: SmallButton,
  title: "Button",
};

export const small_btn = () => (
  <SmallButton onClick={action("clicked")} text="작은 버튼 😒" />
);
