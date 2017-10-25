var express=require("express");
var superAgent=require("superagent");
var cheerio=require("cheerio");
var eventproxy=require("eventproxy");
var url = require("url");

var app=express();
var ep=new eventproxy();
var cnodeUrl = 'https://cnodejs.org/';

app.get("/",function(request,response,next){
    superAgent.get('https://cnodejs.org/').end(function(err,sres){
        if(err){
            return next(err);
        }

        var $=cheerio.load(sres.text);
        var href_items=[];
        $("#topic_list .topic_title").each(function(index,element){
            var $element=$(element);
            var href=url.resolve(cnodeUrl,$element.attr("href"));
            href_items.push(href);
            if(href_items.length>=8){
                return false;
            }
        });
        
        console.log("爬取主题数为:%d",href_items.length);
        // 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
        
        ep.after("topic_html",href_items.length,function(topics){
            topics=topics.map(function(topicpair){
                var topicUrl=topicpair[0];
                var topicHtml=topicpair[1];
                var $ = cheerio.load(topicHtml);
                return ({
                    title:$(".topic_full_title").text().trim(),
                    href:topicUrl,
                    comment1:$(".reply_content").eq(0).text().trim()
                });
            });
            console.log('final:');
            console.log(topics);
           response.send(topics);
        });

        
        href_items.forEach(function(topicUrl){
            superAgent.get(topicUrl).end(function(err,res,next){
                if(err){
                    console.error(err);
                }
                console.log('fetch ' + topicUrl + ' successful');
                ep.emit("topic_html",[topicUrl,res.text]);
            });
        });

    });
});



app.listen(9000,function(){
    console.log("app is listen at port 9000");
});