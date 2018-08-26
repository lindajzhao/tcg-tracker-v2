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
  }

  componentDidMount() {
    firebaseService.auth().onAuthStateChanged((res) => {
      if (res) {
        this.setState({
          loggedIn: true,
          user: res,
        }, () => {
        });
        // code below grabs the user's event objects (userEvents) and array of ids where they are hosts for (userHostEvents) and sets it in state. It will be passed down to dashboard.
        // const dbref = firebaseService.database().ref(`/Users/${res.uid}/events`);
        // dbref.on('value', (snapshot) => {

        //     const eventsData = snapshot.val();
        //     const copyOfDB = [];
        //     const hostedEvents = [];
        //     for (let key in eventsData) {
        //         eventsData[key].key = key;
        //         copyOfDB.push(eventsData[key]);
        //     }
        //     for (let key in eventsData) {
        //         eventsData[key].key = key;
        //         if (eventsData[key].isHost === true) {
        //             hostedEvents.push(eventsData[key].key);
        //         }
        //     }
        //     this.setState({
        //         userEvents: copyOfDB,
        //         userHostEvents: hostedEvents
        //     });
        // });
      } else {
        this.setState({
          loggedIn: false,
          user: res,
        });
      }
    });
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
