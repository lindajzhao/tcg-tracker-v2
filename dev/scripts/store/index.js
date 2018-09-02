import reducer from '../reducers/index';
import { createStore } from 'redux';

const initialState = {
    loggedIn: false,
    user: {},
};

const Store = createStore(reducer, initialState);

export default Store;

