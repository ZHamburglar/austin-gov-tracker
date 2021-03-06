import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

/**
 * Prepare the Redux Store
 */
const composedMiddlewares = applyMiddleware(thunk);

const storeEnhancers = composeWithDevTools({
  name: 'React Configured Base',
})(composedMiddlewares);

const makeStore = createStore(reducers, undefined, storeEnhancers);


export default makeStore;