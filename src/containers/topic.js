import React from "react";
import { connect } from 'react-redux';
import Header from "../components/header";
import Login from "../components/login";
import TopicContent from "../components/topicContent";
import TopicReply from "../components/topicReply";
import AddReply from "../components/addReply";
import AuthorOtherTopics from "../components/authorOtherTopics";
import ColdTopics from "../components/coldTopics";
import { getTopicContent,addReply } from "../redux/actions/actions.js";

class _Topic extends React.Component {
    constructor(props){
        super(props);
        this.addReply = this.addReply.bind(this);
    }

    componentDidMount(){
        const {fetchTopic,fetchPersonal} = this.props;
        fetchTopic(this.props.match.params.id);
    }

    addReply(){
        const { fetchTopicReply,access } = this.props;
        var $_contentReply = $("#reply_fn").html()//回复的内容主体
        if(!$_contentReply){
            alert("请输入回复内容！！！");
        }
        fetchTopicReply(this.props.match.params.id,access,$_contentReply);
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
                            <AddReply click = {this.addReply}/>
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
        topicContent : state.topicReducer.topicContent,
        topicReply : state.topicReducer.topicReply,
        access : state.appReducer.userInfo.access
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        fetchTopic : (topicId) => {
            dispatch(getTopicContent(topicId));
        },
        fetchTopicReply:(topicId,access,content) => {
            dispatch(addReply(access,content,topicId));
        }
    }
}

const Topic = connect(mapStateToProps,mapDispatchProps)(_Topic);
export default Topic;