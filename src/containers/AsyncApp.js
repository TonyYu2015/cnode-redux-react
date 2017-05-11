import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/index/header.js';
import Posts from '../components/index/posts.js';
import Picker from '../components/index/picker.js';
import Page from '../components/index/page.js';
import Login from '../components/index/login.js';
import { userLogin,getUserInfo,catalogySelected,showTag,tieziSelected,pageSelected,invalidateTiezi,fetchPostIfNeeded,getNewPageData } from '../actions/actions.js';

class AsyncApp extends Component {

	constructor(props){
		super(props);
		this.state = {}

		this.paging = this.paging.bind(this);//点击翻页
		this.showTheTag = this.showTheTag.bind(this);
	}

	componentDidMount(){
		const { fetch,postsByCNode } = this.props;
		fetch(postsByCNode.ifFetching);
	}


	//点击翻页
	paging(pagNum){ 
		const { click,selectedTag } = this.props;

		click(selectedTag,pagNum);//获取新页面 
	}

	//分类功能
	showTheTag(ev){
		const { tagClick } = this.props;
		const tagNow = ev.target.innerText;
		switch(tagNow){
			case '全部':
				tagClick('all');
				break;
			case '精华':
				tagClick('good');
				break;
			case '分享':
				tagClick('share');
				break;
			case '问答':
				tagClick('ask');
				break;
			case '招聘':
				tagClick('job');
				break;
		}
	}
	//登录功能
	login(){

	}
	componentWillReceiveProps(nextProps){
	/*	if(this.props.postsByCNode.lastUpdate != nextProps.postsByCNode.lastUpdate){
			fetch(postsByCNode.ifFetching);
		}*/
	}

	render(){
		const { postsByCNode,pageSelected } = this.props;
		return(
			<div>
				<div id="header">
					<Header />
				</div>
				<div id="content">
					<div className="main-content">
						<Picker tab = {this.showTheTag} />
						<Posts posts = {postsByCNode.posts}/>
						<Page pageNum = {pageSelected.pageNumNow}
							  onClick = {this.paging}
							  />
					</div>
					<div className="fun-modules">
						<Login />
					</div>
				</div>
				<div id="footer"></div>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{

	return {
		'postsByCNode' : state.postsByCNode,
		'selectedTag' : state.selectedTag,
		'pageSelected' : state.pageSelected,
		'selectedTag' : state.selectedTag,
		'userInfo' : state.userInfo
	}
}
const mapDispatchProps = (dispatch)=>{
	return {
		'fetch' : (bol)=>{
			dispatch(fetchPostIfNeeded(bol));
		},
		'click' : (tag,num)=>{
			dispatch(pageSelected(num));
			dispatch(getNewPageData(tag,num));
		},
		'tagClick' : (tag)=>{
			dispatch(catalogySelected(tag));
			dispatch(getNewPageData(tag));
		},
		'login' : (access)=>{
			dispatch(userLogin(access));
			dispatch(getUserInfo(access));
		}
	}
}
const Async = connect(mapStateToProps,mapDispatchProps)(AsyncApp);

module.exports = Async;