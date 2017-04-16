var express = require('express');
// create an app variable by initalizing express 
var app = express();

//Lets make a server and make it listen on to a port
var PORT = 8000;
var server = app.listen(PORT,function(){
	console.log("The app is listening on port",PORT);
})
//require Crawler
var crawlerFunctions = require('./crawler.js');
// For testing purpose only
//crawlerFunctions.Crawler("https://www.instagram.com/p/BRXYtFdl3Fb6EpHr8B8bfN1mP5Rx6SqJXjDdHA0/");

//now lets connect socket.io to this server
var io =  require('socket.io').listen(server);
//on a connection from a client do these things
io.on('connection',function(socket){
	console.log("A client connected");
	//creating socket for contact
	socket.on('contact',function(data){
		console.log('server side ',data);
		socket.emit('contact','wassssuppp');
	})

	socket.on('component-contact',function(data){
		console.log('component connection',data);
		socket.emit('component-contact',"sup from the server to search")
	})

	socket.on('crawl-input',function(url,respect){
		//console.log("url received", url);
		//console.log("respect status" , respect)
		//call the crawler.
		var Promise = crawlerFunctions.Crawler(url,respect);
		Promise.then(function(data){
			console.log("Promise.then")
			//return data to front end
			//console.log(data);
			if(typeof(data) === 'object'){
				console.log("got and object")
			socket.emit('crawl-output', "UNKOWN RESPONSE (SOME OTHER MECHANISM)");	
			}
			else{
				socket.emit('crawl-output', data.toString());
			}
			
		}).catch(function(err){
			console.log(err);
		});
	})
})
