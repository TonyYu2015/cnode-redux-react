import React from "react";
import Header from "../components/header";
import TopicCatagory from "../components/topicCatagory";
import MarkDown from "../components/markDown";

export default class PubReply extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Header />
                <div id="main" className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="panel panel-default">
                                <TopicCatagory />
                                <MarkDown />
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