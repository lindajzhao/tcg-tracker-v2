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
    this.navBar = React.createRef();
    this.slideMenu = this.slideMenu.bind(this);
  }

  slideMenu(){
    this.navBar.current.classList.toggle("slideOut");
  }

  render() {
    return (
      <nav className="NavBar" onClick={this.slideMenu} ref={this.navBar}>
        <ul className="navMenuItems">
          <li>
            <div className="navLogo"><img src="../../../images/Card-blueWhite.png" alt="tcg logo" /></div>
          </li>
          <li>
            <Link to="/">
              <div className="navIcon">
                <img src="../../../images/homeIcon.svg" alt="home icon" />
                <h5 className="navMenuTitle">Home</h5>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/franchises/pokemon">
              <div className="navIcon">
                <img src="../../../images/pokeBall.svg" alt="pokemon icon" />
                <h5 className="navMenuTitle">Franchises</h5>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/myDecks">
              <div className="navIcon">
                <img src="../../../images/cardDeck.svg" alt="myDeck icon" />
                <h5 className="navMenuTitle">My Deck</h5>
              </div>
            </Link>
          </li>
        </ul>

        <div className="loginBtn">
          <GoogleLoginButton/> 
          <h5 className="navMenuTitle">Sign In</h5>
        </div>

      </nav>
    );
  }
}

export default NavBar;
