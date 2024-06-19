import {configureStore} from '@reduxjs/toolkit';

import thunk from 'redux-thunk';

import rootReducer from './reducers';

export function createStore() {
    const store = configureStore({
        reducer: rootReducer, 
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
              serializableCheck: false,
        }),
    });
    
    return store;
}