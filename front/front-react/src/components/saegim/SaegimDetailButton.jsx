import React, { Component } from "react";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Fab from "@material-ui/core/Fab";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";

class SaegimDetailButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vertOpen: null
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

  render() {
    return(
      <div>
      <Button aria-controls="fab-menu" aria-haspopup="true" onClick={this.handleClick}>
        <StFab size="small">
        <MoreVertIcon />
        </StFab>
      </Button>
        <Menu
          id="fab-menu"
          anchorEl={this.state.vertOpen}
          open={Boolean(this.state.vertOpen)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>수정</MenuItem>
          <MenuItem onClick={this.handleClose}>삭제</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default SaegimDetailButton;

const StFab = styled(Fab)`
  background-color: white;
`