import React from "react";

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
                        <li className="list-group-item">
                            <a href="javascript:;" className="reply_user">xux9311</a>
                            <span>回复你的话题</span>
                            <a href="javascript:;" className="reply_title">vscode 误点了git里面的全部清理 然后上万个文件全没了，这个有办法恢复么？</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}