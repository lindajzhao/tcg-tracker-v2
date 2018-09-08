import reducer from '../reducers/index';
import { createStore } from 'redux';

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

