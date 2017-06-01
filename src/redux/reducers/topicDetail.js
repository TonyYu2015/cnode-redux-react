import { combineReducers } from 'redux';
import { TOPIC_CONTENT,REPLY_INFO } from "../actions/actions.js";

//初始化主题页内容
function topicContent(state = {},action){
    switch(action.type){
        case TOPIC_CONTENT:
            return Object.assign({},state,
                action.data
            );
        default:
            return state;
    }
}

function topicReply(state = {},action){
    switch(action.type){
        case REPLY_INFO:
            return Object.assign({},state,action.data);
        default:
            return state;
    }
}

const topicReducer = combineReducers({
    topicContent,
    topicReply
});

export default topicReducer;