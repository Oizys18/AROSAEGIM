import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import { Slide } from '@material-ui/core'

import { Storage } from "./storage/Storage";
import TopBar from "./components/common/menus/TopBar";
import SideMenu from "./components/common/menus/SideMenu";
import BotNav from "./components/common/navbar/BotNav";
import MapPage from "./components/common/map/MapPage";
import Write from "./components/write/Write";
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";
import SaegimListPage from "./components/saegim/SaegimListPage";
import SaegimDetail from "./components/saegim/SaegimDetail";
import MyPage from "./components/mypage/MyPage";
import { getUserByEmail } from "./apis/AccountAPI";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appHeight: window.innerHeight,

      sideMenu: false,
      // toggleSideMenu: this.toggleSideMenu,

      curPage: '/list',
      curSaegimIdx: 0,
      curMap: [],

      isLogin: false,
      userInfo: {},
      handleLogout: this.handleLogout,
    };
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount(){
    const _autoLogin = localStorage.getItem('ARSG autoLogin')
    if(_autoLogin === 'true'){
      const _email = localStorage.getItem('ARSG email')
      this.setState({ 
        isLogin: true,
        userInfo: (await getUserByEmail(_email)).data
      })
      this.props.history.replace('/list')
    }
    else {
      const _email = sessionStorage.getItem('ARSG email')
      if(_email === null){
        this.props.history.replace('/list')
      }
      else{
        this.setState({ 
          isLogin: true,
          userInfo: (await getUserByEmail(_email)).data
        })
        this.props.history.replace('/map')
      }
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.curPage !== this.props.location.pathname){
      this.setState({
        curPage: this.props.location.pathname
      })
    }
  }

  handleLogout = () => {
    localStorage.setItem('ARSG autoLogin', false)
    localStorage.removeItem('ARSG email')
    sessionStorage.clear()
    this.setState({ 
      isLogin: false,
      userInfo: {},
    })
  }

  toggleSideMenu = () => {
    this.setState({ sideMenu: !this.state.sideMenu });
  };

  changePage = async (e) => {
    const _id = e.currentTarget.id
    if (_id === "write"
    ) {
      this.props.history.push(`/${_id}`);
    } else {
      this.props.history.replace(`/${_id}`);
    }
  };

  render() {
    return (
      <Storage.Provider value={this.state}>
        {// 사이드메뉴랑, 상단바(햄버거), 하단네비는 그냥 조건부 렌더링으로 작성
        ( this.props.location.pathname === "/map" ||
          this.props.location.pathname === "/write" ||
          this.props.location.pathname === "/mypage" ||
          this.props.location.pathname.includes("/list")
        ) && (
          <>
            <Slide in={this.props.location.pathname !== "/map"} direction="down" unmountOnExit mountOnEnter>
              <TopBar on={this.state.sideMenu} toggle={this.toggleSideMenu}/>
            </Slide>
            {/* <Slide in={this.props.location.pathname === "/map"} direction="down" unmountOnExit mountOnEnter>
              <TopBar on={this.state.sideMenu} toggle={this.toggleSideMenu}/>
            </Slide> */}
            <SideMenu
              on={this.state.sideMenu}
              toggle={this.toggleSideMenu}
              isLogin={this.state.isLogin}
              logout={this.handleLogout}
              // userInfo={this.state.userInfo}
            />
            <BotNav changePage={this.changePage} />
          </>
        )}

        {/* <Route exact path="/" component={SaegimListPage} /> */}
        <Switch>
          <Route path="/list/:id" component={SaegimDetail} />
          <Route path="/list" component={SaegimListPage} />
        </Switch>
        <Route path="/map" component={MapPage} />
        <Route path="/write" component={Write} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/mypage" component={MyPage} />
      </Storage.Provider>
    );
  }
}
export default withRouter(App);
