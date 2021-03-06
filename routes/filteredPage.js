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
			models.Notification.find({"user": req.session.user["email"], "seen": "notSeen"}).exec(displayNotifications);

				function displayNotifications(err, notifications){
					if(err) console.log(err);
					var numNotifications = notifications.length;
					console.log("NUM_NOTIFICATIONS IN HOMEPAGE.JS: " + numNotifications);
					var pageInfo = {'user': req.session.user, 'items' : items, 'numNotifications': numNotifications, 'searchInfo': "Search for " + category};
					res.render('homepage', pageInfo);
				}
		}
	}
 }