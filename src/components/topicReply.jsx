import React from "react";

export default class TopicReply extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">5&nbsp;回复</h3>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <a href="javascript:;"><img src="./images/26316854.jpeg" alt="" /></a>
                            <div>
                                <p className="reply_info">
                                    <span>nasapalyer</span>
                                    <span>1楼.7小时前</span>
                                    <span className="glyphicon glyphicon-thumbs-up"></span>
                                    <span className="glyphicon glyphicon-share-alt"></span>
                                </p>
                                <p className="reply_content">
                                    先把es5掌握再说吧。。踩坑容易有挫败感先把es5掌握再说吧。。踩坑容易有挫败感先把es5掌握再说吧。。踩坑容易有挫败感
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
} 