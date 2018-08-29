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
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  firebaseService.auth().signInWithPopup(provider)
    // TODO-REDUX: Update redux `store`

    // .then((user) => {
    //   console.warn('user has logged in', user);
    // }), (error) => {
    //   window.alert(error);
    // };
}

export const signOutUser = () => {
  // TODO-REDUX: Update redux `store`
  firebaseService.auth().signOut().then((res) => {
  }, (error) => {
    console.warn(error);
  });
}
