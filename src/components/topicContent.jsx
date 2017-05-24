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
                        <h2>新人，想问一下现在es6是不是有兼容问题？新人学es6有必要吗？</h2>
                        <p className="topic_info">
                            <span className="pub_time">.发布于&nbsp;8小时前</span>
                            <span className="author_name">.作者&nbsp;chocolateback </span>
                            <span className="scan_count">.&nbsp;121&nbsp;次浏览</span>
                            <span className="parent_cata">.来自&nbsp;问答</span>
                        </p>
                        <button type="button" className="btn btn-primary">收藏</button>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            新人，想问一下现在es6是不是有兼容问题？新人学es6有必要吗？新人，想问一下现在es6是不是有兼容问题？新人学es6有必要吗？新人，想问一下现在es6是不是有兼容问题？新人学es6有必要吗？新人，想问一下现在es6是不是有兼容问题？新人学es6有必要吗？
                        </div>
                        <div className="panel-footer">来自酷炫的 CNodeMD</div>
                    </div>
                </div>
            </div>
        )
    }
}