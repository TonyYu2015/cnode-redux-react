import { combineReducers } from 'redux';
import appReducer from './reducer.js';
import topicReducer from './topicDetail.js';
import pubTopics from './pubTopicReducer.js';
import messagesCenter from './unreadMessagesReducer.js';
import userInfoS from './userInfoR.js';

const rootReducer = combineReducers({
    appReducer,
    topicReducer,
    pubTopics,
    messagesCenter,
    userInfoS
});

export default rootReducer;