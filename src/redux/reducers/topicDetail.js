import { TOPIC_CONTENT,REPLY_INFO,EDIT_TOPIC,TOPIC_COLLECTION_DATA,TOPIC_COLLECTION,DELETE_TOPIC,DELETE_TOPIC_DATA,REPLY_UP,REPLY_UP_DATA,INNER_REPLY,INNER_REPLY_INFO } from "../actions/actions.js";
import store from '../store/configureStore.js';

const initialState = {
    innerReply : {},
    isInnerReply : false
}


function topic(state = initialState,action){
    switch(action.type){
        case TOPIC_CONTENT:
            const userInfo = store.getState().userInfo;
            if(userInfo.loginStatus){
                var upStates = {};
                action.data.data.replies.map((item,index)=>{
                    var Item = item;
                    item.ups.map((item,index)=>{
                        if(item === userInfo.loginData.id){ 
                            upStates[Item.id] = true;
                        }
                    });
                });
                return Object.assign({},state,{
                    topicContent : action.data.data,
                    likes : upStates
                });
            }else{
                return Object.assign({},state,{
                    topicContent : action.data.data
                });
            }
        case REPLY_UP:
            return Object.assign({},state,{
                upAction : true
            });
        case REPLY_UP_DATA:
            if(action.data.action === "up"){
                var x = Object.assign({},JSON.parse(JSON.stringify(state)));
                x.likes[action.id] = true;
                return x;
            }else{
                var x = Object.assign({},JSON.parse(JSON.stringify(state)));
                x.likes[action.id] = false;
                return x;
            }
        case REPLY_INFO:
            return Object.assign({},state,{
                topicReplies : action.data
            });
        case INNER_REPLY:
            if(action.bol){
                var x = Object.assign({},JSON.parse(JSON.stringify(state)),{
                    isInnerReply : action.bol
                });
                x.innerReply[action.replyId] = true;
                return x;
            }else{
                var x = Object.assign({},JSON.parse(JSON.stringify(state)),{
                    isInnerReply : action.bol
                });
                x.innerReply[action.replyId] = false;
                return x;
            }
        case EDIT_TOPIC:
            return Object.assign({},state,{
                editTopic:action.bol
            });
        case DELETE_TOPIC_DATA:
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