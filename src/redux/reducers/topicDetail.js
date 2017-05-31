import { combineReducers } from 'redux';
import { TOPIC_CONTENT } from "../actions/actions.js";

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

const topicReducer = combineReducers({
    topicContent
});

export default topicReducer;