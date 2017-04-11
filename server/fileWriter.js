fs = require('fs');

function writeFile(text){
	fs.writeFileSync('html.html',text);
}
module.exports = {writeFile};