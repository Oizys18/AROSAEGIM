import React from "react";
import UserInput from "./UserInput";
import { Face } from '@material-ui/icons';

export default {
  component: UserInput,
  title: "Input",
};

export const userInput = () => <UserInput label='Label' icon={<Face/>}/>
