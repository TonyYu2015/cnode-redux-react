import React, { Component } from 'react';

class Posts extends Component {
	render(){
			return (
				<ul className="lists">
					{	this.props.posts.map(function(post,index){
						return(
							<li key={index}>
								<a className="author-portrait" href="javascript:;"><img src={post.author.avatar_url}/></a>
								<span className="reply-read">
									<span className="reply">{post.reply_count}</span>/<span className="read">{post.visit_count}</span>
								</span>
								<p className="list-title">
									<span className="good-tag">{post.tab}</span>
									<a className="title" href="javascript:;">{post.title}</a>
								</p>
								<a className="latest-update" href="javascript:;">
									<img className="portrait" src={post.latestReplierImg}/>
									<span className="time">{post.last_reply_at}</span>
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