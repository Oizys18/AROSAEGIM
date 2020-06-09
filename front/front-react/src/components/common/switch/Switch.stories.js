import React from "react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import Switch from "./Switch";
import StSwitch from "@material-ui/core/Switch";

export default {
  component: Switch,
  title: "Switch",
};

export const defaultSwitch = () => (
  <DivWrap>
    <Switch labelText="On" labelPlacement="start" size="small" color="primary"/>
  </DivWrap>
);
export const justSwitch = () => <StSwitch />;

const DivWrap = styled.div`
  width: 240px;
`;

