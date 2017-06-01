import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/header.js';
import Posts from '../components/posts.js';
import Picker from '../components/picker.js';
import Page from '../components/page.js';
import Login from '../components/login.js';
import { userLogin,getUserInfo,catalogySelected,showTag,tieziSelected,pageSelected,invalidateTiezi,fetchPostIfNeeded,getNewPageData } from '../redux/actions/actions.js';

class AsyncApp extends Component {

	constructor(props){
		super(props);
		this.state = {
			tabs:[
				{
					name:"全部",
					active:false
				},
				{
					name:"精华",
					active:false
				},
				{
					name:"分享",
					active:false
				},
				{
					name:"问答",
					active:false
				},
				{
					name:"招聘",
					active:false
				},
				{
					name:"客户端测试",
					active:false
				}
			],
			tabOnList:"全部"
		}

		this.paging = this.paging.bind(this);//点击翻页
		this.showTheTag = this.showTheTag.bind(this);
		this.tabBgChange = this.tabBgChange.bind(this);//tab颜色变化
		this.login = this.login.bind(this);
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

	//<==========tab选择==========>
	tabBgChange(tag){
		this.state.tabs.map((item,index)=>{
			if(item.name === tag){
				item.active = true;
				this.state.tabOnList = item.name;
				this.setState({
					tabs:this.state.tabs,
					tabOnList:this.state.tabOnList
				});
			}else{
				item.active = false;
				this.setState({
					tabs:this.state.tabs
				});
			}
		});
	}
	//分类功能
	showTheTag(ev){
		const { tagClick } = this.props;
		const tagNow = ev.target.innerText;
		this.tabBgChange(tagNow);
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
			case '客户端测试':
				tagClick('dev');
				break;
		}
	}
	//登录功能
	login(){
		//发起验证请求
		const { login } = this.props;
		const access = document.getElementById("access");
		login(access.value);

	}
	componentWillReceiveProps(nextProps){
	/*	if(this.props.postsByCNode.lastUpdate != nextProps.postsByCNode.lastUpdate){
			fetch(postsByCNode.ifFetching);
		}*/
	}

	render(){
		const { postsByCNode,pageSelected,userInfo} = this.props;
		return(
			<div>
				<Header />
				<div id="content">
					<div className="main-content">
						<Picker tabClick = {this.showTheTag}
								tabsStatus = {this.state.tabs}
							 />
						<Posts  posts = {postsByCNode.posts}
								tabActive = {this.state.tabOnList}
							/>
						<Page pageNum = {pageSelected.pageNumNow}
							  onClick = {this.paging}
							  />
					</div>
					<div className="fun-modules">
						<Login click = {this.login} userInfo={userInfo.data}/>
					</div>
				</div>
				<div id="footer"></div>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		'postsByCNode' : state.appReducer.postsByCNode,
		'selectedTag' : state.appReducer.selectedTag,
		'pageSelected' : state.appReducer.pageSelected,
		'selectedTag' : state.appReducer.selectedTag,
		'userInfo' : state.appReducer.userInfo
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
			dispatch(getUserInfo(access));
		}
	}
}
const Async = connect(mapStateToProps,mapDispatchProps)(AsyncApp);

export default Async;