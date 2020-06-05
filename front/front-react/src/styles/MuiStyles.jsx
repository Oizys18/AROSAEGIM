import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';


export const setPrimaryColor = createMuiTheme({
  palette: {
    primary: { main: '#F3B3A6' }
  }
});

export const CustomSwitch = withStyles({
  switchBase: {
    color: '#F4C6BA',
    '&$checked': {
      color: '#F4C6BA',
    },
    '&$checked + $track': {
      backgroundColor: '#F4C6BA',
    },
  },
  checked: {},
  track: {},
})(Switch);