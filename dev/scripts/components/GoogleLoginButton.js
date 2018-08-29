import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import * as firebaseUtils from '../utils/firebase';

class GoogleLoginButton extends React.Component {
  constructor() {
    super();

    // TODO-REDUX: Draw from redux `store`
    this.state = {
      loggedIn: false,
    };

    this.firebase = window.firebase;
    this.googleSignIn = firebaseUtils.googleSignIn.bind(this);
    this.signOutUser = firebaseUtils.signOutUser.bind(this);

    // TODO-REDUX: Draw from redux `store`
    // Determine login state on mount by listening to Firebase observer
    this.firebase.auth().onAuthStateChanged((res) => {
      if (res) {
        this.setState({
          loggedIn: !!(res),
        })
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loggedIn ? (
          <React.Fragment>
            {/* <h2>Welcome, {this.state.user.displayName}</h2> */}
            <div className="smlButton logOutButton titleButton" onClick={this.signOutUser}>
              <img src="../../../images/logoutIcon.svg" alt="" />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="login">
              <button className="lrgButton logInButton" onClick={this.googleSignIn}>
                <FaGoogle className="googleIcon" />
              </button>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default GoogleLoginButton;
