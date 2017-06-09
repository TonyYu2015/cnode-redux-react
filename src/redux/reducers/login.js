import { LOGIN_IN,USER_INFO,LOGIN_OUT }  from '../actions/actions.js';

const initializeState = {
    accessToken : null,
    loginStatus : false
}

function userInfo(state=initializeState,action){
	switch(action.type){
		case LOGIN_IN:
			return Object.assign({},state,{
				accessToken : action.access,
				loginStatus:action.data.success,
                loginData : action.data
			});
		case LOGIN_OUT:
			return Object.assign({},state,{
				loginStatus:false
			});
        case USER_INFO:
            return Object.assign({},state,{
                data : action.data
            });
		default:
			return state;
	}
}

export default userInfo;