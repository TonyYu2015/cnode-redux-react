import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import  rootReducer  from '../reducers/reducerAll.js';

var loggerMiddleware = createLogger();

const store = (function configureStore(preloadState){
	return createStore(
		rootReducer,
		preloadState,
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	);
})();

export default store;