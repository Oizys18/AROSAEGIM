import React, { Component } from 'react';
import styled from 'styled-components';
import { Collapse, } from '@material-ui/core';
import * as SA from  '../../../apis/SaegimAPI';

class FilterMenuBtn extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapseIn: false,
      startTime: new Date(),
      endTime: new Date(),
    }
  }
  clickMenu = () => {
    this.setState({
      collapseIn: !this.state.collapseIn
    })
  }

  async componentDidMount(){
    this.setState({
      startTime: this.state.startTime.setDate(this.state.startTime.getDate() - 1)
    })
    console.log(this.state.startTime)
    sessionStorage.getItem('ARSG userId')
    // const resData = await SA.getSaegimByFilter()
  }

  hendleTime = (e) => {
    
  }

  render(){
    const filterId = this.props.id
    return(
    <>
      <Collapse in={this.state.collapseIn} collapsedHeight={40}>
        <StCont>
        <StTitle onClick={this.clickMenu}>
          <div>{this.props.txt}</div>
          {this.props.icon}
        </StTitle>
        <StSettingCont>
          {filterId === 'simple' &&
            <>
            <button type='number' onChange={this.handleTime} value={7}>일주일전</button>
            <button type='number'>1일전</button>
            <button type='number'>24</button>
            <button type='number'>12</button>
            <button type='number'>6</button>
            <button type='number'>3</button>
            </>
          }
          {filterId === 'detail' &&
            <>
            {this.props.txt}
            {this.props.txt}
            {this.props.txt}
            {this.props.txt}
            {this.props.txt}
            </>
          }
          
        </StSettingCont>
        </StCont>
      </Collapse>
    </>
    )
  }
} export default FilterMenuBtn;

const StCont = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 8px; */

  *{
    color: gray;
  }
`;

const StTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px;

  *{
    color: gray;
  }
`;

const StSettingCont = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;