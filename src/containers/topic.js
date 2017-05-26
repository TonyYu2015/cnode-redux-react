import React from "react";
import { connect } from 'react-redux';
import Header from "../components/header";
import Login from "../components/login";
import TopicContent from "../components/topicContent";
import TopicReply from "../components/topicReply";
import AddReply from "../components/addReply";
import AuthorOtherTopics from "../components/authorOtherTopics";
import ColdTopics from "../components/coldTopics";
import { getTopicContent } from "../redux/actions/actions.js";

class _Topic extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {fetchTopic,fetchPersonal} = this.props;
        fetchTopic(this.props.match.params.id);
    }

    render(){
        const { topicContent } = this.props;
        // if(!topicContent && !topicContent.success){
        //     alert("主题无内容！！！");
        // }
        return(
            <div>
                <Header />
                <div id="main" className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <TopicContent content = {topicContent.data}/>
                            <TopicReply topicReplys = {topicContent.data}/>
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

const mapStateToProps = (state) => {
    return {
        topicContent : state.topicReducer.topicContent
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        fetchTopic : (topicId) => {
            dispatch(getTopicContent(topicId));
        }
    }
}

const Topic = connect(mapStateToProps,mapDispatchProps)(_Topic);
export default Topic;