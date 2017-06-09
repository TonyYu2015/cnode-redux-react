import { combineReducers } from 'redux';
import topics from './topics.js';
import topic from './topicDetail.js';
import pubTopics from './pubTopicReducer.js';
import messagesCenter from './unreadMessagesReducer.js';
import userInfo from './login.js';

const rootReducer = combineReducers({
    topics,
    topic,
    pubTopics,
    messagesCenter,
    userInfo
});

export default rootReducer;