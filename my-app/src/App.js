import React from 'react';
import Autocomplete from './Autocomplete';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducer';

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

function App () {  
  return (
    <Provider store={store}>
      <Autocomplete />
    </Provider>
  );
}

export default App;