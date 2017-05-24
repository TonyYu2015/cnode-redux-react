import React from "react";

export default class MarkDown extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div className="markdown">
                </div>
                <button type="button" className="btn btn-primary">提交</button>
            </div>
            
        )
    }
}