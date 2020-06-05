import React, { Component } from 'react';
import styled from 'styled-components';
import { Collapse, } from '@material-ui/core';

class FilterMenuBtn extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapseIn: false,
    }
  }
  clickMenu = () => {
    this.setState({
      collapseIn: !this.state.collapseIn
    })
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
            {this.props.txt}
            {this.props.txt}
            {this.props.txt}
            {this.props.txt}
            {this.props.txt}
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