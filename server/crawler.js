//starting the crawler code and then will let it fly on facebook, linkedin, etc
//start functions
var file = require('./fileWriter.js');

function crawler(url, respect) {
    //require crawler
    var Crawler = require('simplecrawler');
    return new Promise(function(resolve, reject) {
        //url to crawl
        console.log("URL TO CRAWL :", url);
        console.log("RESPECT SETTING : ", respect);
        var crawler = new Crawler(url)
        //crawler peoperties
        crawler.interval = 10000; // five seconds 
        crawler.maxConcurrency = 1;
        crawler.maxDepth = 1;
        crawler.respectRobotsTxt = (respect === "true");
        crawler.decodeResponses = true;
        crawler.timeout = 6000;
        /************************************/
        crawler.start();
        //start 
        crawler.on("fetchstart", function() {
            //console.log("started")
        })
        //fired when no robots.txt
        crawler.on("robotstxterror", function(err) {
            //console.log("robots.txt not found"); //smritis website. 	
            console.log(err);
            resolve({
                "url": url,
                "err": "robotstxterror",
                "success": false
            });
        })
        //invalid domain
        crawler.on("invaliddomain", function(queueItem) {
            //console.log(queueItem, " is invalid domain");
            resolve({
                "url": url,
                "err": "invaliddomain",
                "success": false
            });
        })
        //robots.txt blocked us
        crawler.on("fetchdisallowed", function() {
            //console.log("fetchdisallowed");
            resolve({
                "url": url,
                "err": "fetchdisallowed",
                "success": false
            });
        }); //fetch prevented
        crawler.on("fetchprevented", function(queueItem) {
            //console.log(queueItem, " could not be fetched as it is prevented");
            resolve({
                "url": queueItem,
                "err": "fetchprevented",
                "success": false
            });
        })
        //download condition
        crawler.on("downloadconditionerror", function(queueItem, err) {
            //console.log(queueItem, " could not be downloaded");
            console.log("because of error ", err);
            resolve({
                "url": queueItem,
                "err": "downloadconditionerror",
                "success": false
            });
        })
        //time out
        crawler.on("fetchtimeout", function(queueItem, crawlerTimeOutValue) {
            //console.log(queueItem, "was timedout");
            resolve({
                "url": queueItem,
                "err": "downloadconditionerror",
                "success": false
            });
        })
        //too much data
        crawler.on("fetchdataerror", function() {
            //console.log("too much data");
            resolve({
                "url": url,
                "err": "fetchdataerror",
                "success": false
            });
        })
        //main error
        crawler.on("fetcherror", function(queueItem, responseObject) {
            //console.log("fetch error");
            //console.log(responseObject);
            resolve({
                "url": queueItem,
                "err": "fetcherror",
                "success": false
            });
        })
        //success
        crawler.on("fetchcomplete", function(queueItem, responseBody, responseObject) {
            file.writeFile(responseBody);
            resolve({
                "url": url,
                "err": "fetchcomplete",
                "success": true
            });
        });
        crawler.on("fetchredirect", function(oldQueueItem, redirectQueueItem, responseObject) {
            console.log("redirected");
        })
    });
}
module.exports = {
    crawler: crawler
};