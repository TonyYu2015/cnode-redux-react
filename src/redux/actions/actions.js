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
export const TOPIC_PUBLISH = "TOPIC_PUBLISH";
export const PUBLISH_CLICK = "PUBLISH_CLICK";
export const EDIT_TOPIC = "EDIT_TOPIC";
export const TOPIC_COLLECTION = "TOPIC_COLLECTION";//主题收藏
export const TOPIC_COLLECTION_DATA = "TOPIC_COLLECTION_DATA";
export const DELETE_TOPIC = "DELETE_TOPIC";//取消主题
export const DELETE_TOPIC_DATA = "DELETE_TOPIC_DATA";
export const REPLY_UP = "REPLY_UP";//评论点赞
export const REPLY_UP_DATA = "REPLY_UP_DATA";
export const INNER_REPLY = "INNER_REPLY";//回复评论
export const INNER_REPLY_INFO = "INNER_REPLY_INFO";
export const GET_MESSAGES  = "GET_MESSAGES";//获取未读和已读消息
export const RECEIVE_MESSAGES  = "RECEIVE_MESSAGES";
export const LOGIN_OUT = "LOGIN_OUT";//退出

const commonUrl = "https://cnodejs.org/api/v1";//接口共同部分
//《==========用户登录/退出/信息==========》
function receiveUserName(access,data){
	return {
		type : LOGIN_IN,
		access,
		data
	}
}

export function userLoginOut(bol){
	return {
		type : LOGIN_OUT,
		bol
	}
}

function receiveUserInfo(data){
	return {
		type : USER_INFO,
		data
	}
}

export function getUserInfo_AC(userName){
	const url = commonUrl + "/user/" + userName;
	return (dispatch)=>{
		dispatch(requestSend(true));
		return fetch(url,{
			'Method':'GET',
			'mode':'cors'
		})
		.then((response)=>response.json())
		.then((json)=>dispatch(receiveUserInfo(json)));
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
		.then((json)=>{
			if(!json.success){
				alert(json.error_msg);
			}else{
				dispatch(receiveUserName(access,json))
			}
		}); 
	}
}
//《==========获取用户消息==========》
export function getUserMessages(access,mdrender){
	return (dispatch) => {
		dispatch(requestSend(true));
		return fetch(commonUrl + "/messages?accesstoken=" + access + "&mdrender" + mdrender,{
			"method" : "GET"
		})
		.then((response)=>response.json())
		.then((json)=>dispatch(receiveMessages(json)))
		.catch((err)=>{throw new Error(err)});
	}
}

function receiveMessages(data){
	return {
		type : RECEIVE_MESSAGES,
		data
	}
}

//《==========用户发布/编辑主题==========》
function receivePubTopicInfo(data){
	return {
		type:TOPIC_PUBLISH,
		data
	}
}

export function isPublishClick(bol){
	return {
		type : PUBLISH_CLICK,
		bol
	}
	
}

export function editTopic(bol){
	return {
		type:EDIT_TOPIC,
		bol
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
		.then((json)=>{
			dispatch(receivePubTopicInfo(json));
			
		})
		.catch(err => { throw err });
	}
}

//《==========用户删除主题==========》

export function deleteTopic(bol){
	return {
		type : DELETE_TOPIC,
		bol
	}
}

export function postDelete(access,topic_id){
	return (dispatch) => {
		dispatch(requestSend(true));
		return fetch(commonUrl + "/topic_collect/de_collect",{
			'method':'POST',
			'body':'accesstoken=' + access + '&topic_id =' + topic_id ,
			'headers':{
				'Content-Type':'application/x-www-form-urlencoded',
				'Accept':'text/html'
			}
		})
		.then((response) => response.json(),(err) => {throw new Error(err)})
		.then((json) => dispatch(receiveDeleteTopic(json)))
		.catch(err => {throw err});
	}
}

function receiveDeleteTopic(data){
	return {
		type : DELETE_TOPIC_DATA,
		data
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
		.then((response)=>response.json(),(err)=>{throw new Error(err)})
		.then((json)=>console.log(json))
		.catch(err =>{ throw err });
	}
}

function receiveCollectionInfo(data){
	return {
		type:TOPIC_COLLECTION_DATA,
		data
	}
}

//《==========用户发布主题评论==========》
export function addReply(access,content,topicId,replyId){
	let values = replyId ? `accesstoken=${access}&content=${content}&reply_id=${replyId}` : `accesstoken=${access}&content=${content}`;
 	 
	return (dispatch) => {
		dispatch(requestSend(true));
		return fetch(commonUrl+"/topic/" + topicId + "/replies",{
			'method':'POST',
			'body':values,
			'headers':{
				'Content-Type':'application/x-www-form-urlencoded'
			}
		})
		.then((response)=>response.json(),(err)=>{return new Error(err)})
		.then((json)=> replyId ? dispatch(receiveInnerReplyInfo(json)) : dispatch(receiveReplyInfo(json)));
	}
}

function receiveReplyInfo(data){
	return {
		type : REPLY_INFO,
		data
	}
}

function receiveInnerReplyInfo(data){
	return {
		type : INNER_REPLY_INFO,
		data
	}
}

//《==========主题评论点赞==========》
export function replyUp(bol){
	return {
		type : REPLY_UP,
		bol
	}
}

export function postReplyUp(access,reply_id){
	return (dispatch) => {
		dispatch(dispatch(requestSend(true)));
		return fetch(commonUrl + "/reply/" + reply_id + "/ups",{
			'method':'POST',
			'body':'accesstoken=' + access,
			'headers':{
				'Content-Type':'application/x-www-form-urlencoded'
			}
		})
		.then((response)=>response.json(),(err)=>{return new Error(err)})
		.then((json)=>dispatch(receiveReplyUp(json,reply_id)));
	}
}

function receiveReplyUp(data,id){
	return {
		type : REPLY_UP_DATA,
		data,
		id
	}
}

//《==========用户回复评论==========》
export function innerReply(replyId,bol){
	return {
		type : INNER_REPLY,
		replyId,
		bol
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
export function catalogySelected(tag,bol){
		return	{
					type:CATALOGY_SELECTED, 
					tag,
					bol
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
	const posts = state.topics.posts;

	if(!posts.length){
		return true;
	} else if (state.topics.ifFetching){
		return false;
	} else {
		return state.topics.invalidate;
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