import React from "react";

export default class TopicReply extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        if(!this.props.topicReplys) return null;

        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.topicReplys.replies.length}&nbsp;回复</h3>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {
                            this.props.topicReplys.replies.map((item,index) => {
                                return (<li className="list-group-item" key={index}>
                                            <a href="javascript:;"><img className="protrait" src={item.author.avatar_url} alt="" /></a>
                                            <div>
                                                <p className="reply_info">
                                                    <span>{item.author.loginname}</span>
                                                    <span>1楼.7小时前</span>
                                                    <span className="glyphicon glyphicon-thumbs-up"></span>
                                                    <span className="glyphicon glyphicon-share-alt"></span>
                                                </p>
                                                <p className="reply_content" dangerouslySetInnerHTML = {{__html:item.content}}>
                                                </p>
                                            </div>
                                        </li>)
                            })
                        }

                        
                    </ul>
                </div>
            </div>
        )
    }
} 