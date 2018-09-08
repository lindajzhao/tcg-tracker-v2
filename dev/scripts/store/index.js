import reducer from '../reducers/index';
import { createStore } from 'redux';

const initialState = {
    loggedIn: false,
    user: {},
    allCardsInSet: []
    //TO-DO: Put things in Local Storage in Redux
};

const Store = createStore(reducer, initialState);

export default Store;

