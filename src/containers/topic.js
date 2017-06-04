import React from "react";
import { connect } from 'react-redux';
import Header from "../components/header";
import Login from "../components/login";
import TopicContent from "../components/topicContent";
import TopicReply from "../components/topicReply";
import AddReply from "../components/addReply";
import AuthorOtherTopics from "../components/authorOtherTopics";
import ColdTopics from "../components/coldTopics";
import { getTopicContent,addReply,topicCollection,topicCollectionRequest,deleteTopic,postDelete,replyUp,postReplyUp } from "../redux/actions/actions.js";

class _Topic extends React.Component {
    constructor(props){
        super(props);
        this.addReply = this.addReply.bind(this);
        this.collection = this.collection.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.replyUp = this.replyUp.bind(this);
    }

    componentDidMount(){
        const {fetchTopic,fetchPersonal} = this.props;
        fetchTopic(this.props.match.params.id);
    }

    addReply(){
        const { fetchTopicReply,access } = this.props;
        var $_contentReply = $("#reply_fn").val()//回复的内容主体
        if(!$_contentReply){
            alert("请输入回复内容！！！");
        }
        fetchTopicReply(this.props.match.params.id,access,$_contentReply);
    }

    collection(){
        const { topicCollection,access } = this.props;
        topicCollection(access,this.props.match.params.id);
    }

    deleteTopic(){
        const { deleteTopic,access } = this.props;
        deleteTopic(access,this.props.match.params.id);
    }

    replyUp(){
        const { replyUps,upState,access,replyId } = this.props;
        replyUps(access,replyId);
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
                            <TopicContent content = {topicContent.data} click={this.collection} delete={this.deleteTopic}/>
                            <TopicReply topicReplys = {topicContent.data}up = {this.replyUp}/>
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
        access : state.appReducer.userInfo.access,
        deleteTopic: state.topicReducer.deleteTopic.postDeleteTopic,
        upState : state.topicReducer.replyUps.upState
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        fetchTopic : (topicId) => {
            dispatch(getTopicContent(topicId));
        },
        fetchTopicReply:(topicId,access,content) => {
            dispatch(addReply(access,content,topicId));
        },
        topicCollection: (access,topicId)=>{
            dispatch(topicCollection(true));
            dispatch(topicCollectionRequest(access,topicId));
        },
        deleteTopic: (access,topicId)=>{
            dispatch(deleteTopic(false));
            dispatch(postDelete(access,topicId));
        },
        replyUps: (access,replyId) => {
            dispatch(replyUp(true));
            dispatch(postReplyUp(access,replyId));
        }
    }
}

const Topic = connect(mapStateToProps,mapDispatchProps)(_Topic);
export default Topic;