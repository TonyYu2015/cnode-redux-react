import React from "react";

export default class AuthorOtherTopics extends React.Component{
    constructor(prosp){
        super(props)
    }
    
    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">作者其他话题</h3>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        <li className="list-group-item"><a href="javascript:;">关于定时模块,除了内容中2个还有什么推荐吗。</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}