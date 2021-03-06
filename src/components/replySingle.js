import React from "react";
import { Link } from "react-router-dom";

import MarkDown from "./markDown";

export default class ReplySingle extends React.Component {
    constructor(props){
        super(props)
        this.replyRender = this.replyRender.bind(this);
    }
    
    replyRender(){
        if(this.props.loginStatus){
            return(
                <span style={{"float":"right"}}>
                    <span className="glyphicon glyphicon-thumbs-up replyUp" style={{"color":this.props.like ? "red" : ""}} onClick={this.props.up}></span>
                    <span className="glyphicon glyphicon-share-alt innerReplyBtn" onClick={this.props.replyClick}></span>
                </span>   
            )
        }
    }

    render(){
        return(
            <li className="list-group-item replies">
                <Link to = {"/authorInfo?userName=" + this.props._item.author.loginname}><img className="protrait" src={this.props._item.author.avatar_url} alt="" /></Link>
                <div>
                    <p className="reply_info">
                        <Link to = {"/authorInfo?userName=" + this.props._item.author.loginname}><span>{this.props._item.author.loginname}</span></Link>
                        <span style={{"marginLeft":"10px"}}>{this.props.index+1}楼.{this.props.replyTime.match(/\d{4}-\d{2}-\d{2}/g)}</span>
                        {this.replyRender()}
                    </p>
                    <p className="reply_content" dangerouslySetInnerHTML = {{__html:this.props._item.content}}>
                    </p>
                </div>
                <div style={{"display" : this.props.innerReply ? "block" : "none"}}>
                    <MarkDown   click = {this.props.postInnerReply} 
                                innerReply = {this.props.innerReply}
                                userName = {this.props._item.author.loginname}
                    />
                </div>
            </li>
        )
    }
}