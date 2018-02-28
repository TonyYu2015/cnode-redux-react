import React from "react";
import { connect } from 'react-redux';
import Header from "../components/header";
import Login from "../components/login";
import TopicContent from "../components/topicContent";
import ReplySingle from "../components/replySingle";
import AddReply from "../components/addReply";
import AuthorOtherTopics from "../components/authorOtherTopics";
import ColdTopics from "../components/coldTopics";
import { getTopicContent,addReply,topicCollection,topicCollectionRequest,deleteTopic,postDelete,replyUp,postReplyUp,innerReply } from "../redux/actions/actions.js";

class Topic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            topicId : null
        }
        this.addReply = this.addReply.bind(this);
        this.collection = this.collection.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.replyUp = this.replyUp.bind(this);
        this.innerReplys = this.innerReplys.bind(this); 
    }

    componentDidMount(){
        const {fetchTopic} = this.props;
        var searchStr = this.props.location.search;
        var topicId = searchStr.substr(searchStr.indexOf("=")+1);
        this.setState({
            topicId : topicId
        });
        fetchTopic(topicId);
    }

    addReply(ev){//添加回复
        const { fetchTopicReply,access,isInnerReply,replies } = this.props;
        var $_contentReply = isInnerReply ? $(".markdown").text() : $("#reply_fn").val()//回复的内容主体
        var index = $(".replies").index(ev.target);//回复的索引
        var replyId = index === -1 ? null : replies[index].id;
        if(!$_contentReply){
            alert("请输入回复内容！！！");
            return;
        }
        fetchTopicReply(access,$_contentReply,this.state.topicId,replyId);
        
    }

    collection(){//收藏主题
        const { topicCollection,access } = this.props;
        topicCollection(access,this.state.topicId);
    }

    deleteTopic(){//删除主题
        const { deleteTopic,access } = this.props;
        deleteTopic(access,this.state.topicId);
    }

    replyUp(ev){//给评论点赞
        const { replyUps,access,replies,likes } = this.props;
        console.log(JSON.parse(JSON.stringify(likes)));
        var index = $(".replyUp").index(ev.target);
        replyUps(access,replies[index].id);
    }

    innerReplys(ev){//回复评论
        const { innerReply,replies,innerReplyStatus } = this.props;
        var index = $(".innerReplyBtn").index(ev.target);//回复的索引
        var f;
        if(innerReplyStatus){
            f = innerReplyStatus[replies[index].id];
        }else{
            f = false;
        }
        innerReply(replies[index].id,!f);
    }

    render(){
        const { topicContent,innerReply,innerReplyData,userInfo,likes,login_out,innerReplyStatus } = this.props;

        let editAndDelete = false;
        if(userInfo.loginStatus && topicContent){
            editAndDelete = topicContent.author_id === userInfo.loginData.id;
        }

        return(
            <div>
                <Header loginStatus = {userInfo.loginStatus} login_out={login_out}/>
                <div id="main" style={{'padding':'15px'}} className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <TopicContent   content = {topicContent} 
                                            click={this.collection} 
                                            delete={this.deleteTopic} 
                                            loginStatus = {userInfo.loginStatus}
                                            editAndDelete = { editAndDelete }
                            />
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">{topicContent && topicContent.replies.length}&nbsp;回复</h3>
                                </div>
                                <div className="panel-body">
                                    <ul className="list-group">
                                        {
            topicContent && topicContent.replies.map((item,index) => {
                return <ReplySingle topicReplys = {topicContent.data} 
                                    loginStatus = {userInfo.loginStatus}
                                    up = {this.replyUp} 
                                    replyClick={this.innerReplys}
                                    postInnerReply = {this.addReply} 
                                    _item = {item}
                                    like = {likes && likes[item.id]}
                                    innerReply = {innerReplyStatus &&  innerReplyStatus[item.id]}
                                    index = {index}
                                    replyTime = {item.create_at}
                                    key={index}
                        />
            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <AddReply   click = {this.addReply}
                                        loginStatus = {userInfo.loginStatus}
                            />
                        </div>
                        <div className="col-lg-3">
                            <Login loginData={topicContent}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        'topicContent' : state.topic.topicContent,
        'topicReply' : state.topic.topicReply,
        'access' : state.userInfo.accessToken,
        'deleteTopic': state.topic.postDeleteTopic,
        'upState' : state.topic.replyUps,
        'replies' : state.topic.topicContent && state.topic.topicContent.replies,
        'userInfo' : state.userInfo,
        'likes' : state.topic.likes,
        'innerReplyStatus' : state.topic.innerReply,
        'isInnerReply' : state.topic.isInnerReply,
        'upAction' : state.topic.upAction
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        fetchTopic : (topicId) => {
            dispatch(getTopicContent(topicId));
        },
        fetchTopicReply:(access,content,topicId) => {
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
        innerReply : (replyId,bol) => {
            dispatch(innerReply(replyId,bol));
        },
        login_out : (bol) => {//登出
			dispatch(userLoginOut(bol));
		}
    }
}

export default connect(mapStateToProps,mapDispatchProps)(Topic);