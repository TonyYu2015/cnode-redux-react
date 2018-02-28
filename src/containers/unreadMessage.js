import React from "react";
import { connect } from "react-redux";
import Header from "../components/header";
import MessageNotice from "../components/messageNotice";
import PassMessage from "../components/passMessage";
import Login from "../components/login";
import { getUserMessages } from "../redux/actions/actions";

class UnreadMessage extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { getMessages,access } = this.props;
        if(!access) this.props.history.push("/");
        getMessages(access);
    }

    render(){
        const { messages,userInfo,login_out } = this.props;
        return(
            <div>
                <Header loginStatus = {userInfo.loginStatus} login_out={login_out}/>
                <div id="main" style={{'padding':'15px'}} className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <MessageNotice unreadMessages = {messages && messages.hasnot_read_messages}/>
                            <PassMessage passMessages = {messages &&  messages.has_read_messages}/>
                        </div>
                        <div className="col-lg-3">
                            <Login  loginData={userInfo.loginData} 
								    loginStatus = {userInfo.loginStatus}
                                    personal = { true }
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        access : state.userInfo.accessToken,
        messages : state.messagesCenter.unreadMessages,
        userInfo : state.userInfo
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        getMessages: (access,mdrender) => {
            dispatch(getUserMessages(access,mdrender));
        },
        login_out : (bol) => {//登出
			dispatch(userLoginOut(bol));
		}
    }
}

export default connect(mapStateToProps,mapDispatchProps)(UnreadMessage);