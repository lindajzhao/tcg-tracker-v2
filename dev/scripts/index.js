import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import { FIREBASE_CONFIG } from './config';
// import * as firebaseUtils from './utils/firebase';


// Initialize Firebase
class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: {},
    };

    this.firebase = window.firebase;
    this.firebase.initializeApp(FIREBASE_CONFIG);

    // this.emailSignIn = firebaseUtils.emailSignIn.bind(this);
    // this.signOutUser = firebaseUtils.signOutUser.bind(this);
    // this.googleSignIn = firebaseUtils.googleSignIn.bind(this);

    this.firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loggedIn: !!(user),
        user,
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
