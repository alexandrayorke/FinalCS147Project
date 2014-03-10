var data = require('../data.json');
var models = require('../models');



exports.view = function(req, res) { 
	console.log("user in itemforsale:" + req.session.user);
	if (typeof req.session.user === 'undefined'){
		res.redirect('/');
	}else {

		var desc = req.body.title;
		var price = req.body.price;
		var image = req.body.imageUrl;
		var category = req.body.category;
		var extendedDesc = req.body.extendedDescription;
		var sellerEmail = req.session.user["email"];
		var sellerName = req.session.user["firstName"] + " " + req.session.user["lastName"];
		console.log("seller" + sellerEmail);
		console.log("sellername"+ sellerName);
		console.log("desc:" + desc);

		var newItem = new models.Item({
			"image": image,
			"description": desc,
			"extendedDescription": extendedDesc,
			"price": price,
			"category": category,
			"sellerEmail" : sellerEmail,
			"sellerName" : sellerName
		});
		newItem.save(afterSaving);

		function afterSaving(err){
			if (err) {console.log(err); res.send(500);}
			var newItem = {
				"image": image,
				"description": desc,
				"price": price,	
				"category": category,
				"sellerEmail": sellerEmail,
				"sellerName": sellerName,
				"id": req.session.nextID	
			};
			var message = "Put " + desc + " up for sale";


			var newNotification = new models.Notification({
				"message": message,
				"seen": "notSeen",
				"user": sellerEmail
			});

			newNotification.save(afterSaving);

			function afterSaving(err) {
				if(err) console.log(err);
				req.session.nextID = req.session.nextID + 1;	
				console.log("new notificaiton" + newNotification);
				console.log("new item title:" + newItem.description);

				data["items"].push(newItem);
				models.Item.find({}).sort("date").exec(displayItems);


				function displayItems(err, items){
					if(err) console.log(err);
					models.Notification.find({"user": req.session.user["email"], "seen": "notSeen"}).exec(displayNotifications);

					function displayNotifications(err, notifications){
						if(err) console.log(err);
						var numNotifications = notifications.length;
						var zeroNotifications = true;
						if (numNotifications > 0) zeroNotifications = false;
						var pageInfo = {'user': req.session.user, 'data': data, 'items' : items, 'nextID': req.session.nextID,'numNotifications': numNotifications, 'alternative': req.session.alternative, 'zeroNotifications': zeroNotifications};
						res.render('homepage', pageInfo);
					}
				}
			}		
		}
	}
}


 	

