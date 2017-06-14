import React from "react";
import { Link } from "react-router-dom";

export default class MarkDown extends React.Component {
    constructor(props){
        super(props)
        this.renderLink = this.renderLink.bind(this);
    }

    renderLink(){
        if(this.props.innerReply){
            return <Link to={"/authorInfo?userName=" + this.props.userName}>@{this.props.userName}</Link>
        }else{
            return null;
        }
    }

    render(){
        return(

            // <div className="panel panel-default">
            //     <div className="panel-body markdown" width="100%" contentEditable = "true" style={{"border":"1px solid #000","height":"150px"}}>
            //         {this.renderLink()}
            //     </div>
            //     <button type="button" className="btn btn-primary" onClick = {this.props.click}>提交</button>
            // </div>

            <div style={{'padding':'15px'}}>
                <div className="markdown" contentEditable = "true" style={{"border":"1px solid #ded5d5","height":"150px","width":"60%","marginBottom":"15px"}}>
                    {this.renderLink()}
                </div>
                <button type="button" className="btn btn-primary" onClick = {this.props.click}>提交</button>
            </div>
            
        )
    }
}