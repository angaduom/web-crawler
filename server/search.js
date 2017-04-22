function search(searchString) {
    return new Promise(function(resolve, reject) {
        var google = require('google');
        google.resultsPerPage = 1000;
        google(searchString, function(err, res) {
            if (err) console.log(err);
            URLs = res.links.map(function(object){
            	return object.link
            });
            resolve(URLs);
        })
    })
}
module.exports = {
    search
}