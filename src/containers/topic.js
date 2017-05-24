import React from "react";
import { connect } from 'react-redux';
import Header from "../components/header";
import Login from "../components/login";
import TopicContent from "../components/topicContent";
import TopicReply from "../components/topicReply";
import AddReply from "../components/addReply";
import AuthorOtherTopics from "../components/authorOtherTopics";
import ColdTopics from "../components/coldTopics";


class _Topic extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Header />
                <div id="main" className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <TopicContent />
                            <TopicReply />
                            <AddReply />
                        </div>
                        <div className="col-lg-3">
                            <Login />
                            <div className="ad"></div>
                            <AuthorOtherTopics />
                            <ColdTopics />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const Topic = connect()(_Topic);
export default Topic;