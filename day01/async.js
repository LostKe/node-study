//使用async并发异步抓取数据 并且可以控制并发数量
//当你需要去多个源(一般是小于 10 个)汇总数据的时候，用 eventproxy 方便；
//当你需要用到队列，需要控制并发数，或者你喜欢函数式编程思维时，使用 async。大部分场景是前者，所以我个人大部分时间是用 eventproxy 的。
var async=require("async");

var con_current_count=0;

var fetchUrl=function(url,callback){
    var delay=parseInt((Math.random()*10000000)%200,10);
    con_current_count++;
    console.log("现在的并发数:%d,正在抓取的是:%s,耗时:%d 毫秒,%s",con_current_count,url,delay,new Date().getTime());
    setTimeout(function(){
        con_current_count--;
        callback(null,url+"html content");
    },delay);
};


var urls=[];
for(i=0;i<230;i++){
    urls.push("http://datasource_"+i);
}

async.mapLimit(urls,10,function(url,callback){
    fetchUrl(url,callback);
},function(err,result){
    console.log("final");
    console.log(result);
});

