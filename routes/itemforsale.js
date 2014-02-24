var data = require('../data.json');
var models = require('../models');



exports.view = function(req, res) { 
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
			"seen": false,
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
			var pageInfo = {'user': req.session.user, 'data': data, 'nextID': req.session.nextID, "items": items};
			res.render('homepage', pageInfo);
		}		
	}

	/*req.session.nextID = req.session.nextID + 1;	
	console.log("new notificaiton" + newNotification);
	console.log("new item title:" + newItem.description);
	
	data["items"].push(newItem); 
	//data["users"][sellerEmail]["notifications"].push(newNotification);
	var pageInfo = {'user': req.session.user, 'data': data, 'nextID': req.session.nextID};
	res.render('homepage', pageInfo);*/
 	}
}
