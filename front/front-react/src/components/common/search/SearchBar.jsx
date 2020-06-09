import React, { Component } from 'react';
import styled from 'styled-components';
import {Slide, Divider, IconButton, Button, InputBase, } from '@material-ui/core';
import { Search } from '@material-ui/icons';

class SearchBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      msg: true, 
      
      select: '장소',
      selectOpen: false,

      value: '',
      intervalId: null,
    }
  }

  componentDidMount(){
    document.addEventListener('keypress', this.pressEnter)
    const _intervalId = setInterval(() => {this.setState({ msg: !this.state.msg })}, 3000)
    this.setState({ intervalId: _intervalId })
  }
  componentDidUpdate(prevProps, ){
    if(prevProps.searchCenter !== this.props.searchCenter && !this.props.searchCenter){
      this.setState({ value: '' })
    }
  }
  componentWillUnmount(){
    document.removeEventListener('keypress', this.pressEnter)
    clearInterval(this.state.intervalId)
  }

  // tgleMsg = () => setInterval(() => {this.setState({ msg: !this.state.msg })}, 3000)
  Msg = () => { return this.state.msg ? this.props.addr : this.props.w3w }

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

  handleSearch = () => {
    this.closeSelect()
    this.props.handleSearch(this.state.select, this.state.value)
    // this.setState({ value: '' })
  }
  pressEnter = (e) => {
    if(e.keyCode === 13){
      this.handleSearch()
    }
  }

  render(){
    return(
      <Slide in={this.props.on} direction='down' mountOnEnter unmountOnExit>
        <StCont> 
          <StSearch>

            <StSelectCont>
              <StSelectBtn>{this.state.select}</StSelectBtn>
              {/* <StSelectBtn onClick={this.openSelect}>{this.state.select}</StSelectBtn>
              <Grow in={this.state.selectOpen} mountOnEnter unmountOnExit>
                <StSelectList>
                  <StSelectBtn id='장소' onClick={this.handleSelect}>장소</StSelectBtn>
                  <StSelectBtn id='새김' onClick={this.handleSelect}>새김</StSelectBtn>
                </StSelectList>
              </Grow> */}
            </StSelectCont>

            <Divider orientation="vertical" />

            <StInputBase 
              type='search'
              placeholder={this.state.select === '장소' ? `${this.Msg()}` : '지도 내에서 새김 검색'}
              onFocus={this.closeSelect}
              onChange={this.handleInput}
              value={this.state.value}
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

  padding: 6px 6px 0 6px;
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
  background: #FBF2EE;

  border: 2px solid gray;
  border-radius: 5px;
  box-sizing: border-box;

  position: relative;
`;

const StSelectCont = styled.div`
  /* position: relative; */
`

const StSelectBtn = styled(Button)`
`;

const StInputBase = styled(InputBase)`
  .MuiInputBase-input{
    padding: 3px;
  }
`;