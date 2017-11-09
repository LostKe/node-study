
var Hello=require("./hello");

var hello=new Hello("主任");
hello.setLocation("北京");
hello.sayHello("小明");


function add(x,y){
    return x+y;
}

//传递一个函数
hello.excute(add(5,5));