var data = require("../data.json");
var models = require('../models');

exports.view = function(req, res) { 
	var category = req.params.category;
	console.log("category: " + category);
		models.Item
		.find({"category": category})
		.sort("date")
		.exec(displayItems);

		function displayItems(err, items){
			if(err) console.log(err);
			console.log("items:" + items);
			var pageInfo = {'user': req.session.user, 'data': data, 'items': items, 'searchInfo': "Search for " + category};
			res.render('homepage', pageInfo);
		}
	
 }