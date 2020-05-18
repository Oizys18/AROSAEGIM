import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Storage } from './storage/Storage'
import Main from "./components/main/Main";
import Hamburger from './components/common/buttons/Hamburger';
import SideMenu from './components/common/menu/SideMenu';
import Auth from "./components/auth/Auth";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sideMenu: false,
      toggleSideMenu: this.toggleSideMenu,
    }
  }

  toggleSideMenu = () => {
    this.setState({
      sideMenu: !this.state.sideMenu,
    })
  }


  render() {
    return (
      <Storage.Provider value={this.state}>
        <Router>
          {/* <Route path="/" component={Main} /> */}
          <Route path="/" component={Hamburger}/>
          <Route path="/" component={SideMenu}/>
          <Route path="/auth" component={Auth} />
        </Router>
      </Storage.Provider>
    );
  }
}
export default App;
