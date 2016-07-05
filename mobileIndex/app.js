var http=require("http");
var fs=require("fs");
var server=http.createServer(function (req,res) {
    var url=req.url=='/'?"/index.html":req.url;
    var charset;
    var m=url.split(".");
    m=m[m.length-1];
    if(m=="css"||m=="js"||m=="html"){
        m="text/"+m+';charset=utf-8';
    	charset='utf8';
    }else{
        m="image/"+m
    	charset='binary';
    }
    fs.readFile("www"+url,charset, function (err,data) {
        if(!err){
            res.setHeader('Content-Type',m);
            res.write(data,charset);
            res.end();
        }else{
            res.setHeader('Content-Type','text/html;charset=utf-8');
            res.write("<h1>您要请求的页面被恐龙吃了!<h1>");
            res.end();
        }
    });
}).listen(80);