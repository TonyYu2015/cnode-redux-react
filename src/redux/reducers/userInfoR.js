import { combineReducers } from 'redux';
import { USER_INFO } from "../actions/actions.js";

function userInfo(state={},action){
    switch(action.type){
        case USER_INFO:
            return Object.assign({},state,action.data);
        default :
            return state;
    }
}

const userInfoS = combineReducers({
    userInfo
});

export default userInfoS;