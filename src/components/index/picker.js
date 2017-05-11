import React,{ Component } from 'react';

class Picker extends Component{

	render(){
		return (
			<ul className="tags">
				<li><a href="javascript:;" onClick = {this.props.tab}>全部</a></li>
				<li><a href="javascript:;" onClick = {this.props.tab}>精华</a></li>
				<li><a href="javascript:;" onClick = {this.props.tab}>分享</a></li>
				<li><a href="javascript:;" onClick = {this.props.tab}>问答</a></li>
				<li><a href="javascript:;" onClick = {this.props.tab}>招聘</a></li>
			</ul>
		)
	}
}

module.exports = Picker;