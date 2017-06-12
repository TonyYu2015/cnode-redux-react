import React from "react";
import { connect } from 'react-redux';
import { pubTopicRequest,isPublishClick } from '../redux/actions/actions.js'
import Header from "../components/header";
import TopicCatagory from "../components/topicCatagory";
import MarkDown from "../components/markDown";

class PubTopic extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title:"",
            tab:"",
            content:"",
            published:false
        }
        this.publishFn = this.publishFn.bind(this);
        this.afterPublish = this.afterPublish.bind(this);
    }

    publishFn(){
        const { publish,access,publishClick } = this.props;
        if(this.state.title === ""){
            alert("标题内容不能为空哦！！！");
            return;
        }else if(this.state.tab === ""){
            alert("请选择发布主题的分类！！！");
            return;
        }else if(this.state.content === ""){
            alert("主题内容不能为空哦！！！");
            return;
        }
        publish(access,this.state);
    }

    afterPublish(){
        const { isPublished,publishClick } = this.props;
        publishClick(false);
        if(isPublished){
            alert("主题发布成功!!!");
            this.props.history.push("/");
            return null;
        }else{
            alert("主题发布失败!!!");
        }
    }

    componentDidMount(){
        var This = this;
        const {topicContent } = this.props;
        if(this.props.match.params.status === "edit"){
            let tab;
            switch(topicContent.data.tab){
                case 'share':
                    tab = '分享';
                    break;
                case 'ask':
                    tab = '问答';
                    break;
                case 'job':
                    tab = '招聘';
                    break;
                case 'dev':
                    tab = '客户端测试';
                    break;
            }
            $("#dropdownMenu1").html(tab);
            $(".topic-title").val(topicContent.data.title);
            $(".markdown").html(topicContent.data.content.match(/<p.*>.*(?=<\/p>)/g));
        }

        //绑定获取标题，标签，主题内容事件
        $(".dropdown-menu").find("li").on("click",function(ev){ 
            $("#dropdownMenu1").html($(this).html());
            var tag;
            switch($(this).text()){
                case '分享':
                    tag = 'share';
                    break;
                case '问答':
                    tag = 'ask';
                    break;
                case '招聘':
                    tag = 'job';
                    break;
                case '客户端测试':
                    tag = 'dev';
                    break;
            }
            This.setState({
                tab : tag
            });
        });

        $(".topic-title").on("blur",function(){
            This.setState({
                title : $(this).val()
            });
        });

        $(".markdown").on("blur",function(){
            This.setState({
                content : $(this).html()
            });
        });
    }

    render(){
        const { userInfo,login_out,published } = this.props;
        if(published){
            this.afterPublish();
        }
        return(
            <div>
                <Header loginStatus = {userInfo.loginStatus} login_out={login_out}/>
                <div id="main" className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="panel panel-default">
                                <TopicCatagory />
                                <MarkDown click = {this.publishFn}/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        'access' : state.userInfo.accessToken,
        'topicStatus' : state.pubTopic.topicStatus,
        'userInfo' : state.userInfo,
        'isPublished' : state.pubTopic.data && state.pubTopic.data.success,
        'published' : state.pubTopic.published
    }
}

const mapDispatchPorps = (dispatch) => {
    return {
        publish : (access,data) => {
            dispatch(pubTopicRequest(access,data));
        },
        login_out : (bol) => {//登出
			dispatch(userLoginOut(bol));
		},
        publishClick : (bol) => {
            dispatch(isPublishClick(bol));
        }
    }
}

export default connect(mapStateToProps,mapDispatchPorps)(PubTopic);