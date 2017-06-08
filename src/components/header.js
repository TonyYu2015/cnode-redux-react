import React,{ Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component{
	constructor(props){
		super(props)
		this.loginOut = this.loginOut.bind(this);
	}

	//登出功能
	loginOut(){
		let per = confirm("确认是否退出？");
		if(per){
			this.props.login_out(false);
		}
	}


	render(){
		return (
			<div id="header">
				<div className="wrapper">
					<ul className="main-nav">
						<li><Link to="/">首页</Link></li>
						<li style={{display:this.props.loginStatus ? "block" : "none"}}><Link to="/unreadMessage">未读消息</Link></li>
						<li><a href="javascript:;" onClick={this.loginOut}>退出</a></li>
					</ul>
				</div>
			</div>
		)
	}
}

module.exports = Header;