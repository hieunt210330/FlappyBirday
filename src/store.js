import {configureStore} from '@reduxjs/toolkit';

import thunk from 'redux-thunk';

import rootReducer from './reducers';

export function createStore() {
    const store = configureStore({
        reducer: rootReducer, 
        middleware: thunk
    });
    
    return store;
}