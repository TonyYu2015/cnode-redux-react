import { TOPIC_CONTENT,REPLY_INFO,EDIT_TOPIC,TOPIC_COLLECTION_DATA,TOPIC_COLLECTION,DELETE_TOPIC,DELETE_TOPIC_DATA,REPLY_UP,REPLY_UP_DATA,INNER_REPLY,INNER_REPLY_INFO } from "../actions/actions.js";
import store from '../store/configureStore.js';

const initializeState = {
}

function topic(state = initializeState,action){
    switch(action.type){
        case TOPIC_CONTENT:
            var replyStates = [];
            var upStates = {};
            var userInfo = store.getState().userInfo
            action.data.data.replies.map((item,index)=>{
                var Item = item;
                replyStates[index] = false;
                item.ups.map((item,index)=>{
                    if(item === userInfo.loginData.id){ 
                        upStates[Item.id] = true;
                    }
                });
            });
            return Object.assign({},state,{
                topicContent : action.data.data,
                replyStates : replyStates,
                likes : upStates
            }
            );
        case REPLY_UP:
            return Object.assign({},state,{
                upAction : true
            });
        case REPLY_UP_DATA:
            if(action.action === "up"){
                var x = Object.assign({},state);
                x.likes[action.id] = true;
                return Object.assign({},{
                    likes : x.likes
                })
            }else{
                var x = Object.assign({},state);
                x.likes[action.id] = false;
                return x;
            }
        case REPLY_INFO:
            return Object.assign({},state,{
                topicReplies : action.data
            });
        case EDIT_TOPIC:
            return Object.assign({},state,{
                editTopic:action.bol
            });
        case DELETE_TOPIC:
            return Object.assign({},state,{
                postDeleteTopic:action.data.success
            });
        case TOPIC_COLLECTION_DATA:
            return Object.assign({},state,{
                success:action.data.success,
                collection:false
            });
        default:
            return state;
    }
}

export default topic;