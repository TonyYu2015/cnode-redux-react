import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router,Route,Link} from "react-router-dom";
import  rootReducer  from './redux/reducers/reducer.js';
import { catalogySelected,fetchPosts } from './redux/actions/actions.js';
import Async from './containers/AsyncApp.js';
import PubReply from './containers/pubReply.js';
import Topic from './containers/topic.js';
import UnreadMessage from './containers/unreadMessage.js';


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
			<Router>
				<div>
					<Route exact path="/" component={Async}/>
					<Route path="/topic/:id" component={Topic}/>
					<Route path="/unreadMessage" component={UnreadMessage}/>
					<Route path="/pubReply" component={PubReply}/>
				</div>
			</Router>
		</Provider>,
		document.getElementById('root')
	);

/*store.dispatch(catalogySelected('all'));
store.dispatch(fetchPosts('all')).then(()=>{
	console.log(store.getState());
});*/