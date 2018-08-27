const firebaseService = window.firebase;

// Not being used
export const emailSignIn = (event) => {
  event.preventDefault();
  const email = this.state.loginEmail;
  const password = this.state.loginPassword;
  firebaseService.auth().signInWithEmailAndPassword(email, password)
}

export const googleSignIn = () => {
  const provider = new firebaseService.auth.GoogleAuthProvider();
  debugger
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  firebaseService.auth().signInWithPopup(provider)
    .then((user) => {
      console.warn('user has logged in', user);
    }), (error) => {
      window.alert(error);
  };
}

export const signOutUser = () => {
  firebaseService.auth().signOut().then((res) => {
  }, (error) => {
    console.warn(error);
  });

  // BUG: trying to setState on NavBars on all pages (including those not mounted)
  // TODO: Have only 1 instance of NavBar at the top level ?
  this.setState({
    user: {},
    loggedIn: false,
  });
}
