import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import { Slide } from '@material-ui/core'

import { Storage } from "./storage/Storage";
import { getPosition } from './apis/GeolocationAPI';
import Loading from "./components/common/background/Loading";
import Background from "./components/common/background/Background";
import TopBar from "./components/common/navbar/TopBar";
// import SearchBar from "./components/common/search/SearchBar";
import SideMenu from "./components/common/menus/SideMenu";
import BotNav from "./components/common/navbar/BotNav";
import Modal from "./components/common/modal/Modal"
import MapPage from "./components/common/map/MapPage";
import Write from "./components/write/Write";
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";
import SaegimListPage from "./components/saegim/SaegimListPage";
import SaegimDetail from "./components/saegim/SaegimDetail";
import MyPage from "./components/mypage/MyPage";
import Contact from "./components/contact/Contact";
import Help from "./components/contact/Help";
import { getUserByEmail } from "./apis/AccountAPI";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appHeight: window.innerHeight,

      sideMenu: false,
      toggleSideMenu: this.toggleSideMenu,

      curPage: '/list',
      curSaegimIdx: 0,
      curMap: [],

      isLogin: false,
      userInfo: {},
      handleLogout: this.handleLogout,

      modal: false,
      modalMsg: '',
      modalSitu: '',
      modalMode: '',
      popModal: this.popModal,
      handleModal: this.handleModal,

      curData: [],
      setCurData: this.setCurData,
      idxUpdateFlag: false,
      idxUpdate: this.idxUpdate
    };
  }

  setStateAsync(state) { return new Promise((resolve) => { this.setState(state, resolve) }) }

  async componentDidMount(){
    getPosition()

    const _autoLogin = localStorage.getItem('ARSG autoLogin')
    if(_autoLogin === 'true'){
      const _email = localStorage.getItem('ARSG email')
      this.setState({ 
        isLogin: true,
        userInfo: (await getUserByEmail(_email)).data
      })
      this.goFirstPage('/list')
    }
    else {
      const _email = sessionStorage.getItem('ARSG email')
      if(_email === null){
        this.goFirstPage('/list')
      }
      else{
        this.setState({ 
          isLogin: true,
          userInfo: (await getUserByEmail(_email)).data
        })
        this.goFirstPage('/list')
      }
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(this.state.appHeight !== window.innerHeight){
      this.setState({ appHeight: window.innerHeight })
    }
    if(prevState.curPage !== this.props.location.pathname){
      this.setState({
        curPage: this.props.location.pathname
      })
    }
  }

  popModal = async (msg, situ, mode) => {
    this.setState({
      modal: true,
      modalMsg: msg,
      modalSitu: situ,
      modalMode: mode,
    })
  }
  handleModal = (e) => {
    const _ans = e.currentTarget.id
    if(this.state.modalMode === 'confirm' && _ans === 'yes'){
      if(this.state.modalSitu === 'need login'){
        this.props.history.push('/login')
      }
      else if(this.state.modalSitu === 'logout'){
        this.setState({ sideMenu: false })
        localStorage.setItem('ARSG autoLogin', false)
        localStorage.removeItem('ARSG email')
        sessionStorage.clear()
        window.location.href = '/'
      }
    }
    this.setState({ modal: false })
  }

  handleLogout = () => {
    this.popModal('로그아웃 하시겠습니까?', 'logout', 'confirm')
  }

  toggleSideMenu = () => {
    this.setState({ sideMenu: !this.state.sideMenu });
  };

  goFirstPage = (page) => {
    setTimeout(() => {
      this.props.history.replace(page)
    }, 2500);
  }

  changePage = async (e) => {
    const _id = e.currentTarget.id
    if (_id === "write") {
      if(this.state.isLogin) {
        this.props.history.replace(`/${_id}`);
      }
      else{
        this.popModal('로그인 후\n이용할 수 있습니다.\n\n로그인 하시겠습니까?', 'need login', 'confirm')
      }
    } 
    else {
      this.props.history.replace(`/${_id}`);
    }
  };

  idxUpdate = (flag) => {
    this.setState({
      idxUpdateFlag: flag
    })
  }

  setCurData = (data) => {
    this.setState({
      curData: data
    })
  }

  render() {
    return (
      <Storage.Provider value={this.state}>
        {// 사이드 메뉴랑, 상단바(햄버거), 하단네비는 그냥 조건부 렌더링으로 작성
        ( this.props.location.pathname === "/map" ||
          this.props.location.pathname === "/write" ||
          this.props.location.pathname === "/mypage" ||
          this.props.location.pathname.includes("/list")
        ) && (
          <>
            <Slide in={this.props.location.pathname !== "/map"} direction="down" unmountOnExit mountOnEnter>
              <TopBar on={this.state.sideMenu} toggle={this.toggleSideMenu}/>
            </Slide>

            <SideMenu
              on={this.state.sideMenu}
              toggle={this.toggleSideMenu}
              isLogin={this.state.isLogin}
            />
            
            <BotNav appH={this.state.appHeight} changePage={this.changePage}/>
          </>
        )}

        <Background/>
        <Modal
          on={this.state.modal} 
          msg={this.state.modalMsg}
          mode={this.state.modalMode}
          click={this.handleModal} 
        />

        <Route exact path="/" component={Loading} />
        <Switch>
          <Route path="/list/:id" component={SaegimDetail} />
          <Route path="/list" component={SaegimListPage} />
        </Switch>
        <Route path="/map" component={MapPage} />
        <Route path="/help" component={Help} />
        <Route path="/contact" component={Contact} />
        <Route path="/write" component={Write} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/mypage" component={MyPage} />
      </Storage.Provider>
    );
  }
}
export default withRouter(App);
