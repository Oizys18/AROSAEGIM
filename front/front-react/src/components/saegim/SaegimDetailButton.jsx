import React, { Component } from "react";
import { Storage } from "../../storage/Storage";
import styled from "styled-components";
import { Menu, MenuItem, Fab } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import { FlexRow } from "../../styles/DispFlex";

class SaegimDetailButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vertOpen: null,
    }
  }

  handleClick = (e) => {
    this.setState({
      vertOpen: e.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      vertOpen: null
    })
  }

  delSaegim = () => {
    this.context.popModal('새김을 삭제하시겠습니까?', 'delSaegim', 'confirm')
    this.context.setDelSaegim(this.props.id)
  }

  render() {
    return(
      <StDetail>
        <div onClick={this.handleClose} style={{ color: 'gray' }}>
            수정
        </div>
        <div onClick={this.delSaegim}>
          삭제
        </div>
      </StDetail>
    )
  }
}

export default withRouter(SaegimDetailButton);
SaegimDetailButton.contextType = Storage;

const StDetail = styled.div`
  width: 20vw;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  margin: 0 16px 0 16px;
`