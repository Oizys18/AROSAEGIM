import React, { Component } from "react";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Fab from "@material-ui/core/Fab";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { delSaegim } from "../../apis/SaegimAPI"
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

  delSaegim = async (e) => {
    const _res = await delSaegim(this.props.id)
    console.log(_res)
    this.props.history.goBack()
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
          <MenuItem onClick={this.handleClose}>
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

const StFab = styled(Fab)`
  background-color: white;
`;