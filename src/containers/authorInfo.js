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
        const { userInfo } = this.props;

        return (
            <div>
                <Header />
                <div className = "container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="panel panel-default">
                                <div className="panel-heading">主页/</div>
                                <div className="panel-body">
                                    <p>
                                        <span>头像</span>
                                        <span>名字</span>
                                    </p>
                                    <p>60&nbsp;积分</p>
                                    <p>github地址</p>
                                    <p>注册时间</p>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading">最近创建的话题</div>
                                <div className="panel-body">
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <span className="badge">
                                                <Link to="">
                                                    <span>头像</span>
                                                    <span>创建的时间</span>
                                                </Link>
                                            </span>
                                            <p>
                                                <Link to="">头像</Link>
                                                <span>回复数／查看数</span>
                                                <Link to="">主题题目</Link>
                                            </p>
                                        </li>
                                    </ul>
                                    <Link to="">查看更多</Link>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading">最近参与的话题</div>
                                <div className="panel-body">
                                    Panel content
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
        userInfo : state.appReducer.userInfo
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