import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null,
    };
  }

  render() {
    return (
      <nav className="NavBar">
        <div className="navMenuItems">
          <div className="navLogo"><img src="../../../images/Card-blueWhite.png" alt="tcg logo" /></div>
          <Link to="/"><div className="navIcon"><img src="../../../images/homeIcon.svg" alt="home icon" /></div></Link>
          <Link to="/franchises/pokemon"><div className="navIcon"><img src="../../../images/pokeBall.svg" alt="pokemon icon" /></div></Link>
          <Link to="/myDecks"><div className="navIcon"><img src="../../../images/cardDeck.svg" alt="myDeck icon" /></div></Link>
          <div className="navIcon"><img src="" alt="" /></div>
        </div>

        <GoogleLoginButton/>

      </nav>
    );
  }
}

export default NavBar;
