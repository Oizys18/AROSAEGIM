import React, { Component } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

class Hamburger extends Component {
  render(){
    return(
      <StHamburger>
        <IconButton>
          <Menu/>
        </IconButton>
      </StHamburger>
    )
  }
} export default Hamburger;

const StHamburger = styled.div``