var express = require('express');
// create an app variable by initalizing express 
var app = express();
//Lets make a server and make it listen on to a port
var PORT = 8000;
var server = app.listen(PORT, function() {
    console.log("The app is listening on port", PORT);
})
//require Crawler
var crawlerFunctions = require('./crawler.js');
//require google search
var searchFunctions = require('./search.js');
//require file writer
var fileWriter = require('./fileWriter.js');
// For testing purpose only
//crawlerFunctions.Crawler("https://www.instagram.com/p/BRXYtFdl3Fb6EpHr8B8bfN1mP5Rx6SqJXjDdHA0/");
//now lets connect socket.io to this server
var io = require('socket.io').listen(server);
//on a connection from a client do these things
// use when we are performing
var searhPromise = searchFunctions.search('Obama facebook');
searhPromise.then(function(results) {
    return results;
}).then(function(results) {
    //starting to loop over all urls
    var len = results.length;

    function loop(i) {
        if (results[i] != null) {
            console.log(results[i]);
            var promise = crawlerFunctions.crawler(results[i], "true");
            //var promise = crawlerFunctions.crawler("https://www.facebook.com/imangad/", "true");
            //when results come in
            promise.then(function(result) {
                //if it was successful we are good
                //console.log(result.success);
                if (result.success) {
                    console.log("RESULT TRUE :", result.url);
                    console.log("RESULT TRUE : aLlowed");
                    fileWriter.writeURLResults(result.url, 1);
                    fileWriter.writeErrorResults(result.err);
                    if (i < len) {
                        loop(++i);
                    }
                } else {
                    //we were not able to get something, so lets disrespect the robots.txt now
                    console.log("RESULT TRUE :", result.url);
                    console.log("RESULT TRUE :", result.err);
                    console.log("triggered in the true section")
                    fileWriter.writeURLResults(result.url, 0);
                    fileWriter.writeErrorResults(result.err);
                    //disrespect them in their house.
                    var promiseFalse = crawlerFunctions.crawler(results[i], "false");
                    //var promiseFalse = crawlerFunctions.crawler("https://www.facebook.com/imangad/", "false");
                    //redo test
                    promiseFalse.then(function(resultFalse) {
                        if (resultFalse.success) {
                            console.log("RESULT FALSE URL:", resultFalse.url);
                            console.log("RESULT FALSE :", resultFalse.success);
                            fileWriter.writeURLResults(resultFalse.url, 2);
                            fileWriter.writeErrorResults(resultFalse.err);
                            if (i < len) {
                                loop(++i);
                            }
                            //write 1 to array position 1 and know that we were able to get in.
                        } else {
                            //write 0 to array position 1 and know that we were not able to get in.
                            console.log("RESULT FALSE URL:", resultFalse.url);
                            console.log("RESULT FALSE :", resultFalse.err);
                            console.log("triggered")
                            fileWriter.writeErrorResults(resultFalse.err);
                            if (i < len) {
                                loop(++i);
                            }
                        }
                    }).catch(function(err) {
                        console.log(err);
                    }) //prmoise
                }
            }).catch(function(err) {
                console.log(err);
            }) //prmoise
        }else{
        	if (i < len) {
               loop(++i);
            }
        }
    } //loop
    loop(0);
    console.log("DONE **********************************");
})
//use with the client
io.on('connection', function(socket) {
    console.log("A client connected");
    //creating socket for contact
    socket.on('contact', function(data) {
        console.log('server side ', data);
        socket.emit('contact', 'wassssuppp');
    })
    socket.on('component-contact', function(data) {
        console.log('component connection', data);
        socket.emit('component-contact', "sup from the server to search")
    })
    socket.on('crawl-input', function(url, respect) {
        //call google to get some urls
        var searchPromise = searchFunctions.search(url);
        searchPromise.then(function(results) {
            console.log("done");
        })
        //call the crawler.
        // var Promise = crawlerFunctions.Crawler(url,respect);
        // Promise.then(function(data){
        // 	console.log("Promise.then")
        // 	//return data to front end
        // 	//console.log(data);
        // 	if(typeof(data) === 'object'){
        // 		console.log("got and object")
        // 	socket.emit('crawl-output', "UNKOWN RESPONSE (SOME OTHER MECHANISM)");	
        // 	}
        // 	else{
        // 		socket.emit('crawl-output', data.toString());
        // 	}
        // }).catch(function(err){
        // 	console.log(err);
        // });
    })
})