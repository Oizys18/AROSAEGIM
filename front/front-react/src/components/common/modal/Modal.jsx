import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Zoom } from '@material-ui/core';

class Modal extends Component {

  confirmMsg = () => {
    return this.props.msg.split('\n').map(function(item, key){
      return(<span key={key}>{item}<br/></span>)
    })
  }

  render(){
    return(
      <>
        { this.props.on && <StOpacityBack/> }

        <Zoom in={this.props.on} mountOnEnter unmountOnExit>
        <StModalCont>
          <StConfirmCont>
            <div className="top-deco"/>
            <StMsgCont>{this.confirmMsg(this.props.msg)}</StMsgCont>
            <StBtnCont>
            {
              this.props.mode === 'confirm' ? 
              <>
                <Button id="yes" variant="outlined" onClick={this.props.click}>예</Button>
                <Button id="no" variant="outlined" onClick={this.props.click}>아니요</Button>
              </>
              :
              <Button id="no" variant="outlined" onClick={this.props.click}>확인</Button>
            }
            </StBtnCont>
          </StConfirmCont>
        </StModalCont>
        </Zoom>
      </>
    )
  }
} export default Modal;

const StOpacityBack = styled.div`
  position: fixed;
  top: 0;
  z-index: 200;

  width: 100%;
  height: 100%;

  background: black;
  opacity: 0.5;
`;

const StModalCont = styled.div`
  position: fixed;  
  z-index: 201;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 480px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`

const StConfirmCont = styled.div`
  z-index: 300;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  min-height: 30%;
  /* height: 30%; */
  background-color: white;
  border-radius: 15px;
  opacity: 1;

  .top-deco{
    width: 100%;
    height: 36px;
    /* height: 20%; */
    background: linear-gradient(to top right, #FBF2EE 0%, #E5A99D 100%);
    /* background: gray; */
    border: 2px solid white;
    border-radius: 15px 15px 0 0;
    box-sizing: border-box;
  }
`

const StMsgCont = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 1rem 16px 1rem;
  text-align: center;
`

const StBtnCont = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: space-around;
  margin: 0 1rem 1rem 1rem;
  
  .MuiButton-label{
    /* color: #8989f5;    */
  }
`