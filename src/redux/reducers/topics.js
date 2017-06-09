import { CATALOGY_SELECTED,TIEZI_SELECTED,PAGE_SELECTED,REQUEST_SEND,RECEIVE_DATA,INVALIDATE_TIEZI } from '../actions/actions.js';

const initializeState = {
	ifFetching:true,
	posts:[],
	pageNumNow:1
}

function topics(state=initializeState,action){
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
			case PAGE_SELECTED:
				return Object.assign({},state,{
					pageNumNow:Number(action.pageNum)
				});
			case CATALOGY_SELECTED:
				return Object.assign({},state,{
					tag:action.tag,
					selectedTag:action.bol
				});
			default:
				return state;
		}
}

export default topics;