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
    // 1. get cards into state somehow
    // if there are cards in this set in redux(filtering going on here)
    // this.setState({ reduxCards })

    // if there aren't cards in redux already
    // make axios call
    // add results to redux

    // recheck(?)
    console.log(Store.getState(), "ComponentDidMount");
    if (Store.getState().allCardsInSet.length){
      console.log("Cards are in Redux", Store.getState());
    }
    else{
      this.loadCards(this.state.page, this.state.set);
    } 
  }

  loadCards(page, set) {
    console.log("Loading Cards")
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
      console.log("Cards Loaded");
      const allCards = {
        type: "set_cards",
        payload:{
          allCardsInSet: res.data.cards,
          loadedCards: true,
        }
      }
      this.setState({
        allCardsInSet: [...this.state.allCardsInSet, ...res.data.cards],
        loadedCards: true,
      });
      Store.dispatch(allCards);
      // console.log(Store.getState());
    });
  }

  loadMoreCards() {
    const newpage = this.state.page += 1;
    this.setState({ page: newpage });
    this.loadCards(this.state.page, this.state.set);
    console.trace(Store.getState(), "second set");
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
    // this.setState({
    //   allCardsInSet: [],
    //   showFilteredCards: false,
    //   filteredCards: [],
    //   page: 1,
    //   set: e.target.value,
    // });
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

    return (
      <React.Fragment>
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
                  <label htmlFor="lightning">
                    <img src="../../../images/Lightning.png" alt="lightning type icon" title="Lightning Type Icon" />
                  </label>
                  <input className="hide" onChange={e => this.filterCard(e)} type="radio" value="lightning" id="lightning" name="type" />

                  <label htmlFor="fighting">
                    <img src="../../../images/Fighting.png" alt="fighting type icon" title="Fighting Type Icon" />
                  </label>
                  <input className="hide" onChange={e => this.filterCard(e)} type="radio" value="fighting" id="fighting" name="type" />

                  <label htmlFor="grass">
                    <img src="../../../images/Grass.png" alt="grass type icon" title="Grass Type Icon" />
                  </label>
                  <input className="hide" onChange={e => this.filterCard(e)} type="radio" value="grass" id="grass" name="type" />

                  <label htmlFor="fire">
                    <img src="../../../images/Fire.png" alt="fire type icon" title="Fire Type Icon" />
                  </label>
                  <input className="hide" onChange={e => this.filterCard(e)} type="radio" value="fire" id="fire" name="type" />

                  <label htmlFor="psychic">
                    <img src="../../../images/Psychic.png" alt="psychic type icon" title="Psychic Type Icon" />
                  </label>
                  <input className="hide" onChange={e => this.filterCard(e)} type="radio" value="psychic" id="psychic" name="type" />

                  <label htmlFor="metal">
                    <img src="../../../images/Metal.png" alt="metal type icon" title="Metal Type Icon" />
                  </label>
                  <input className="hide" onChange={e => this.filterCard(e)} type="radio" value="metal" id="metal" name="type" />

                  <label htmlFor="fairy">
                    <img src="../../../images/Fairy.png" alt="fairy type icon" title="Fairy Type Icon" />
                  </label>
                  <input className="hide" onChange={e => this.filterCard(e)} type="radio" value="fairy" id="fairy" name="type" />

                  <label htmlFor="colorless">
                    <img src="../../../images/Colorless.png" alt="colorless type icon" title="Colorless Type Icon" />
                  </label>
                  <input className="hide" onChange={e => this.filterCard(e)} id="colorless" type="radio" value="colorless" name="type" />
                </div>

                <div className="clearContainer">
                  <input type="button" className="clear" onClick={this.clearFilters} value="Clear Filter" />
                </div>
              </div>
            </form>
            <div className="displayCards">
              {
                this.state.loadedCards
                  ? cardSet.map(card => (
                    <Link key={card.id} to={{ pathname: `/franchises/pokemon/${card.id}`, state: { card } }}>
                      <SingleCard data={card} key={card.id} />
                    </Link>
                  ))
                  : null
              }
            </div>

            <button className="load" onClick={this.loadMoreCards}>Load More</button>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default CardGridPage;
