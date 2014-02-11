var data = require('../data.json');

exports.view = function(req, res) { 
	data["items"].push(req.query.newItem); 
	console.log("new item" + req.query.newItem);
	res.render('homepage', data);

 }
