import { combineReducers } from 'redux';
import appReducer from './reducer.js';
import topicReducer from './topicDetail.js';

const rootReducer = combineReducers({
    appReducer,
    topicReducer
});

export default rootReducer;