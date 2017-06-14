import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import Header from "../components/header";
import Login from "../components/login";
import AuthorTopic from "../components/authorInfoTopics"

import { getUserInfo_AC } from "../redux/actions/actions.js";


class AuthorInfo extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { getUserInfo } = this.props;
        var searchStr = this.props.location.search
        var userName = searchStr.substr(searchStr.indexOf("=")+1);
        getUserInfo(userName);
    }

    render(){
        const { userInfo,login_out } = this.props;
        if(!userInfo.data) return null;
        return (
            <div>
                <Header loginStatus = {userInfo.loginStatus} login_out={login_out}/>
                <div style={{'padding':'15px'}} className = "container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="panel panel-default">
                                <div className="panel-heading">主页/</div>
                                <div className="panel-body">
                                    <p>
                                        <span><img src={userInfo.data.avatar_url} width="50px" alt=""/></span>
                                        <span>{userInfo.data.loginname}</span>
                                    </p>
                                    <p>{userInfo.data.score}&nbsp;积分</p>
                                    <p>{userInfo.data.githubUsername}</p>
                                    <p>注册时间：{userInfo.data.create_at.match(/\d{4}-\d{2}-\d{2}/g)}</p>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading">最近创建的话题</div>
                                <div className="panel-body">
                                    <ul className="list-group">
                                        {
                                userInfo.data.recent_topics.map((item,index)=>{
                                    return (
                                        <AuthorTopic _item = {item} key={index}/> 
                                    )
                                })
                                        }
                                        
                                    </ul>
                                    <Link to="/">查看更多</Link>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading">最近参与的话题</div>
                                <div className="panel-body">
                                    <ul className="list-group">
                                        {
                                userInfo.data.recent_replies.map((item,index)=>{
                                    return (
                                        <AuthorTopic _item = {item} key={index}/> 
                                    )
                                })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <Login userInfo={userInfo.data}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo : state.userInfo
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        getUserInfo : (userName) => {
            dispatch(getUserInfo_AC(userName));
        },
        login_out : (bol) => {//登出
			dispatch(userLoginOut(bol));
		}
    }
}

export default connect(mapStateToProps,mapDispatchProps)(AuthorInfo);
