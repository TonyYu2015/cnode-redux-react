#项目简介<br>
====
  本项目使用webpack,react,redux,bootstarp等技术，模仿nodejs论坛。<br>

##项目运行<br>
----
```
   git clone git@github.com:TonyYu2015/cnode-redux-react.git<br>
   cd cnode-redux-react<br>
   npm install<br>
   npm run build <br>
   npm run start(开发版本访问：http://localhost:8080)<br>
   ```
   
##项目实现功能<br>
----
##项目总结<br>
----
1.通过整个项目的编写下来，了解了redux是如何对应用的数据进行管理的，合理配置state的状态非常重要，起先在reducer里面随意的编写小的reducer，然后在comibine到一个大的reducer里面输出出去，这样导致在查看状态树的时候，数据结构太繁琐，不利于开发中调试；之后在一个页面中只设置一个reducer，其余的状态都在那个下面，少了一层，结构清晰很多。<br>
2.在开发点赞和回复评论时出现刚点击完点赞，看起来（因为实际情况并不是这样）prevState就发生了变化，导致nextState没有更新，dom也就不会渲染更新，后来查了下资料，发现是因为redux状态日志的打印和console.log有点类似，在state里面的键值是引用值的时候，打印的时间是在计算后面的，所以从prevState里面显示出来的就已经是计算好了的值。所以可以通过JSON.parse(JSON.stringify(state))来保证state的同步更新（好像说的不是很清楚，可能理解的不够透彻）。<br>

