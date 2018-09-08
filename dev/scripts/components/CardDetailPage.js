import React from 'react';
import axios from 'axios';
import { API_URLS } from '../config';
import NavBar from './NavBar';
import CardImage from './CardImage';
import AttackDetails from './AttackDetails';

class CardDetailPage extends React.Component {
  constructor() {
    super();
    this.state = {
      cardId: '',
      cardInfo: {},
      cardCollection: [],
      user: undefined,
      inCollection: false,
      card: [],
      loggedIn: false,
    };

    this.firebase = window.firebase;
    this.getCardInfo = this.getCardInfo.bind(this);
    this.addToDeck = this.addToDeck.bind(this);
    this.collectionCheck = this.collectionCheck.bind(this);
    this.removeFromDeck = this.removeFromDeck.bind(this);
    this.loadCollection = this.loadCollection.bind(this);
  }

  componentDidMount() {
    // have user's firebase information logged in state
    this.firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user }, () => this.loadCollection());
    });
  }

  loadCollection() {
    if (this.state.user === null) {
      this.setState({
        loggedIn: false,
      });
      this.render();
    } else if (this.state.user !== undefined) {
      this.setState({
        loggedIn: true,
      });

      const dbRefUser = this.firebase.database().ref(`users/${this.firebase.auth().currentUser.uid}`);
      dbRefUser.on('value', (snapshot) => {
        const cardArray = [];
        const selectedCard = snapshot.val();
        // snapshot value captures the value of what is added when the function is clicked and pushed to fbDB
        for (const itemKey in selectedCard) {
          selectedCard[itemKey].key = itemKey;
          cardArray.push(selectedCard[itemKey]);
        }
        this.setState({
          cardCollection: cardArray,
          cardId: this.props.match.params.cardId,
        },
        () => {
          // wait until state is set before making axios call
          this.getCardInfo();
        });
      });
    }
  }

  getCardInfo() {
    axios
      .get(`${API_URLS.POKEMON_API_URL}/cards/${this.state.cardId}`)
      .then((res) => {
        this.setState({ cardInfo: res.data.card },
          () => { this.collectionCheck(); });
      });
  }

  collectionCheck() {
    const deck = this.state.cardCollection;
    const thisCard = this.state.cardInfo;
    const duplicateCard = deck.find(item => thisCard.id === item.cardDetails.id);
    this.setState({
      inCollection: !!(duplicateCard),
    });
  }

  removeFromDeck() {
    const deck = this.state.cardCollection;
    const thisCard = this.state.cardInfo;
    const duplicateCard = deck.find(item => thisCard.id === item.cardDetails.id);
    const removeId = duplicateCard.key;
    this.firebase.database().ref(`users/${this.firebase.auth().currentUser.uid}/${removeId}`).remove();

    this.setState({ inCollection: false });
  }


  addToDeck() {
    const dbRefUser = this.firebase.database().ref(`users/${this.firebase.auth().currentUser.uid}`);

    // We want to check if the card already exists in firebase so it doesn't add again
    // Check the value of the current database

    const cardDetails = {
      id: this.state.cardInfo.id,
      info: this.state.cardInfo,
    };

    dbRefUser.on('value', (snapshot) => {
      const cardArray = [];
      const selectedCard = snapshot.val();
      // snapshot value captures the value of what is added when the function is clicked and pushed to fbDB
      for (const itemKey in selectedCard) {
        selectedCard[itemKey].key = itemKey;
        cardArray.push(selectedCard[itemKey]);
      }
      // creatinga a new array from the cardArray, here we are testing the existing array with filter to see if this card already exists in our database
      // grabbing the cardName from cardDetails and checking to see if there is a match
      const testArray = cardArray.find(card => card.cardDetails.id === cardDetails.id);

      if (testArray === undefined) {
        dbRefUser
          .push({
            //  cardInfo: this.state.cardInfo
            // cardId: this.state.cardId
            cardDetails,
          });
        this.setState({ inCollection: true });
      } else {
        console.log('matched');
      }
    });
  }

  render() {
    // TODO: BUG: Cannot access this page from "My Deck" route

    const {
      ability, attacks, hp, name, types, weaknesses, imageUrl, rarity, supertype, text, nationalPokedexNumber,
    } = this.props.location.state.card;
    return (
      <React.Fragment>
        <NavBar logInUser={this.logInUser} googleSignIn={this.googleSignIn} signOutUser={this.signOutUser} />
        <div className="wrapper">
          <main className="cardDetails">
            <aside className="detailsImg">
              <div className="mobileHeader">
                <h2>
                  {name}
                  <span>{supertype}</span>
                </h2>
              </div>
              <CardImage
                imageUrl={imageUrl}
                name={name}
              ></CardImage>
            </aside>

            <section className="detailsContent">
              <div className="detailsContainer">
                <h2 className="header">
                  {name}
                </h2>
                {
                  supertype === 'Pokémon' ? (
                    <h2>
                    HP {hp}
                      <div className="typeHolder">
                        <img src={`../../../images/${types}.png`} alt={`an emblem of the type ${types}`} />
                      </div>
                    </h2>
                  ) : null
                }
              </div>

              {
                supertype === 'Pokémon' ? attacks.map(
                  (attack, i) => (
                    <AttackDetails 
                      attack={ attack }
                      i={ i }
                    />
                  ),
                ) : null
              }

              {
                supertype === 'Pokémon'
                  ? (
                    <div className="details">
                      <h3>Pokedex Number</h3>
                      <span>{nationalPokedexNumber}</span>
                    </div>
                  )
                  : null
              }

              {
                supertype === 'Trainer'
                  ? (
                    <div className="detailsContainer">
                      <p>{text}</p>
                    </div>
                  )
                  : null
              }

              <div className="details">
                <h3>rarity</h3>
                <span>{rarity}</span>
              </div>
              {
              this.state.loggedIn
                ? (
                  <div className="detailsContainer">
                    {
                      this.state.inCollection
                        ? (
                          <button className="addButton" onClick={this.removeFromDeck}>
                            Remove
                          </button>
                        )

                        : (
                          <button className="addButton" onClick={this.addToDeck}>
                            Add to Deck
                          </button>
                        )
                    }
                  </div>
                )
                : null
              }
            </section>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default CardDetailPage;
