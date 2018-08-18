import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import { FIREBASE_CONFIG } from './config';

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

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

    this.logInUser = this.logInUser.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  logInUser(event) {
    event.preventDefault();
    const email = this.state.loginEmail;
    const password = this.state.loginPassword;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        // close modal after login
        this.setState({
          showLogin: false,
        });
      }), (error) => {
      console.warn(error);
    };
  }

  googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: 'select_account',
    });

    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        console.warn('user has logged in', user);
      }), (error) => {
        window.alert(error);
    };
  }

  signOutUser() {
    firebase.auth().signOut().then((res) => {
    }, (error) => {
      console.warn(error);
    });

    this.setState({
      user: {},
      loggedIn: false,
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((res) => {
      if (res) {
        this.setState({
          loggedIn: true,
          user: res,
        }, () => {
        });
        // code below grabs the user's event objects (userEvents) and array of ids where they are hosts for (userHostEvents) and sets it in state. It will be passed down to dashboard.
        // const dbref = firebase.database().ref(`/Users/${res.uid}/events`);
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
