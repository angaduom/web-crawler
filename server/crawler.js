//starting the crawler code and then will let it fly on facebook, linkedin, etc
//start functions
var file = require('./fileWriter.js');

function Crawler(url) {
    //require crawler
    var Crawler = require('simplecrawler');
    return new Promise(function(resolve, reject) {
        //url to crawl
        console.log(url);
        var crawler = new Crawler(url)
        //crawler peoperties
        crawler.interval = 10000; // five seconds 
        crawler.maxConcurrency = 1;
        crawler.maxDepth = 1;
        crawler.respectRobotsTxt = true;
        crawler.decodeResponses = true;
        /************************************/
        console.log("call started smritimon");
        crawler.start();
        //start 
        crawler.on("fetchstart", function() {
            console.log("started")
        })
        //fired when no robots.txt
        crawler.on("robotstxterror", function(err) {
            console.log("robots.txt not found"); //smritis website. 	
            console.log(err);
            resolve(err);
        })
        //invalid domain
        crawler.on("invaliddomain", function(queueItem) {
            console.log(queueItem, " is invalid domain");
            resolve(queueItem, " is invalid domain");
            resolve("Invalid Domain Provided");
        })
        //robots.txt blocked us
        crawler.on("fetchdisallowed", function() {
            console.log("fetchdisallowed");
            resolve("Robots Exclusion Protocol blocking us!");
        })
        //fetch prevented
        crawler.on("fetchprevented", function(queueItem) {
            console.log(queueItem, " could not be fetched as it is prevented");
           	resolve("The fetch was prevented");
        })
        //download condition
        crawler.on("downloadconditionerror", function(queueItem, err) {
            console.log(queueItem, " could not be downloaded");
            console.log("because of error ", err);
            resolve("The URL provided could not be downloaded");
        })
        //time out
        crawler.on("fetchtimeout", function(queueItem, crawlerTimeOutValue) {
            console.log(queueItem, "was timedout");
            resolve("Timed Out");
        })
        //too much data
        crawler.on("fetchdataerror", function() {
            console.log("too much data");
            resolve("Cannot download the amount of data");
        })
        //main error
        crawler.on("fetcherror", function(queueItem, responseObject) {
            console.log("fetch error");
            console.log(responseObject);
            resolve(responseObject);
        })
        //success
        crawler.on("fetchcomplete", function(queueItem, responseBody, responseObject) {
            console.log("fetchcomplete");
            console.log(responseBody);
            file.writeFile(responseBody);
            resolve(responseBody);
        });
        crawler.on("fetchredirect", function(oldQueueItem, redirectQueueItem, responseObject) {
            console.log("redirected");
        })
    });
}
module.exports = {
    Crawler: Crawler
};