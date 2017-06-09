import React from "react";
import MarkDown from "./markDown.jsx";

export default class ReplySingle extends React.Component {
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <li className="list-group-item replies">
                <a href="javascript:;"><img className="protrait" src={this.props._item.author.avatar_url} alt="" /></a>
                <div>
                    <p className="reply_info">
                        <span>{this.props._item.author.loginname}</span>
                        <span>1楼.7小时前</span>
                        <span style={{"float":"right"}} className="glyphicon glyphicon-share-alt" onClick={this.props.replyClick}></span>
                        <span className="glyphicon glyphicon-thumbs-up replyUp" style={{"color":this.props.like ? "red" : "none","float":"right"}} onClick={this.props.up}></span>
                    </p>
                    <p className="reply_content" dangerouslySetInnerHTML = {{__html:this.props._item.content}}>
                    </p>
                </div>
                <div style={{"display" : this.props.replyState ? "block" : "none"}}>
                    <MarkDown click = {this.props.postInnerReply}/>
                </div>
            </li>
        )
    }
}