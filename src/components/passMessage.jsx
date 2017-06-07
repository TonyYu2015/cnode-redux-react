import React from "react";
import { Link } from "react-router-dom";

export default class PassMessage extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">过往信息</h3>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                    {
    this.props.passMessages && this.props.passMessages.map((item,index)=>{
        return (
            <li className="list-group-item" key={index}>
                <a href="javascript:;" className="reply_user">{item.reply.id}</a>
                <span>&nbsp;&nbsp;回复你的话题&nbsp;&nbsp;</span>
                <Link to={"/topic/" + item.topic.id} className="reply_title">{item.topic.title}</Link>
            </li>
        )
    })
                    }
                    </ul>
                </div>
            </div>
        )
    }
}