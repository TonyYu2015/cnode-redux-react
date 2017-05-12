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

                {/*<p>个人信息</p>
                <a href="javascript:;"><img src="./images/test2.jpg"/></a>
                <span>TonyYu2014</span>
                <p>积分:0</p>
                <p>"这家伙很懒，很么都没留下"</p>*/}

                
            </div>
        )
    }
}

module.exports = Login;