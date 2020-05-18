import React from 'react';
import styled from 'styled-components';
import { IconButton, Zoom } from '@material-ui/core';
import { Menu, } from '@material-ui/icons';

export const Hamburger = () => (
  <Zoom in={true} timeout={400}>
    <StHamburger>
      <Menu/>
    </StHamburger>
  </Zoom>
)

export default {
  component: Hamburger,
  title: 'Button',
};


const StHamburger = styled(IconButton)`
  position: fixed;
  top:0;
  z-index: 1;
`