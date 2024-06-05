import { combineReducers, configureStore  } from '@reduxjs/toolkit'

import authReducer from './reducers/authReducer';
const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore ({reducer: authReducer});

export default store;