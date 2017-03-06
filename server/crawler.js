//starting the crawler code and then will let it fly on facebook, linkedin, etc
var Crawler =  require('simplecrawler');

var crawler = new Crawler("https://www.facebook.com/angad.ssj")
//crawler peoperties
crawler.interval = 10000; // five seconds 
crawler.maxConcurrency = 1;
crawler.maxDepth=1;
crawler.respectRobotsTxt=false;
//lets get some data
//console.log(crawler);
crawler.start();
crawler.on("fetchcomplete", function() {
    console.log("fetchcomplete");
});
crawler.on("fetchredirect",function (oldQueueItem, redirectQueueItem, responseObject){
	console.log("redirected");
})
crawler.on("fetchstart",function(){
	console.log("started")
})
crawler.on("fetchdisallowed",function(){
	console.log("we were not allowed, the gall");
})
crawler.on("fetchdataerror",function(){
	console.log("too much data");
})
crawler.on("fetcherror",function(queueItem, responseObject){
	console.log("they are clever");
	console.log(responseObject);
})