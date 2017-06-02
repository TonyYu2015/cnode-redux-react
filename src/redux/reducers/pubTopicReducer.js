import { combineReducers } from 'redux';
import {TOPIC_PUBLISHED} from '../actions/actions.js';

function pubTopic(state={
    success : false,
    topic_id : ""
},action){
    switch(action.type){
        case TOPIC_PUBLISHED:
            return Object.assign({},state,{
                success : action.data.success,
                topic_id : action.data.topic_id
            });
        default :
            return state;
    }
}

const pubTopics = combineReducers({
    pubTopic
});

export default pubTopics;