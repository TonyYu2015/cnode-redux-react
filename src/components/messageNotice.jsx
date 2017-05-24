import React from "react";

export default class MessageNotice extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title"><span>主页</span>／<span>新消息</span></h3>
                </div>
                <div className="panel-body">
                    无消息
                </div>
            </div>
        )
    }
}