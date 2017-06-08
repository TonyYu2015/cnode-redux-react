import React from "react";
import { connect } from 'react-redux';
import { pubTopicRequest } from '../redux/actions/actions.js'
import Header from "../components/header";
import TopicCatagory from "../components/topicCatagory";
import MarkDown from "../components/markDown";

class PubReply extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title:"",
            tab:"",
            content:"",
            published:false
        }
        this.publishFn = this.publishFn.bind(this);
    }

    publishFn(){
        const { publish,access } = this.props;

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

        this.setState({
            published:true
        });
        publish(access,this.state);
    }

    componentDidMount(){
        var This = this;
        const { editTopic,topicContent } = this.props;
        if(editTopic){
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
            $(".markdown").val(topicContent.data.content.match(/<p.*>.*(?=<\/p>)/g));
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
                content : $(this).val()
            });
        });
        
    }

    render(){
        const { userInfo,login_out } = this.props;
        return(
            <div>
                <Header loginStatus = {userInfo.data.success} login_out={login_out}/>
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
        'success' : state.pubTopics.success,
        'access' : state.appReducer.userInfo.access,
        'editTopic' : state.topicReducer.editTopic,
        'topicContent':state.topicReducer.topicContent,
        'userInfo' : state.appReducer.userInfo
    }
}

const mapDispatchPorps = (dispatch) => {
    return {
        'publish' : (access,data) => {
            dispatch(pubTopicRequest(access,data));
        }
    }
}

const PubTopic = connect(mapStateToProps,mapDispatchPorps)(PubReply);
export default PubTopic;