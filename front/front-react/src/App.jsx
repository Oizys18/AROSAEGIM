import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
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
import MyPage from "./components/account/MyPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appHeight: window.innerHeight,

      isLogin: false,
      handleLogin: this.handleLogin,

      userInitPage: "/list",

      sideMenu: false,
      toggleSideMenu: this.toggleSideMenu,
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
      this.setState({ isLogin: true })
      this.props.history.replace('/map')
    }
    else {
      const _email = sessionStorage.getItem('ARSG email')
      if(_email === null){
        this.props.history.replace('/login')
      }
      else{
        this.setState({ isLogin: true })
        this.props.history.replace('/map')
      }
    }
  }

  toggleSideMenu = () => {
    this.setState({ sideMenu: !this.state.sideMenu });
  };

  changePage = (e) => {
    if (e.currentTarget.id === "write"
    ) {
      this.props.history.push(`/${e.currentTarget.id}`);
    } else {
      this.props.history.replace(`/${e.currentTarget.id}`);
    }
  };

  render() {
    return (
      <Storage.Provider value={this.state}>
        {// 사이드메뉴랑, 상단바(햄버거), 하단네비는 그냥 조건부 렌더링으로 작성
        ( this.props.location.pathname === "/map" ||
          this.props.location.pathname === "/write" ||
          this.props.location.pathname.includes("/list")
        ) && (
          <>
            <TopBar on={this.state.sideMenu} toggle={this.toggleSideMenu} />
            <SideMenu
              on={this.state.sideMenu}
              toggle={this.toggleSideMenu}
              isLogin={this.state.isLogin}
            />
            <BotNav changePage={this.changePage} />
          </>
        )}

        <Route exact path="/" component={SaegimListPage} />
        <Switch>
          <Route path="/list/:id" component={SaegimDetail} />
          <Route path="/list" component={SaegimListPage} />
        </Switch>
        <Route path="/map" component={MapPage} />
        <Route path="/write" component={Write} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/mypage/:id" component={MyPage} />
      </Storage.Provider>
    );
  }
}
export default withRouter(App);
