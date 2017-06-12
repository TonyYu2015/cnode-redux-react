import React,{ Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component{
	constructor(props){
		super(props)
		this.loginOut = this.loginOut.bind(this);
	}

	//登出功能
	loginOut(ev){
		let per = confirm("确认是否退出？");
		if(per){
			this.props.login_out(false);
		}
		ev.preventDefault();
	}


	render(){
		return (
			<div id="header">
				<div className="wrapper">
					<ul className="nav nav-pills main-nav">
						<li role="presentation" className="active"><Link to="/">首页</Link></li>
						<li style={{display:this.props.loginStatus ? "block" : "none"}} role="presentation"><Link to="/unreadMessage">未读消息</Link></li>
						<li style={{display:this.props.loginStatus ? "block" : "none"}} role="presentation"><Link to="/" onClick={this.loginOut}>退出</Link></li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Header;