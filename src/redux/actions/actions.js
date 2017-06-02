import fetch from 'isomorphic-fetch';

export const CATALOGY_SELECTED = "CATALOGY_SELECTED";
export const TIEZI_SELECTED = "TIEZI_SELECTED";
export const PAGE_SELECTED = "PAGE_SELECTED";
export const REQUEST_SEND = "REQUEST_SEND";
export const RECEIVE_DATA = "RECEIVE_DATA";
export const INVALIDATE_TIEZI = "INVALIDATE_TIEZI";
export const LOGIN_IN = "LOGIN_IN";
export const USER_INFO = "USER_INFO";
export const TOPIC_CONTENT = "TOPIC_CONTENT";
export const REPLY_INFO = "REPLY_INFO";
export const TOPIC_PUBLISHED = "TOPIC_PUBLISHED";
export const EDIT_TOPIC = "EDIT_TOPIC";
export const TOPIC_COLLECTION = "TOPIC_COLLECTION";//主题收藏
export const TOPIC_COLLECTION_DATA = "TOPIC_COLLECTION_DATA";

const commonUrl = "https://cnodejs.org/api/v1";//接口共同部分
//《==========用户登录==========》
function receiveUserName(access,data){
	return {
		type : USER_INFO,
		access,
		data
	}
}

function userInfoRight(data){
	const url = commonUrl + "/user/" + data.loginname;
	return (dispatch)=>{
		dispatch(requestSend(true));
		return fetch(url,{
			'Method':'GET',
			'mode':'cors'
		})
		.then((response)=>response.json())
		.then((json)=>dispatch(receiveUserName(json)));
	}
}

export function getUserInfo(access){
	const url = commonUrl + "/accesstoken";
	return (dispatch)=>{
		dispatch(requestSend(true));
		return fetch(url,{
					'method':'POST',
					'body':'accesstoken=' + access,
					'headers':{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				})
		.then((response)=>response.json(),(err)=>{return new Error(err)})
		.then((json)=>dispatch(receiveUserName(access,json))); 
	}
}

//《==========用户发布主题==========》
function receivePubTopicInfo(data){
	return {
		type:TOPIC_PUBLISHED,
		data
	}
}

export function pubTopicRequest(access,data){
	return (dispatch) => {
		dispatch(requestSend(true));
		return fetch(commonUrl+ "/topics",{
			'method':'POST',
			'body':'accesstoken=' + access + '&title=' + data.title + '&tab=' + data.tab + '&content=' + data.content,
			'headers':{
				'Content-Type':'application/x-www-form-urlencoded'
			}
		})
		.then((response)=>response.json(),(err)=>{throw new Error(err)})
		.then((json)=>dispatch(receivePubTopicInfo(json)));
	}
}

//《==========用户编辑主题==========》

export function editTopic(bol){
	return {
		type:EDIT_TOPIC,
		bol
	}
}

// 《==========用户收藏主题==========》

export function topicCollection(bol){
	return {
		type:TOPIC_COLLECTION,
		bol
	}
}

export function topicCollectionRequest(access,topic_id){
	return (dispatch) => {
		dispatch(requestSend(true));
		return fetch(commonUrl + "/topic_collect/collect",{
			'method':'POST',
			'body':'accesstoken=' + access + '&topic_id =' + topic_id ,
			'headers':{
				'Content-Type':'application/x-www-form-urlencoded',
				'Accept':'text/html'
			}
		})
		.then((response)=>console.warn(response),(err)=>{throw new Error(err)})
		.then((json)=>console.log(json));
	}
}

function receiveCollectionInfo(data){
	return {
		type:TOPIC_COLLECTION_DATA,
		data
	}
}

//《==========用户发布主题评论==========》
export function addReply(access,content,topicId){
	return (dispatch) => {
		dispatch(requestSend(true));
		return fetch(commonUrl+"/topic/" + topicId + "/replies",{
			'method':'POST',
			'body':'accesstoken=' + access + '&content=' + content,
			'headers':{
				'Content-Type':'application/x-www-form-urlencoded'
			}
		})
		.then((response)=>response.json(),(err)=>{return new Error(err)})
		.then((json)=>dispatch(receiveReplyInfo(json)));
	}
}

function receiveReplyInfo(data){
	return {
		type : REPLY_INFO,
		data
	}
}

//《==========获取主题内容==========》
export function getTopicContent(topicId){
	const url = "https://cnodejs.org/api/v1/topic/" + topicId;
	return (dispatch) => {
		dispatch(requestSend(true));
		return fetch(url,{
					'Method':'GET',
					'mode':'cors'})
					.then((response) => response.json())
					.then((json) => dispatch(receiveTopicContent(json)));
	}
}

function receiveTopicContent(data){
	return {
		type:TOPIC_CONTENT,
		data
	}
}

//《==========获取新标签内容==========》
export function catalogySelected(tag){
		return	{
					type:CATALOGY_SELECTED, 
					tag
				}
		}


export function tieziSelected(title){
		return	{
					type:TIEZI_SELECTED,
					title
				}
		}
//《==========分页==========》
export function pageSelected(pageNum){
		return	{
					type:PAGE_SELECTED,
					pageNum
				}
		}

export function getNewPageData(tag,pageNum){
	if(pageNum === "«") pageNum = 1;

	const url = 'https://cnodejs.org/api/v1/topics?tab=' + (tag||'all') + '&page=' + pageNum;
	return (dispatch)=>{
		dispatch(requestSend(true));
		return fetch(url,{
					'Method':'GET',
					'mode':'cors'})
		.then((response)=>{return response.json();})
		.then((json)=>{dispatch(receiveData(json));});
	}
}

export function invalidateTiezi(bol){
		return	{
					type:INVALIDATE_TIEZI,
					bol
				}
		}

function requestSend(bol){
		return	{
					type:REQUEST_SEND,
					bol
				}
}

function receiveData(json){
		return	{
					type:RECEIVE_DATA,
					posts:json.data,
					lastUpdate:Date.now()
				}
}

function fetchPosts(bol){
	return (dispatch)=>{
				dispatch(requestSend(bol));
				return fetch('https://cnodejs.org/api/v1/topics',{
					'Method':'GET',
					'mode':'cors'})
				.then((response)=>{return response.json();})
				.then((json)=>{dispatch(receiveData(json));});
			}
}

function shouldFetchPosts(state){
	const posts = state.appReducer.postsByCNode.posts;

	if(!posts.length){
		return true;
	} else if (state.appReducer.postsByCNode.ifFetching){
		return false;
	} else {
		return state.appReducer.postsByCNode.invalidate;
	}
}

export function fetchPostIfNeeded(bol){
	return (dispatch,getState)=>{
		if(shouldFetchPosts(getState())){
			return dispatch(fetchPosts(bol));
		} else {
			return Promise.resolve();
		}
	}
}