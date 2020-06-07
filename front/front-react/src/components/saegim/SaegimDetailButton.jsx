import React, { Component } from "react";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Fab from "@material-ui/core/Fab";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withRouter } from "react-router-dom";
import { Storage } from "../../storage/Storage";

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
    this.context.setDelComment(this.props.id)
  }

  render() {
    return(
      <div>
        <div aria-controls="fab-menu" aria-haspopup="true" onClick={this.handleClick}>
          <StFab size="small">
          <MoreVertIcon />
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