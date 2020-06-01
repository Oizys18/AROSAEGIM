import React, { Component } from 'react';
import styled from 'styled-components';
import {Slide, Grow, Divider, IconButton, Button, InputBase, } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { FlexColumn } from '../../../styles/DispFlex'

class SearchBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      select: '장소',
      selectOpen: false,

      value: '',
    }
  }

  openSelect = () => {
    this.setState({ selectOpen: true })
  }
  closeSelect = () => {
    this.setState({ selectOpen: false })
  }

  handleSelect = (e) => {
    this.closeSelect()
    this.setState({ select: e.currentTarget.id })
  }

  handleInput = (e) => {
    this.setState({ value: e.currentTarget.value })
  }

  handleSearch = (e) => {
    this.closeSelect()
  }

  render(){
    return(
      <Slide in={this.props.on} direction='down'>
        <StCont> 
          <StSearch>

            <StSelectCont>
              <StSelectBtn onClick={this.openSelect}>{this.state.select}</StSelectBtn>
              <Grow in={this.state.selectOpen} mountOnEnter unmountOnExit>
                <StSelectList>
                  <StSelectBtn id='장소' onClick={this.handleSelect}>장소</StSelectBtn>
                  <StSelectBtn id='새김' onClick={this.handleSelect}>새김</StSelectBtn>
                </StSelectList>
              </Grow>
            </StSelectCont>

            <Divider orientation="vertical" />
            
            <InputBase 
              placeholder={this.state.select === '장소' ? '장소 검색' : '지도 내에서 새김 검색'}
              onClick={this.closeSelect}
              onChange={this.handleInput}
            />
            
            <Divider orientation="vertical"/>

            <IconButton onClick={this.handleSearch}><Search/></IconButton>
          
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
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 100%;

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