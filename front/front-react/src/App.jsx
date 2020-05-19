import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Storage } from './storage/Storage'
import Main from "./components/main/Main";
import TopBar from './components/common/menu/TopBar';
import SideMenu from './components/common/menu/SideMenu';
import Auth from "./components/auth/Auth";
import SaegimListPage from "./components/saegim/SaegimListPage";
import SaegimDetail from "./components/saegim/SaegimDetail";

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
          <Route path="/" component={TopBar}/>
          <Route path="/" component={Main} />
          <Route path="/" component={SideMenu}/>
          <Route path="/auth" component={Auth} />
          <Route exact path="/saegim" component={SaegimListPage} />
          <Route exact path="/saegim/:id" component={SaegimDetail} />
        </Router>
      </Storage.Provider>
    );
  }
}
export default App;
