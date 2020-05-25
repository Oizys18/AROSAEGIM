import React from "react";
import { action } from "@storybook/addon-actions";
import Navbar from "./Navbar";
import styled from "styled-components";
export default {
  component: Navbar,
  title: "Navbar",
};
const DivWrap = styled.div`
  width: 240px;
`;
export const defaultbtn = () => (
  <DivWrap>
    <Navbar onClick={action("clicked")} />{" "}
  </DivWrap>
);
