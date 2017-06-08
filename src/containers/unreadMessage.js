import React from "react";
import { connect } from "react-redux";
import Header from "../components/header";
import MessageNotice from "../components/messageNotice";
import PassMessage from "../components/passMessage";
import Login from "../components/login";
import { getUserMessages } from "../redux/actions/actions.js";

class _UnreadMessage extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { getMessages,access } = this.props;
        getMessages(access);
    }

    render(){
        const { messages,userInfo } = this.props;
        return(
            <div>
                <Header loginStatus = {userInfo.data.success}/>
                <div id="main" className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <MessageNotice unreadMessages = {messages && messages.hasnot_read_messages}/>
                            <PassMessage passMessages = {messages &&  messages.has_read_messages}/>
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
        access : state.appReducer.userInfo.access,
        messages : state.messagesCenter.unreadMessages,
        userInfo : state.appReducer.userInfo
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        getMessages: (access,mdrender) => {
            dispatch(getUserMessages(access,mdrender));
        }
    }
}

const UnreadMessage = connect(mapStateToProps,mapDispatchProps)(_UnreadMessage);

export default UnreadMessage;