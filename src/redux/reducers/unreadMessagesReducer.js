import { combineReducers } from 'redux';
import { GET_MESSAGES,RECEIVE_MESSAGES } from "../actions/actions.js";

function unreadMessages (state={},action){
    switch(action.type){
        case RECEIVE_MESSAGES:
        console.log(action.data.success)
            if(!action.data.success) return null;
            
            return Object.assign({},state,action.data.data);
        default :
            return state;
    }
}

const messagesCenter = combineReducers({
    unreadMessages
});

export default messagesCenter;
