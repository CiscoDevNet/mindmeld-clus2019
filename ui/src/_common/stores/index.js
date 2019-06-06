import {
  applyMiddleware,
  createStore,
  compose
} from 'redux';

import reducers from '_common/reducers';
import middlewares from '_common/middlewares';


// export the store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // For the redux extension
export const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));
