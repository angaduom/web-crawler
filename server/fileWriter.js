fs = require('fs');
open =  require('open');

function writeFile(text){
	fs.writeFileSync('html.html',text);
	//open("html.html");
}


function writeURLResults(url,status){
	var results = fs.readFileSync('urlResults.json','utf-8');
	jsonResults = JSON.parse(results);
	if(jsonResults.hasOwnProperty(url)){
		//console.log("url exists in the data base")
		jsonResults[url] = status;
	}
	else{
		//console.log("creating a new key value pair ******************");
		jsonResults[url] = status;
	}
	fs.writeFileSync('urlResults.json',JSON.stringify(jsonResults),'utf-8');

}
function writeErrorResults(errFound){
var results = fs.readFileSync('ErrorResults.json','utf-8');
	jsonResults = JSON.parse(results);
	if(jsonResults.hasOwnProperty(errFound)){
		jsonResults[errFound] = jsonResults[errFound] + 1;
	}
	else{
		jsonResults[errFound] = 1;
	}
	//console.log(jsonResults);
	fs.writeFileSync('ErrorResults.json',JSON.stringify(jsonResults),'utf-8');
}
module.exports = {
	writeFile,
	writeURLResults,
	writeErrorResults
};