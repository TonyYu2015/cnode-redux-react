import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Posts extends Component {

	render(){
		var This = this;
			return (
				<ul className="lists">
					{	this.props.posts.map(function(post,index){

						let tabs = [];
						if(post.top === true){
							tabs.push({
								bg:"blue",
								color:"white",
								tabName:"置顶"
							});
						}
						if(post.good === true){
							tabs.push({
								bg:"green",
								color:"white",
								tabName:"精华"
							});
						}
						if(!This.props.bol){
							switch(post.tab){
								case "ask":
									tabs.push({
									bg:"#ccc",
									color:"white",
									tabName:"问答"
								});
									break;
								case "share":
									tabs.push({
									bg:"#ccc",
									color:"white",
									tabName:"分享"
								});
									break;
								case "job":
									tabs.push({
									bg:"#ccc",
									color:"white",
									tabName:"招聘"
								});
									break;
								case "dev":
									tabs.push({
									bg:"#ccc",
									color:"white",
									tabName:"客户端测试"
								});
									break;
							}
						}

						return(
							<li key={index}>
								<a className="author-portrait" href="javascript:;"><img src={post.author.avatar_url}/></a>
								<span className="reply-read">
									<span className="reply">{post.reply_count}</span>/<span className="read">{post.visit_count}</span>
								</span>
								<p className="list-title" style={{"width":"80%"}}>
									{
									tabs.map((item,index)=>{
										return <span style={{"background":item.bg,"color":item.color,"marginRight":"5px"}} className="good-tag" key={index}>{item.tabName}</span>
									})
									}
									<Link className="title" to={"/topic/" + post.id} style={{"display":"inline-block","width":"70%","overflow":"hidden","whiteSpace":"nowrap","textOverflow":"ellipsis"}}>{post.title}</Link>
								</p>
								<a className="latest-update" href="javascript:;">
									<span className="time">最后回复时间：{post.last_reply_at.match(/\d{4}-\d{2}-\d{2}/g)}</span>
								</a>
							</li>
							)
						})
					}
				</ul>
			)
	}
}

module.exports = Posts;