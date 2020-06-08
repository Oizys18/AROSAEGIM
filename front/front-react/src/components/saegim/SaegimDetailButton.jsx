import React, { Component } from "react";
import { Storage } from "../../storage/Storage";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

class SaegimDetailButton extends Component {

  delSaegim = () => {
    this.context.popModal('새김을 삭제하시겠습니까?', 'delSaegim', 'confirm')
    this.context.setDelSaegim(this.props.id)
  }

  render() {
    return(
      <StDetail>
        <div style={{ color: 'gray' }}>
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