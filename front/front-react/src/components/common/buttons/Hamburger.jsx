import React, { Component } from 'react';
import {Storage} from '../../../storage/Storage';
import styled from 'styled-components';
import { IconButton, Zoom } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

class Hamburger extends Component {
  render(){
    return(
      <Zoom in={!this.context.sideMenu} timeout={400}>
        <StHamburger onClick={this.context.toggleSideMenu}>
          <Menu/>
        </StHamburger>
      </Zoom>
    )
  }
} Hamburger.contextType = Storage;
export default Hamburger;

const StHamburger = styled(IconButton)`
  position: absolute;
  left: 0;
  z-index: 1;
`