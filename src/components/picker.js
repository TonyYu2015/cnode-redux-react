import React,{ Component } from 'react';

class Picker extends Component{
	constructor(props){
		super(props);
		this.state = {
			tabs:[
				{
					name:"全部",
					active:false
				},
				{
					name:"精华",
					active:false
				},
				{
					name:"分享",
					active:false
				},
				{
					name:"问答",
					active:false
				},
				{
					name:"招聘",
					active:false
				},
				{
					name:"客户端测试区",
					active:false
				}
			]
		}
	}



	render(){
		return (
			<ul className="tags">
				{
					this.props.tabsStatus.map((item,index)=>{
						return (
							<li key={index}><a href="javascript:;" style={{background : (item.active ? "#80BD01":"#fff"),color:(item.active ? "#fff":"#80BD01")}} onClick = {this.props.tabClick}>{item.name}</a></li>
						);
					})
				}
			</ul>
		)
	}
}

module.exports = Picker;