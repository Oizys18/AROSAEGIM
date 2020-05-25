import React from "react";
import { action } from "@storybook/addon-actions";
import DefaultButton from "./DefaultButton";

export default {
  component: DefaultButton,
  title: "Button",
};

export const default_btn = () => (
  <DefaultButton onClick={action("clicked")} text="보통 버튼 😭" />
);
