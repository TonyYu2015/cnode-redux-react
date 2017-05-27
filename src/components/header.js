import React,{ Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component{
	render(){
		return (
			<div className="wrapper">
				<ul className="main-nav">
					<li><a href="javascript:;">首页</a></li>
					<li><Link to="/unreadMessage">未读消息</Link></li>
					<li><a href="javascript:;">新手入门</a></li>
					<li><a href="javascript:;">API</a></li>
					<li><a href="javascript:;">关于</a></li>
					<li><a href="javascript:;">注册</a></li>
					<li><a href="javascript:;">登录</a></li>
				</ul>
			</div>
		)
	}
}

module.exports = Header;