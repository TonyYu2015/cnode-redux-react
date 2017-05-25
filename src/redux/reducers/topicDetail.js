import { combineReducers } from 'redux';
import { TOPIC_CONTENT } from "../redux/actions/actions.js";

export function topicContent(state = {data:""},action){
    switch(action.type){
        case TOPIC_CONTENT:
            return Object.assgin({},state,{
                data : action.data
            });
    }
    
}