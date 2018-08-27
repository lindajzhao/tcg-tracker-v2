import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import { FIREBASE_CONFIG } from './config';
import * as firebase from './utils/firebase';


// Initialize Firebase
const firebaseService = window.firebase;
firebaseService.initializeApp(FIREBASE_CONFIG);
class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: {},
      loginEmail: '',
      loginPassword: '',
      usersDeck: [],
    };

    this.emailSignIn = firebase.emailSignIn.bind(this);
    this.signOutUser = firebase.signOutUser.bind(this);
    this.googleSignIn = firebase.googleSignIn.bind(this);

    firebaseService.auth().onAuthStateChanged((user) => {
      this.setState({
        user,
        loggedIn: !!(user)
      })
    })
  }

  render() {
    return (
      <div className="Index">
        {/* <NavBar logInUser={this.logInUser} googleSignIn={this.googleSignIn} signOutUser={this.signOutUser} /> */}
        <Router />
      </div>
    );
  }
}

export default Index;

render(<Index />, document.querySelector('#app'));
