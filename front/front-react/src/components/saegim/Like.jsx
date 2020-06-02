import React, { Component } from "react";
import { Storage } from "../../storage/Storage";
import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
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
    const _res = addLike(this.props.id, this.state.userInfo.id)
    this.setState({
      isLike: true
    })
  }

  async dislike() {
    const _res = delLike(this.props.id, this.state.userInfo.id)
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
    // console.log(this.state.likes)
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
    // console.log(this.state.userInfo)
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
        {this.state.isLike === true
          ? <FavoriteIcon onClick={this.handleClick} />
          : <FavoriteBorderIcon onClick={this.handleClick} />
        }
        <div>{this.state.likes.length}</div>
      </StLike>
    )
  }
}

export default Like;
Like.contextType = Storage;

const StLike = styled.div`
  display: flex;
  width: 120%;
  align-items: center;
  justify-content: space-between;
`;