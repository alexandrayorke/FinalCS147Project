var data = require("../data.json");
var models = require('../models');

exports.view = function(req, res) { 
	var category = req.params.category;
	console.log("category: " + category);
	console.log("inside category filter");
		models.Item
		.find({"category": "Books"})
		.sort("date")
		.exec(displayItems);

		function displayItems(err, items){
			if(err) console.log(err);
			console.log("items:" + items);
			var pageInfo = {'user': req.session.user, 'data': data, 'items': items};
						res.send(pageInfo);

			console.log("filteredPage.js 1");
						res.redirect('/homepage');

			console.log("filteredPage.js 2");
			// res.render('homepage', pageInfo);
		}
	
 }