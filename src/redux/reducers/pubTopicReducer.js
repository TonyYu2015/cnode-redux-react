import {TOPIC_PUBLISH,EDIT_TOPIC,PUBLISH_CLICK} from '../actions/actions.js';

function pubTopic(state={
    published : false
},action){
    switch(action.type){
        case TOPIC_PUBLISH:
            return Object.assign({},state,{
                topicStatus : "pub",
                published : true,
                data : action.data
            });
        case PUBLISH_CLICK:
            return Object.assign({},state,{
                published : action.bol
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