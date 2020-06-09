import React, { Component } from "react";
import { Storage } from "../../storage/Storage";
import styled from "styled-components";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { addLike, delLike, getLike } from "../../apis/LikeAPI"

class Like extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLike: false,
      userInfo: {},
      likes: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    if (this.state.isLike === false) {
      await this.like()
    } else {
      await this.dislike()
    }
    this.props.setUpdateLike(true)
  }

  async like() {
    await addLike(this.props.id, this.state.userInfo.id)
    this.setState({
      isLike: true
    })
  }

  async dislike() {
    await delLike(this.props.id, this.state.userInfo.id)
    this.setState({
      isLike: false
    })
  }

  async getSaegimLikes() {
    const _likes = await getLike(this.props.id)
    const userList = _likes.map((like) => {
      return like.userId
    })
    await this.setState({
      likes: userList
    })
  }

  async userInLikes() {
    if (this.state.likes.includes(this.state.userInfo.id)) {
      this.setState({
        isLike: true
      })
    } else {
      this.setState({
        isLike: false
      })
    }
  }

  async initState() {
    await this.getSaegimLikes()
    await this.userInLikes()
  }

  async componentDidMount() {
    await this.setState({
      userInfo: this.context.userInfo
    })
    await this.initState()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.isLike !== prevState.isLike) {
      this.initState()
    }
  }

  render() {
    return(
      <StLike>
        <div>덧새김</div>
        <StIcon>
        {this.state.isLike === true
          ? <Favorite onClick={this.handleClick} />
          : <FavoriteBorder onClick={this.handleClick} />
        }
        </StIcon>
        <div style={{ fontWeight: 'bold'}}>{this.state.likes.length}</div>
      </StLike>
    )
  }
}

export default Like;
Like.contextType = Storage;

const StLike = styled.div`
  display: flex;
  width: 120%;
  justify-content: space-between;
`;

const StIcon = styled.div`
  color: #ff6262;
`;