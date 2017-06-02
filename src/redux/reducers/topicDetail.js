import { combineReducers } from 'redux';
import { TOPIC_CONTENT,REPLY_INFO,EDIT_TOPIC,TOPIC_COLLECTION_DATA,TOPIC_COLLECTION } from "../actions/actions.js";

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
//回复主题
function topicReply(state = {},action){
    switch(action.type){
        case REPLY_INFO:
            return Object.assign({},state,action.data);
        default:
            return state;
    }
}
//编辑主题
function editTopic(state={
    editTopic:false
},action){
    switch(action.type){
        case EDIT_TOPIC:
            return Object.assign({},state,{
                editTopic:action.bol
            });
        default:
            return state;
    }
}
//收藏主题
function topicCollection(state={
    collection:false,
    success:false
},action){
    switch(action.type){
        case TOPIC_COLLECTION:
            return Object.assign({},state,{
                collection:action.bol
            });
        case TOPIC_COLLECTION_DATA:
            return Object.assign({},state,{
                success:action.data.success,
                collection:false
            });
        default :
            return state;
    }
}
const topicReducer = combineReducers({
    topicContent,
    topicReply,
    editTopic,
    topicCollection
});

export default topicReducer;