// pages/todos/todos.js
Page({
  data:{
    //文本框数据模型
    input:'',
    //任务清单
    todos:[
      {name:'Learning WEAPP',completed:false},
      {name:'Learning Javascript',completed:true},
      {name:'Learning HTML',completed:true},
      {name:'Learning CSS',completed:false}
    ],
    leftCount:2,
    allCompleted:false
  },
  inputChangeHandler:function(e){
    //console.log(e.detail.value);
    this.setData({input:e.detail.value});
  },
  addTodoHandler:function(){
    //当按钮添加点击事件发生时执行的函数
    //console.log(this.data.input);
    
    if(this.data.input!=""){
      var todos=this.data.todos;
      todos.push({
        name:this.data.input,
        completed:false
      })
    }
    
    //将数组的值重新显示在页面中，此过程不可缺少
    //必须显式的通过setData去改变数值，这样界面上才会得到变化
    this.setData({
      todos:todos,
      input:'',
      leftCount:this.data.leftCount+1
    });
  },
  //1、先让按钮点击时执行一段代码
  //2、拿到文本框里面的值
  //2.1由于小程序的数据绑定是单向的
  //   必须要给文本框注册改变事件
  //3、将这个值添加到列表中
  toggleTodoHandler:function(e){
    //切换当前点中的item的完成状态
    //console.log(e.currentTarget);
    var item=this.data.todos[e.currentTarget.dataset.index];
    item.completed=!item.completed;//this和item指的事同一个内存地址
   //根据当前任务的完成状态决定增加一个或者减少一个
    var leftCount=this.data.leftCount+(item.completed?-1:1)
    this.setData({todos:this.data.todos,leftCount:leftCount});
   // console.log(item);
  },
  removeTodoHandler:function(e){
    var todos=this.data.todos;
    //item就是splice方法中移除掉的元素
    var item=todos.splice(e.currentTarget.dataset.index,1)[0];
    var leftCount=this.data.leftCount-(item.completed?0:1)
    //todos会移除掉index所指向的元素
    this.setData({
      todos:todos,
      leftCount:leftCount
    });
  },
  toggleAllHandler:function(){
    //this在这里永远指向的是当前页面对象
    this.data.allCompleted=!this.data.allCompleted;
    var allCompleted1=this.data.allCompleted;
    var todos=this.data.todos;
    todos.forEach(function(item){
      item.completed=allCompleted1;
    })
    var leftCount=this.data.allCompleted?0:this.data.todos.length;
    this.setData({todos:todos,leftCount:leftCount});
  },
  clearCompletedHandler:function(){
    // var todos=[];
    // this.todos.forEach(function(item){
    //   if(!item.completed){
    //     todos.push(item);
    //   }
    // })
   
   var todos=this.data.todos.filter(function(item){
      return !item.completed;
   })
   this.setData({todos:todos});
   // todos=>新的未完成的任务列表

  }

})