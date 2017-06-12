import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            'value' : "e6f04880-2ab1-4398-8178-e0898e6a8af1" 
        }
        this.change = this.change.bind(this);
        this.userSuccess = this.userSuccess.bind(this);
    }

    change(event){
        this.setState({
            'value' : event.target.value
        });
    }

    userSuccess(data,isPersonal){
        return (
                <div>
                    <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">{isPersonal ? "个人信息" : "作者"}</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="author_info">
                                        <Link to = {"/authorInfo?userName=" + data.loginname}>
                                            <img src={data.avatar_url} width="50px" alt=""/>
                                        </Link>
                                        <Link to = {"/authorInfo?userName=" + data.loginname}>{data.loginname}</Link>
                                    </div>
                                </div>
                                <button style={{"display":isPersonal ? "block" : "none"}} type="button" className="btn btn-success"><Link to= "/pubTopic/pub">发布话题</Link></button>
                    </div>
                </div>
                )
    }

    render(){
        if(this.props.personal){
            if(this.props.loginStatus  && this.props.loginData ){
                return this.userSuccess(this.props.loginData,true);
            }else{
                return (
                    <div className="panel panel-default">
                        <div className="panel-body login">
                            <input type="text" id="access" className="form-control " placeholder="Username" aria-describedby="basic-addon1" value={this.state.value} onChange={this.change}/>
                            <button style={{'height': '35px','width': '100px','marginTop': '10px'}} className="btn btn-primary" onClick = {this.props.click}>登录</button>
                        </div>
                    </div>

                    // <div className="login">
                    //     <p>通过accessToken登录</p>
                    //     <input className="access" id="access" type="text" onChange={this.change} value={this.state.value} />
                    //     <input className="btn" type="button" value="登录" onClick = {this.props.click}/>
                    // </div>
                )
            }

        } else {
            if(!this.props.loginData) return null;
            return this.userSuccess(this.props.loginData.author,false);
        }
        
    }
}

export default Login;