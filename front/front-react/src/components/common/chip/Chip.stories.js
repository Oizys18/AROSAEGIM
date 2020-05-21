import React, { Fragment } from "react";
import { action } from "@storybook/addon-actions";
import Chip from "./Chip";

export default {
  component: Chip,
  title: "Chip",
};

export const clickableChip = () => (
  <Chip onClick={action("clicked")} text="클릭 칩!" />
);
export const SmallChip = () => <Chip size="small" text="작은 칩!" />;

export const DefaultChip = () => <Chip text="보통 칩!" />;

export const OutlinedChip = () => (
  <Fragment>
    <Chip variant="outlined" size="small" text="아웃라인 칩!" />
    <Chip variant="outlined" size="medium" text="아웃라인 칩!" />
  </Fragment>
);

export const ColoredChip = () => (
  <Fragment>
    <Chip variant="outlined" size="small" text="default" />
    <Chip variant="outlined" size="small" color="primary" text="primary" />
    <Chip variant="outlined" size="small" color="secondary" text="secondary" />
    <Chip size="small" text="default" />
    <Chip size="small" color="primary" text="primary" />
    <Chip size="small" color="secondary" text="secondary" />
  </Fragment>
);
