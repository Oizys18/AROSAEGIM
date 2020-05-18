import React, { Component } from 'react';
import {Storage} from '../../../storage/Storage';
import styled from 'styled-components';
import { IconButton, Zoom } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

class Hamburger extends Component {
  render(){
    return(
      <Zoom in={!this.context.sideMenu} timeout={400}>
        <StHamburger>
          <IconButton onClick={this.context.toggleSideMenu}>
            <Menu/>
          </IconButton>
        </StHamburger>
      </Zoom>
    )
  }
} Hamburger.contextType = Storage;
export default Hamburger;

const StHamburger = styled.div`
  position: fixed;
  top:0;
  z-index: 1;
`