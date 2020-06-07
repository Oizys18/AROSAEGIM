import React, { Component } from 'react';
import styled from 'styled-components';
import { FlexColumn } from '../../../styles/DispFlex';
 
class RoadViewOverlay extends Component {

  render(){
    return(
      <StCont id={this.props.id} onClick={()=>{console.log(this.props.id)}}>
        <StContent>
          {this.props.item.contents}
        </StContent>
      </StCont>
    )
  }
} export default RoadViewOverlay;


const StCont = styled(FlexColumn)`

  background: rgba(0,0,0,0.5);
  width: 50vw;
  height: 55vw;

  border-radius: 3px;
`;

const StContent = styled.div`
  color: white;
`;

