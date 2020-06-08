import React, { Component } from "react";
import { Storage } from "../../storage/Storage";
import styled from "styled-components";
import { Menu, MenuItem, Fab } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { withRouter } from "react-router-dom";

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
      <div>
        <div aria-controls="fab-menu" aria-haspopup="true" onClick={this.handleClick}>
          <StFab size="small">
            <MoreVert />
          </StFab>
        </div>
        <Menu
          id="fab-menu"
          anchorEl={this.state.vertOpen}
          open={Boolean(this.state.vertOpen)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose} disabled>
            수정
          </MenuItem>
          <MenuItem onClick={this.delSaegim}>
            삭제
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withRouter(SaegimDetailButton);
SaegimDetailButton.contextType = Storage;

const StFab = styled(Fab)`
  background-color: white;
`;