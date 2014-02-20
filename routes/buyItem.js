var data = require('../data.json');
var models = require('../models');

exports.itemPurchased = function(req, res) { 
	var itemID = parseInt(req.params.id);
	console.log("buyItem.js itemID = " + itemID);

	//for each JSON item
	for (var i = 0; i < data["items"].length; i++) {
		var curID = data["items"][i]["id"];
		console.log("buyItem.js curID = " + curID);

		//if this item is the item that was clicked on
		if (curID == itemID) {
			var price = parseInt(data["items"][i]["price"]);
			var description = data["items"][i]["description"];
			var sellerEmail = data["items"][i]["sellerEmail"];
			var newBalance = parseInt(req.session.user.credits) - parseInt(price);
			var userItemInfo = null;

			//if the user cannot afford the item
			if (newBalance < 0) {
				console.log("buyItem.js newBalance is negative: " + newBalance);
				userItemInfo = {'user': req.session.user, 'itemID': itemID, 'success': false};
			} else {
				for (var j = 0; j < data["users"].length; j++) {
					var curEmail = data["users"][j]["email"];
					//found current user JSON object
					if (curEmail === req.session.user["email"]) {
						data["users"][j]["credits"] = newBalance; //reset JSON balance
						console.log("buyItem.js json balance = " + data["users"][j]["credits"]);
						req.session.user = data["users"][j]; //reset session user
						userItemInfo = {'user': req.session.user, 'itemID': itemID, 'success': true};
						data.items.splice(i, 1); //remove item from JSON
						var newMessage1 =  "You bought " + description + " for " + price;
						var newMessage2 = req.session.user.firstName + " " + req.session.user.lastName + " bought your item: " + description + ".  Contact them at " + req.session.user.email;

						var newNotification = new models.Notification([
						{ 
							"message": newMessage1,
							"seen": false,
							"user": curEmail
						},
						{
							"message": newMessage2,
							"seen": false,
							"user": sellerEmail
						}
						]
						);

						newNotification.save(afterSaving);	

						function afterSaving(err) {
							if(err) console.log(err);
							console.log("buyItem.js session balance = " + req.session.user.credits);
							
							res.json(userItemInfo);
							//break;
							
						}
						//break;
					}
				}
			}
			//console.log("buyItem.js session balance = " + req.session.user.credits);
			//res.json(userItemInfo);
			//break;
		}
	}
}