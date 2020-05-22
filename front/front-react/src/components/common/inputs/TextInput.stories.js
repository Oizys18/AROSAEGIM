import React from "react";
import TextInput from "./TextInput";
import { Face } from '@material-ui/icons';

export default {
  component: TextInput,
  title: "Input",
};

export const textInput = () => <TextInput label='Label' icon={<Face/>}/>
