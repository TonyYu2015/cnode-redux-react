import React from "react";
import { connect } from 'react-redux';
import Header from "../components/header";
import Login from "../components/login";
import TopicContent from "../components/topicContent";
import ReplySingle from "../components/replySingle.jsx";
// import TopicReply from "../components/topicReply";
import AddReply from "../components/addReply";
import AuthorOtherTopics from "../components/authorOtherTopics";
import ColdTopics from "../components/coldTopics";
import { getTopicContent,addReply,topicCollection,topicCollectionRequest,deleteTopic,postDelete,replyUp,postReplyUp,innerReply } from "../redux/actions/actions.js";

class _Topic extends React.Component {
    constructor(props){
        super(props);
        this.addReply = this.addReply.bind(this);
        this.collection = this.collection.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.replyUp = this.replyUp.bind(this);
        this.innerReplys = this.innerReplys.bind(this);
    }

    componentDidMount(){
        const {fetchTopic,fetchPersonal,topicContent} = this.props;
        fetchTopic(this.props.match.params.id);
    }

    addReply(){//添加回复
        const { fetchTopicReply,access,innerReply,replies } = this.props;
        var $_contentReply = innerReply ? $(".markdown").val : $("#reply_fn").val()//回复的内容主体
        var index = $(".replies").index(ev.target);//回复的索引
        if(!$_contentReply){
            alert("请输入回复内容！！！");
        }
        fetchTopicReply(this.props.match.params.id,access,$_contentReply,replies[index].id);
    }

    collection(){//收藏主题
        const { topicCollection,access } = this.props;
        topicCollection(access,this.props.match.params.id);
    }

    deleteTopic(){//删除主题
        const { deleteTopic,access } = this.props;
        deleteTopic(access,this.props.match.params.id);
    }

    replyUp(ev){//给评论点赞
        const { replyUps,upState,access,replies } = this.props;
        var index = $(".replyUp").index(ev.target);
        replyUps(access,replies[index].id);
    }

    innerReplys(ev){//回复评论
        const { innerReply } = this.props;
        var index = $(".replies").index(ev.target);//回复的索引
        innerReply(index,true);
    }

    render(){
        const { topicContent,innerReply,innerReplyData,userInfo } = this.props;
        return(
            <div>
                <Header />
                <div id="main" className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <TopicContent content = {topicContent.data} click={this.collection} delete={this.deleteTopic}/>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">{topicContent.data && topicContent.data.replies.length}&nbsp;回复</h3>
                                </div>
                                <div className="panel-body">
                                    <ul className="list-group">
                                        {
    topicContent.data && topicContent.data.replies.map((item,index) => {
        return <ReplySingle topicReplys = {topicContent.data} up = {this.replyUp} replyClick={this.innerReplys} replyState = {topicContent.replyStates[index]} postInnerReply = {this.addReply} _item = {item} _upState = {topicContent.upStates[index]}  key={index}/>
    })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <AddReply click = {this.addReply}/>
                        </div>
                        <div className="col-lg-3">
                            <Login userInfo={userInfo.data}/>
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
        upState : state.topicReducer.replyUps.data.action,
        replies : state.topicReducer.topicContent.data &&state.topicReducer.topicContent.data.replies,
        innerReply : state.topicReducer.innerReply,
        innerReplyData : state.topicReducer.innerReply.data,
        userInfo : state.appReducer.userInfo
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
        },
        innerReply : (index,bol) => {
            dispatch(innerReply(index,bol));
        }
    }
}

const Topic = connect(mapStateToProps,mapDispatchProps)(_Topic);
export default Topic;