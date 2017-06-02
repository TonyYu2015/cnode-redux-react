import { combineReducers } from 'redux';
import appReducer from './reducer.js';
import topicReducer from './topicDetail.js';
import pubTopics from './pubTopicReducer.js';

const rootReducer = combineReducers({
    appReducer,
    topicReducer,
    pubTopics
});

export default rootReducer;