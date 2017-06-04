import React from "react";
import { Link } from "react-router-dom";

export default class TopicContent extends React.Component {
    constructor(props){
        super(props)
    }

    render(){

        if(!this.props.content) return null;

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div>
                        <h2>{this.props.content.title}</h2>
                        <div style = {{"overflow":"hidden"}}>
                            <p className="topic_info" style = {{"float":"left"}}>
                                <span className="pub_time">.发布于&nbsp;{this.props.content.last_reply_at}</span>
                                <Link className="author_name" to={"/authotInfo"}>.作者&nbsp;{this.props.content.author.loginname} </Link>
                                <span className="scan_count">.&nbsp;{this.props.content.visit_count}&nbsp;次浏览</span>
                                <span className="parent_cata">.来自&nbsp;{this.props.content.tab}</span>
                            </p>
                            <button type="button" className="btn btn-primary" style = {{"float":"right"}} onClick={this.props.click}>收藏</button>
                        </div>
                        <p style = {{"paddingLeft":"10px"}}>
                            <Link to="/pubTopic"><span style = {{"margin":"0 5px"}} className="glyphicon glyphicon-edit"></span></Link>
                            <Link to=""><span className="glyphicon glyphicon-trash" onClick={this.props.delete}></span></Link>
                            
                        </p>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-body content" dangerouslySetInnerHTML = {{__html:this.props.content.content}}>
                        </div>
                        <div className="panel-footer">来自酷炫的 CNodeMD</div>
                    </div>
                </div>
            </div>
        )
    }
}