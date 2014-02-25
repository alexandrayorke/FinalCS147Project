var models = require('../models');

exports.view = function(req, res) { 
	var category = req.params.category;
	console.log("category: " + category);
	if (category === "homepage") {
		models.Item
		.find({})
		.sort("-date")
		.exec(displayAllItems);

		function displayAllItems(err, items){
			if(err) console.log(err);
			console.log("items:" + items);
			var pageInfo = {'user': req.session.user, 'items': items};
			res.render('homepage', pageInfo);
		}
	} else {
		models.Item
		.find({"category": category})
		.sort("-date")
		.exec(displayItems);

		function displayItems(err, items){
			if(err) console.log(err);
			console.log("items:" + items);
			var pageInfo = {'user': req.session.user, 'items': items, 'searchInfo': "Search for " + category};
			res.render('homepage', pageInfo);
		}
	}
 }