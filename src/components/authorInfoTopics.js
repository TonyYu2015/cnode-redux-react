import React from "react";
import { Link } from "react-router-dom";

export default function AuthorTopic(props){
        return (
            <li className="list-group-item">
                <span className="badge">
                    <span>最后回复时间：{props._item.last_reply_at.match(/\d{4}-\d{2}-\d{2}/g)}</span>
                </span>
                <p>
                    <Link to={"/authorInfo?userName=" + props._item.author.loginname}><img style={{"borderRadius":"10%"}} src={props._item.author.avatar_url} width="30px" alt=""/></Link>
                    <Link style={{"marginLeft":"10px"}} to={"/topic?topicId=" + props._item.id}>{props._item.title}</Link>
                </p>
            </li>
        )
}