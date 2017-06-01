import React from "react";

export default class AddReply extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">添加回复</h3>
                </div>
                <div className="panel-body">
                    <textarea name="reply" id="reply_fn" cols="80" rows="10"></textarea>
                    <button type="button" className="btn btn-primary" onClick={this.props.click}>回复</button>
                </div>
            </div>
        )
    }
}