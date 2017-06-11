import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router,Route,Link} from "react-router-dom";

import { catalogySelected,fetchPosts } from './redux/actions/actions.js';
import Home from './containers/home.js';
import PubTopic from './containers/pubTopic.js';
import Topic from './containers/topic.js';
import UnreadMessage from './containers/unreadMessage.js';
import AuthorInfo from './containers/authorInfo.js';

import store from './redux/store/configureStore.js';

require('./style/index.css');

ReactDOM.render(
		<Provider store={store}>
			<Router>
				<div>
					<Route exact path="/" component={Home}/>
					<Route path="/topic" component={Topic}/>
					<Route path="/unreadMessage" component={UnreadMessage}/>
					<Route path="/pubTopic/:status" component={PubTopic}/>
					<Route path="/authorInfo" component={AuthorInfo}/>
				</div>
			</Router>
		</Provider>,
		document.getElementById('root')
	);

/*store.dispatch(catalogySelected('all'));
store.dispatch(fetchPosts('all')).then(()=>{
	console.log(store.getState());
});*/