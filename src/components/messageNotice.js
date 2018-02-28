import React from "react";

export default class MessageNotice extends React.Component{
    constructor(props){
        super(props)
        this.newMessage = this.newMessage.bind(this);
    }

    newMessage(){
        if(!this.props.passMessages){
            return "无消息";
        }else{
            return <ul className="list-group">
                {this.props.passMessages.map((item,index)=>{
                    return (
                       <li className="list-group-item" key={index}>
                            <Link to = {"/authorInfo?userName=" + item.author.loginname} className="reply_user"><img src={item.author.avatar_url} width="30px"/></Link>
                            <span>&nbsp;&nbsp;回复你的话题&nbsp;&nbsp;</span>
                            <Link to={"/topic?topicId=" + item.topic.id} className="reply_title">{item.topic.title}</Link>
                        </li>
                    )
                })}
            </ul>
        }
    }

    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title"><span>主页</span>／<span>新消息</span></h3>
                </div>
                <div className="panel-body">
                    {this.newMessage()}
                </div>
            </div>
        )
    }
}