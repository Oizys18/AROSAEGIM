import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { Storage } from "./storage/Storage";
import TopBar from "./components/common/menus/TopBar";
import SideMenu from "./components/common/menus/SideMenu";
import BotNav from "./components/common/navbar/BotNav";
<<<<<<< HEAD
import Main from "./components/main/Main";
import MapList from "./components/common/map/MapList";
=======
import Map from "./components/common/map/Map";
>>>>>>> 42bc8c1a8027e5c8351601ff7e33b9a596b0397e
import Write from "./components/write/Write";
// import Auth from "./components/account/Auth";
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";
import SaegimListPage from "./components/saegim/SaegimListPage";
import SaegimDetail from "./components/saegim/SaegimDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appHeight: window.innerHeight,

      isLogin: false,

      userInitPage: "/list",
      curPage: this.props.location.pathname,

      sideMenu: false,
      toggleSideMenu: this.toggleSideMenu,
    };
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  componentDidMount() {
    this.props.history.replace(this.state.userInitPage);
  }

  toggleSideMenu = () => {
    this.setState({ sideMenu: !this.state.sideMenu });
  };

  changePage = (e) => {
    if (e.currentTarget.id === "write"
    ) {
      this.props.history.push(e.currentTarget.id);
    } else {
      this.props.history.replace(e.currentTarget.id);
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
        {/* <Route path="/auth" component={Auth} /> */}
        <Route path="/map" component={MapList} />
        <Route exact path="/list" component={SaegimListPage} />
        <Route path="/write" component={Write} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/list/:id" component={SaegimDetail} />
      </Storage.Provider>
    );
  }
}
export default withRouter(App);
