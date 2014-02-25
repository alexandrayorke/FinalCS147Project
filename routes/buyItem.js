var data = require('../data.json');
var models = require('../models');

exports.itemPurchased = function(req, res) { 
	var itemID = req.params.id;
	console.log("buyItem.js itemID = " + itemID);

	models.Item
	.find({"_id": itemID})
	.sort("date")
	.exec(displayItems);

	function displayItems(err, items){
		console.log(items);
		var price = items[0].price;
		var sellerEmail = items[0].sellerEmail;
		var description = items[0].description;
		var newBalance = parseInt(req.session.user.credits) - parseInt(price);
		var userItemInfo = null;

			//if the user cannot afford the item
			if (newBalance < 0) {
				console.log("buyItem.js newBalance is negative: " + newBalance);
				userItemInfo = {'user': req.session.user, 'itemID': itemID, 'success': false, 'reason': "negative credits"};
				res.json(userItemInfo);
			} else if(sellerEmail === req.session.user["email"]){
				console.log("cannot buy item from yourself.")
				userItemInfo= {'user': req.session.user, 'itemID': itemID, 'success': false, 'reason': "seller is buyer"};
				res.json(userItemInfo);
			} else {	
				console.log("new balance actually is " + newBalance);
				console.log("about to update this email" + req.session.user["email"]);
				models.User.find({"email" : req.session.user["email"]}).update({"credits": parseInt(newBalance)}).exec(afterUpdating);

				function afterUpdating(err){
					if(err) console.log(err);
					models.User.find({"email": req.session.user["email"]}).exec(afterFinding);

					function afterFinding(err, users){
						if(err) console.log(err);
						userItemInfo = {'user': users[0], 'itemID': itemID, 'success': true};
						console.log("user found" + users[0]);
						models.Item.find({"_id": itemID}).remove().exec(afterRemoving);

						function afterRemoving(err){
						if(err) console.log(err);
						var newMessage1 =  "You bought " + description + " for " + price + ". If this seller does not contact you soon, feel free to email the seller at " + sellerEmail + ".";
						var newMessage2 = req.session.user.firstName + " " + req.session.user.lastName + " bought your item: " + description + ".  Contact the buyer at " + req.session.user.email;
						var newNotification = new models.Notification(
						{ 
							"message": newMessage2,
							"seen": false,
							"user": sellerEmail
						});

						newNotification.save(afterSaving);	

						function afterSaving(err) {
							if(err) console.log(err);
							console.log("buyItem.js session balance = " + req.session.user.credits);
							var newNotification2 = new models.Notification({ //making second notification 
								"message" : newMessage1,
								"seen": false,
								"user": req.session.user["email"]
							});
							newNotification2.save(afterSaving2);

							function afterSaving2(err){
								if(err) console.log(err);
								console.log("in after saving 2");
								res.json(userItemInfo);
							}
						}
					}

				}

			}
		}
	}

}

