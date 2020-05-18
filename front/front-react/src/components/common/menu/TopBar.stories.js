import React from 'react';
import styled from 'styled-components';
import {Slide} from '@material-ui/core';

export const TopBar = () => {
  return(
    <Slide in={true} direction="down">
      <StTopCont>
        <StLogo>로고</StLogo>
      </StTopCont>
    </Slide>
  )
}

export default {
  component: TopBar,
  title: 'Menu',
};

const StTopCont = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  background: gray;
  width: 100%;
  height: 48px;
`

const StLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 100%;
  
  background: #f2f2f2;
  border: 3px solid gray;
  box-sizing: border-box;
`
