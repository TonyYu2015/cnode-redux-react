import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            'value' : "e6f04880-2ab1-4398-8178-e0898e6a8af1" 
        }
        this.change = this.change.bind(this);
    }

    change(event){
        this.setState({
            'value' : event.target.value
        });
    }

    render(){
        if(this.props.userInfo && this.props.loginStatus){
            return (
                <div>
                    <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">个人信息</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="author_info">
                                        <Link to = "/authorInfo"><img src={this.props.userInfo.avatar_url} width="50px" alt=""/></Link>
                                        <Link to = "/authorInfo">{this.props.userInfo.loginname}</Link>
                                    </div>
                                    <p>积分：5</p>
                                    <p>“ 这家伙很懒，什么个性签名都没有留下。 ”</p>
                                </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <button type="button" className="btn btn-success"><Link to= "/pubTopic">发布话题</Link></button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="login">
                    <p>通过accessToken登录</p>
                    <input className="access" id="access" type="text" onChange={this.change} value={this.state.value} />
                    <input className="btn" type="button" value="登录" onClick = {this.props.click}/>
                </div>
            )
        }
        
    }
}

export default Login;