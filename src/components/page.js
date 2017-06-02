import React,{ Component } from 'react';

class Page extends Component{

	constructor(props){
		super(props);
		this.state = {
			str : '... « »',
			pageData : ['«','1','2','3','4','5','...','»'],
			aA:[]
		}

		this.setPageNum = this.setPageNum.bind(this);
		this.setPageStyle = this.setPageStyle.bind(this);
		this.beforeSendPage = this.beforeSendPage.bind(this);
	}
	
	componentDidMount(){
		let oUl = document.querySelector(".pages");
		let aA = oUl.getElementsByTagName("a");
		let arrA = Array.prototype.slice.call(aA);
		this.setState({
			aA : arrA
		});//组件加载后获取所有a标签并存入数组
		this.setPageStyle(this.props.pageNum);//设置初始样式
	}

	componentWillReceiveProps(){
		if(this.state.str.indexOf(this.props.pageNum) == -1){
			this.setPageNum(this.props.pageNum);//重排分页
		}
	}

	componentDidUpdate(){
		this.setPageStyle(this.props.pageNum);//更新分页样式
	}

	//发送页数之前判断是否同一页
	beforeSendPage(ev){
		var ev = ev || window.event;
		if(ev.target.innetText === this.props.pageNum) return;
		this.props.onClick(Number(ev.target.innerText));
	}

	//设置分页样式
	setPageStyle(pageNum){
		this.state.aA.map((item,index)=>{
			if(Number(item.innerText) !== pageNum){
				item.style.background = "#fff";
			} else {
				item.style.background = "#ccc";
			}
		});
	}
	//设置页数分配
	setPageNum(pageNum){
		if(pageNum >3){
            this.setState({
                pageData: ['«','...',pageNum-2,pageNum-1,pageNum,pageNum+1,pageNum+2,'...','»']
            })
        }else{
            this.setState({
                pageData: ['«','1','2','3','4','5','...','»']
            })
        }
	}

	render(){
		return (
			<ul className="pages">
				{
					this.state.pageData.map((p,index)=>{
						return(
							<li key={index}><a href="javascript:;" onClick={this.beforeSendPage}>{p}</a></li>
						) 
					})
				}
			</ul>
		)
	}
}

module.exports = Page;