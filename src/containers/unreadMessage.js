import React from "react";
import Header from "../components/header";
import MessageNotice from "../components/messageNotice";
import PassMessage from "../components/passMessage";
import Login from "../components/login";

export default class UnreadMessage extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Header />
                <div id="main" className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <MessageNotice />
                            <PassMessage />
                        </div>
                        <div className="col-lg-3">
                            <Login />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}