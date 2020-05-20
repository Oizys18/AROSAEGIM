import React, { Component } from 'react';
import styled from 'styled-components';
import { IconButton, Zoom } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

class Hamburger extends Component {
  render(){
    return(
      <Zoom in={!this.props.on} timeout={400}>
        <StHamburger onClick={this.props.toggle}>
          <Menu/>
        </StHamburger>
      </Zoom>
    )
  }
} export default Hamburger;
// Hamburger.contextType = Storage;

const StHamburger = styled(IconButton)`
  position: absolute;
  left: 0;
  z-index: 1;
`