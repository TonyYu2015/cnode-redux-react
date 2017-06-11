import {TOPIC_PUBLISH} from '../actions/actions.js';
import {EDIT_TOPIC} from '../actions/actions.js';

function pubTopic(state={
},action){
    switch(action.type){
        case TOPIC_PUBLISH:
            return Object.assign({},state,{
                topicStatus : "pub",
                data : action.data
            });
        case EDIT_TOPIC:
            return Object.assign({},state,{
                topicStatus : "edit",
                topic_id : action.data.topic_id
            });
        default :
            return state;
    }
}

export default pubTopic;