import { combineReducers } from 'redux';
import { CATALOGY_SELECTED,TIEZI_SELECTED,PAGE_SELECTED,REQUEST_SEND,RECEIVE_DATA,INVALIDATE_TIEZI,LOGIN_IN,USER_INFO } from '../actions/actions.js';
import topicReducer from './topicDetail.js';
//标签选择
function selectedTag(state='all',action){
	switch(action.type){
		case CATALOGY_SELECTED:
			return action.tag;
		default:
			return state;
	}
}
//用户登录验证
function userInfo(state={
	access:"",
	data:""
},action){
	switch(action.type){
		case USER_INFO:
			return Object.assign({},state,{
				access : action.access,
				data : action.data
			});
		default:
			return state;
	}
}
//页数选择
function pageSelected(state={
		pageNumNow:1
	},action){
	switch(action.type){
		case PAGE_SELECTED:
			return Object.assign({},state,{
				pageNumNow:Number(action.pageNum)
			});
		default:
			return state;
	}
}
//state初始化
function postsByCNode(state={
			ifFetching:true,
			posts:[]
		},action){

		switch(action.type){
			case INVALIDATE_TIEZI:
				return Object.assign({},state,{
					invalidate:true
				});
			case REQUEST_SEND:
				return Object.assign({},state,{
					ifFetching:action.bol
				});
			case RECEIVE_DATA:
				return Object.assign({},state,{
					ifFetching:false,
					invalidate:false,
					posts:action.posts,
					lastUpdate:action.lastUpdate
				});
			default:
				return state;
		}
}

/*function postsByCNode(state={
					},action){
	switch(action.type){
		case INVALIDATE_TIEZI:
		case REQUEST_SEND:
		case RECEIVE_DATA:
			return Object.assign({},state,{
				ifFetching:false,
				invalidate:false,
				posts:posts(state.posts,action)
			})
		default:
			return state;
	}
}*/

const appReducer = combineReducers({
	selectedTag,
	postsByCNode,
	pageSelected,
	userInfo
});

export default appReducer;