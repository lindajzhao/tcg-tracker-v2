import reducer from '../reducers/index';
import { createStore } from 'redux';

// Tentative redux structure
// {
//   user: {
//     loggedIn: <boolean>,
//     firebase: {},
//     info: {}
//   },

//   userDecks: {
//     pokemon: [
//       {
//         deckName: <string>,
//         dateCreated: <date>
//         cards: ['xy0-12', cardId<string>, ... ],
//       }
//     ]
//   },

//   pokemon:xy1 <string>: [cardInfo<object>, ... ],
//   pokemon:sunmoon <string>: [cardInfo<object>, ... ],
// }               

let initialState = {
    loggedIn: false,
    user: {},
    allCardsInSet: []
};

if (localStorage.getItem('test')){
    const cache = localStorage.getItem('test');
    initialState.allCardsInSet = JSON.parse(cache);
}

const Store = createStore(reducer, initialState);

export default Store;

