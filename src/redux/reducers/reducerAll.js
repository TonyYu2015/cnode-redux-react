import { combineReducers } from 'redux';
import topics from './topics.js';
import topic from './topicDetail.js';
import pubTopic from './pubTopicReducer.js';
import messagesCenter from './unreadMessagesReducer.js';
import userInfo from './login.js';

const rootReducer = combineReducers({
    topics,
    topic,
    pubTopic,
    messagesCenter,
    userInfo
});

export default rootReducer;