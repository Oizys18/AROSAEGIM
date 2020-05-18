import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { Menu, } from '@material-ui/icons';

const StHamburger = styled.div`
  position: fixed;
  top:0;
  z-index: 1;
`

export const Hamburger = () => (
  <StHamburger>
    <IconButton>
      <Menu/>
    </IconButton>
  </StHamburger>
)


export default {
  component: Hamburger,
  title: 'Button',
};