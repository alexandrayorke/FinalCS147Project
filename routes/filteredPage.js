var models = require('../models');

exports.view = function(req, res) { 
	console.log("user in filter:" + req.session.user);
	if (typeof req.session.user === 'undefined'){
		res.redirect('/');
	}else {

	var alternative = req.params.alternative;
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
			console.log("ALTERNATIVE homepage category: " + alternative);
			var pageInfo = {'user': req.session.user, 'items': items, 'alternative': alternative};
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
			console.log("ALTERNATIVE other categories: " + alternative);

			models.Notification.find({"user": req.session.user["email"], "seen": "notSeen"}).exec(displayNotifications);

				function displayNotifications(err, notifications){
					if(err) console.log(err);
					var numNotifications = notifications.length;
					console.log("NUM_NOTIFICATIONS IN HOMEPAGE.JS: " + numNotifications);
					var pageInfo = {'user': req.session.user, 'items' : items, 'numNotifications': numNotifications, 'searchInfo': "Search for " + category, 'alternative': alternative};
					res.render('homepage', pageInfo);
				}
			}
		}
	}
 }