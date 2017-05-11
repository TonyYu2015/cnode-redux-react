import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import  rootReducer  from './reducers/reducer.js';
import { catalogySelected,fetchPosts } from './actions/actions.js';
import Async from './containers/AsyncApp.js';
import React from 'react';
import ReactDOM from 'react-dom';

require('./style/index.css');

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


ReactDOM.render(
		<Provider store={store}>
				<Async />
		</Provider>,
		document.getElementById('root')
	);

/*store.dispatch(catalogySelected('all'));
store.dispatch(fetchPosts('all')).then(()=>{
	console.log(store.getState());
});*/