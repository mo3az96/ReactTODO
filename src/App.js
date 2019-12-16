import React, { Component } from 'react';
import './App.css'
import Sign from './Components/Auth/sign';
import Loggedin from './Components/logedin/loggedin';
import firebase from './Components/Firebase'
import Nav from './Components/nav';
import { Route, BrowserRouter } from 'react-router-dom';
//import { ThemeProvider, CSSReset } from "@chakra-ui/core";


class App extends Component {
  ///////////////////////////////////////////////////////
  auth = firebase.auth()

  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  checkUser = () => {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user })
      }
    })
  }
  componentDidMount() {
    this.checkUser();
  }
  handelLagout = () => {
    firebase.auth().signOut().then(function () {
      this.checkUser();
    }).catch(function (error) {
      // An error happened.
    });
  }
  render() {
    // let uploader = this.state.user ?
    //   <Route exact path="/" component={Loggedin} /> : <Route exact path="/" component={Sign} />

    return (
      <>
        {/* <Nav user={this.state.user} handelLagout={this.handelLagout} />
        <BrowserRouter>
          {uploader}

        </BrowserRouter> */}
        <Sign />
      </>
    );

  }
}


export default App;

