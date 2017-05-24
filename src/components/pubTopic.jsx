import React from "react";

export default class PubTopic extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
                <div>
                    <div className="panel-heading"><span>主页</span>/<span>发布话题</span></div>
                    <div className="panel-body">
                        <div>
                            <span>选择板块：</span>
                            <div className="dropdown">
                                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    Dropdown
                                    <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                </ul>
                            </div>
                            <p>提问时，请遵循 《提问的智慧》中提及的要点，以便您更接收到高质量回复。</p>
                        </div>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="标题字数 10 字以上" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                </div>
        )
    }
}