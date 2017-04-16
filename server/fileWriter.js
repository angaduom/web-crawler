fs = require('fs');
open =  require('open');

function writeFile(text){
	fs.writeFileSync('html.html',text);
	open("html.html");
}

module.exports = {writeFile};