import React from "react";

export default class MarkDown extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <textarea className="markdown" cols="80" rows="10">
                </textarea>
                <button type="button" className="btn btn-primary" onClick = {this.props.click}>提交</button>
            </div>
            
        )
    }
}