import React, { Component } from 'react';
import styled from 'styled-components';
import {Slide, Grow, Divider, IconButton, Button, MenuItem, InputBase, Popper} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import {FlexColumn} from '../../../styles/DispFlex'

class SearchBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      select: '장소',
      open: false,
    }
  }

  openSelect = (e) => {
    this.setState({ 
      open: !this.state.open 
    })
  }
  handleSelect = (e) => {
    this.setState({
      select: e.currentTarget.id,
      open: !this.state.open
    })
  }

  render(){
    return(
      <Slide in={true} direction='down'>
        <StCont> 
          <StSearch>
          <StSelectCont>
          <StSelectBtn onClick={this.openSelect}>{this.state.select}</StSelectBtn>
          <Grow in={this.state.open} mountOnEnter unmountOnExit>
            <StSelectList>
              <StSelectBtn id='장소' onClick={this.handleSelect}>장소</StSelectBtn>
              <StSelectBtn id='새김' onClick={this.handleSelect}>새김</StSelectBtn>
            </StSelectList>
          </Grow>
          </StSelectCont>

          <Divider orientation="vertical" />
          <InputBase /> 
          <Divider orientation="vertical" />
          <IconButton type="submit">
            <Search/>
          </IconButton>
          </StSearch>
        </StCont>
      </Slide>
    )
  }
} export default SearchBar;


const StCont = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px 8px 0 8px;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
`;

const StSearch = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
  background: white;
`;

const StSelectCont = styled.div`
  position: relative;
`

const StSelectBtn = styled(Button)`
`;

const StSelectList = styled(FlexColumn)`
  position: absolute;
  background: white;
  top: 99%;


  border: 3px solid gray;
  border-radius: 3px;
`;