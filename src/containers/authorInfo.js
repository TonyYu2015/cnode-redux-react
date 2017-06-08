import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Header from "../components/header";
import Login from "../components/login";
import { getUserInfo_AC } from "../redux/actions/actions.js";

class _AuthorInfo extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { getUserInfo,userInfo } = this.props;
        getUserInfo(userInfo.data.loginname);
    }

    render(){
        const { userInfo,userPersonalInfo,login_out } = this.props;
        if(!userPersonalInfo.success) return null;
        return (
            <div>
                <Header loginStatus = {userInfo.data.success} login_out={login_out}/>
                <div className = "container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="panel panel-default">
                                <div className="panel-heading">主页/</div>
                                <div className="panel-body">
                                    <p>
                                        <span><img src={userPersonalInfo.data.avatar_url} width="50px" alt=""/></span>
                                        <span>{userPersonalInfo.data.loginname}</span>
                                    </p>
                                    <p>{userPersonalInfo.data.score}&nbsp;积分</p>
                                    <p>{userPersonalInfo.data.githubUsername}</p>
                                    <p>{userPersonalInfo.data.create_at}</p>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading">最近创建的话题</div>
                                <div className="panel-body">
                                    <ul className="list-group">
                                        {
        userPersonalInfo.data.recent_topics.map((item,index)=>{
            return (
                <li className="list-group-item" key={index}>
                    <span className="badge">
                        <Link to="">
                            <span><img src={item.author.avatar_url} width="30px" alt=""/></span>
                            <span>创建的时间</span>
                        </Link>
                    </span>
                    <p>
                        <Link to=""><img src={item.author.avatar_url} width="50px" alt=""/></Link>
                        <span>回复数／查看数</span>
                        <Link to="">{item.title}</Link>
                    </p>
                </li>
            )
        })
                                        }
                                        
                                    </ul>
                                    <Link to="">查看更多</Link>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading">最近参与的话题</div>
                                <div className="panel-body">
                                    <ul className="list-group">
                                        {
        userPersonalInfo.data.recent_replies.map((item,index)=>{
            return (
                <li className="list-group-item" key={index}>
                    <span className="badge">
                        <Link to="">
                            <span><img src={item.author.avatar_url} width="30px" alt=""/></span>
                            <span>创建的时间</span>
                        </Link>
                    </span>
                    <p>
                        <Link to=""><img src={item.author.avatar_url} width="50px" alt=""/></Link>
                        <span>回复数／查看数</span>
                        <Link to="">{item.title}</Link>
                    </p>
                </li>
            )
        })
                                        }
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <Login userInfo={userInfo.data} loginStatus = {userInfo.loginStatus}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo : state.appReducer.userInfo,
        userPersonalInfo : state.userInfoS.userInfo
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        getUserInfo : (userName) => {
            dispatch(getUserInfo_AC(userName));
        }
    }
}

const AuthorInfo = connect(mapStateToProps,mapDispatchProps)(_AuthorInfo)

export default AuthorInfo;