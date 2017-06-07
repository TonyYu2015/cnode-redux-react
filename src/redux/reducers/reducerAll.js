import { combineReducers } from 'redux';
import appReducer from './reducer.js';
import topicReducer from './topicDetail.js';
import pubTopics from './pubTopicReducer.js';
import messagesCenter from './unreadMessagesReducer.js';

const rootReducer = combineReducers({
    appReducer,
    topicReducer,
    pubTopics,
    messagesCenter
});

export default rootReducer;