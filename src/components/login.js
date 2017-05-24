import React,{ Component } from 'react';

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
        return (
            <div className="login">
                <p>通过accessToken登录</p>
                <input className="access" id="access" type="text" onChange={this.change} value={this.state.value} />
                <input className="btn" type="button" value="登录" onClick = {this.props.click}/>

                {/*div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">作者</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="author_info">
                                        <a href="javascript:;"><img src="./images/26316854.jpeg" alt=""></a>
                                        <a href="javascript:;">chocolateback</a>
                                    </div>
                                    <p>积分：5</p>
                                    <p>“ 这家伙很懒，什么个性签名都没有留下。 ”</p>
                                </div>
                            </div>
                            <div class="panel panel-default">
                    <div class="panel-body">
                    <button type="button" class="btn btn-success">发布话题</button>
                    </div>
                </div>*/}

                
            </div>
        )
    }
}

module.exports = Login;