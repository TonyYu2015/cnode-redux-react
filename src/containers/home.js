import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/header.js';
import Posts from '../components/posts.js';
import Picker from '../components/picker.js';
import Page from '../components/page.js';
import Login from '../components/login.js';
import { userLogin,getUserInfo,catalogySelected,showTag,tieziSelected,pageSelected,invalidateTiezi,fetchPostIfNeeded,getNewPageData,userLoginOut } from '../redux/actions/actions.js';

class Home extends Component {

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
			]
		}

		this.paging = this.paging.bind(this);
		this.showTheTag = this.showTheTag.bind(this);
		this.tabBgChange = this.tabBgChange.bind(this);
		this.login = this.login.bind(this);
	}

	componentDidMount(){
		const { fetch,ifFetching,userInfo } = this.props;
		fetch(ifFetching);
		this.login();
	}


	//点击翻页
	paging(pagNum){ 
		const { click,selectedTag } = this.props;
		click(selectedTag.tag,pagNum);//获取新页面
	}

	//tab选择
	tabBgChange(tag){
		this.state.tabs.map((item,index)=>{
			if(item.name === tag){
				item.active = true;
				this.setState({
					tabs:this.state.tabs
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
				tagClick('all',false);
				break;
			case '精华':
				tagClick('good',false);
				break;
			case '分享':
				tagClick('share',true);
				break;
			case '问答':
				tagClick('ask',true);
				break;
			case '招聘':
				tagClick('job',true);
				break;
			case '客户端测试':
				tagClick('dev',true);
				break;
		}
	}
	//登录功能
	login(){
		//发起验证请求
		const { login } = this.props;
		const access = $("#access").val();
		localStorage.setItem("access",access);
		if(access === "请输入accessToken" || ""){
			alert("请输入accessToken!!!");
		}else{
			login(access);
		}
	}

	render(){
		const { posts,pageNumNow,userInfo,selectedTag,login_out} = this.props;
		return(
			<div>
				<Header loginStatus = {userInfo.loginStatus} login_out={login_out}/>
				<div id="content" style={{padding:"20px 10px 0 30px"}} className="container-fluid">
					<div className="row">
                        <div className="col-lg-9 main-content">
							<Picker tabClick = {this.showTheTag}
									tabsStatus = {this.state.tabs}
							 />
							<Posts  posts = {posts} 
									bol = {selectedTag}
							/>
							<Page 	pageNum = {pageNumNow}
									onClick = {this.paging}
							/>
						</div>
						<div className="col-lg-3 fun-modules">
							<Login 	click = {this.login} 
									loginData={userInfo.loginData} 
									loginStatus = {userInfo.loginStatus}
									personal = { true }
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		'posts' : state.topics.posts,
		'selectedTag' : state.topics.selectedTag,
		'pageNumNow' : state.topics.pageNumNow,
		'ifFetching' : state.topics.ifFetching,
		'userInfo' : state.userInfo
	}
}
const mapDispatchProps = (dispatch)=>{
	return {
		'fetch' : (bol)=>{//获取主题列表
			dispatch(fetchPostIfNeeded(bol));
		},
		'click' : (tag,num)=>{//选择页数
			dispatch(pageSelected(num));
			dispatch(getNewPageData(tag,num));
		},
		'tagClick' : (tag,bol)=>{//选择标签
			dispatch(catalogySelected(tag,bol));
			dispatch(getNewPageData(tag));
		},
		'login' : (access)=>{//登录
			dispatch(getUserInfo(access));
		},
		'login_out' : (bol) => {//登出
			localStorage.removeItem("access");
			dispatch(userLoginOut(bol));
		}
	}
}
export default connect(mapStateToProps,mapDispatchProps)(Home);