import React from "react";

export default class TopicContent extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div>
                        <h2>{this.props.content.title}</h2>
                        <p className="topic_info">
                            <span className="pub_time">.发布于&nbsp;{this.props.content.last_reply_at}</span>
                            <span className="author_name">.作者&nbsp;{this.props.content.author.loginname} </span>
                            <span className="scan_count">.&nbsp;{this.props.content.visit_count}&nbsp;次浏览</span>
                            <span className="parent_cata">.来自&nbsp;{this.props.content.tab}</span>
                        </p>
                        <button type="button" className="btn btn-primary">收藏</button>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            {this.props.content.content}
                        </div>
                        <div className="panel-footer">来自酷炫的 CNodeMD</div>
                    </div>
                </div>
            </div>
        )
    }
}