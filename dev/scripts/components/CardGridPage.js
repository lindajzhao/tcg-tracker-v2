import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URLS } from '../config';
import NavBar from './NavBar';
import SingleCard from './SingleCard';
import Emblem from './Emblem';
import Store from "../store";

// This component will query the pokemon API and get all cards in the Basic set
// Display the image for each card in JSX
// eventually: choose which set will be called, and add infinite scroll
// eventually: add ability to filter and sort as child component?

class CardGridPage extends React.Component {
  constructor() {
    super();
    this.state = {
      allCardsInSet: [],
      page: 1,
      loadedCards: false,
      filteredCards: [],
      set: '',
      showFilteredCards: false,
    };

    this.loadCards = this.loadCards.bind(this);
    this.filterCard = this.filterCard.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.loadMoreCards = this.loadMoreCards.bind(this);
    this.searchBySet = this.searchBySet.bind(this);

    this.typeFilter = React.createRef();
  }

  componentDidMount() {
    this.setState({ page: 1 });
    if (Store.getState().allCardsInSet.length){
      this.setState({
        allCardsInSet : Store.getState().allCardsInSet
      });
    }
    else{
      this.loadCards(this.state.page, this.state.set);
    } 
  }

  loadCards(page, set) {
    // create the parameters and headers for axios call

    // make axio calls to retrive all cards in set
    // want to retrieve first 20 cards??
    axios.get(`${API_URLS.POKEMON_API_URL}/cards`, {
      params: {
        setCode: set,
        page,
        pageSize: '20',
      },
    }).then((res) => {
      const allCards = {
        type: "set_cards",
        payload:{
          allCardsInSet: [...this.state.allCardsInSet, ...res.data.cards],
          loadedCards: true,
        }
      }
      this.setState({
        allCardsInSet: [...this.state.allCardsInSet, ...res.data.cards],
        loadedCards: true,
      });
      Store.dispatch(allCards);
    });
  }

  loadMoreCards() {
    const newpage = this.state.page += 1;
    this.setState({ page: newpage });
    this.loadCards(this.state.page, this.state.set);
  }

  filterCard(e) {
    this.clearFilters(e);
    // filterType is the value of checkbox that's selected
    const filterType = e.target.value;
    // if this is the first checkbox selected, filter from allCardsInSet. if there are multiple checkboxes selected then filter the filteredCards.
    this.setState({
      showFilteredCards: true,
    });

    // create new array containing the specific cards that has the selected type
    const filteredCards = this.state.allCardsInSet.filter((card) => {
      // if the card is missing "types" data then skip it
      if (card.types) {
        card.types.includes(filterType);
        return card.types[0].toLowerCase() === filterType;
      }
    });

    // set filtered cards into state.
    this.setState({ filteredCards });
  }

  clearFilters() {
    this.setState({
      filteredCards: [],
      showFilteredCards: false,
    });
  }

  searchBySet(e) {
    this.setState({
      allCardsInSet: [],
      showFilteredCards: false,
      filteredCards: [],
      page: 1,
      set: e.target.value,
    });
    this.loadCards(this.state.page, e.target.value);
  }

  render() {
    // make the dataset (current state) into a variable
    // if cards are filtered, display the filteredCards. if no filters, display full list
    let cardSet;
    { this.state.showFilteredCards
      ? cardSet = this.state.filteredCards
      : cardSet = this.state.allCardsInSet;
    }

    let cardType = this.state.allCardsInSet.types[0];
    console.log(cardType);

    let emblemType = ["Colorless","Lightning", "Fighting", "Grass", "Fire", "Psychic", "Fairy", "Metal", "Water"]

    return <React.Fragment>
        <NavBar logInUser={this.logInUser} googleSignIn={this.googleSignIn} signOutUser={this.signOutUser} />
        <main className="CardGrid">
          <div className="wrapper">
            <div className="cardGridTitle">
              <img src="../../../images/logoPokemon.png" alt="Pokemon Logo" />
            </div>
            <form className="filter">
              <h2>Filter By</h2>
              <div className="selectSets">
                <label htmlFor="set">
                  <h3>Set</h3>
                </label>
                <select id="selectSet" value={this.state.set} onChange={this.searchBySet}>
                  <option value="sm5">Sun and Moon Ultra Prism</option>
                  <option value="xy1">XY</option>
                  <option value="sm1">Sun and Moon</option>
                  <option value="bw1">Black and White</option>
                </select>
              </div>

              <div className="selectType" ref={this.typeFilter}>
                <h3>Type</h3>
                <div className="selectTypeContainer">
                  {
                    emblemType.map( emblem => (
                      <Emblem key={emblem} type={emblem} filter={e => this.filterCard(e)}/>
                    ))
                  }
                </div>

                <div className="clearContainer">
                  <input type="button" className="clear" onClick={this.clearFilters} value="Clear Filter" />
                </div>
              </div>
            </form>
            <div className="displayCards">
              {cardSet.length ? cardSet.map(card => (
                  <Link
                    key={card.id}
                    to={{
                      pathname: `/franchises/pokemon/${card.id}`,
                      state: { card }
                    }}
                  >
                    <SingleCard data={card} key={card.id} />
                  </Link>
                )) : <h2>
                  Sorry! No cards were loaded from this set. Please try
                  again.
                </h2>}
            </div>

            <button className="load" onClick={this.loadMoreCards}>
              Load More
            </button>
          </div>
        </main>
      </React.Fragment>;
  }
}

export default CardGridPage;
