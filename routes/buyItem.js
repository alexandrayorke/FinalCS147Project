var models = require('../models');

exports.itemPurchased = function(req, res) { 
	if (typeof req.session.user == 'undefined'){
		res.redirect('/');
	}	


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


			if (newBalance < 0) { //if the user cannot afford the item
				console.log("buyItem.js newBalance is negative: " + newBalance);
				userItemInfo = {'user': req.session.user, 'itemID': itemID, 'success': false, 'reason': "negative credits"};
				res.json(userItemInfo);
			} else if(sellerEmail === req.session.user["email"]){ //if user tries to buy their own item
				console.log("cannot buy item from yourself.")
				userItemInfo= {'user': req.session.user, 'itemID': itemID, 'success': false, 'reason': "seller is buyer"};
				res.json(userItemInfo);
			} else {	//successful buy
				console.log("new balance actually is " + newBalance);
				console.log("about to update this email" + req.session.user["email"]);
				models.User.update( { "email": req.session.user.email }, { $set: {"credits": newBalance}}).exec(afterUpdating);

				function afterUpdating(err){
					if(err) console.log(err);
					models.User.find({"email": sellerEmail}).exec(afterFindingSeller);

					function afterFindingSeller(err, sellers){
						if (err) console.log(err);
						var sellerNewBalance = sellers[0].credits + price;
						models.User.update({ "email": sellerEmail }, { $set: {"credits": sellerNewBalance}}).exec(afterUpdatingSeller);


						function afterUpdatingSeller(err){
							if(err) console.log(err);
							models.User.find({"email": req.session.user["email"]}).exec(afterFindingUser);

							function afterFindingUser(err, users){
								if(err) console.log(err);
								req.session.user = users[0]; //reset session with updated credits
								console.log("user found" + users[0]);
								models.Item.find({"_id": itemID}).remove().exec(afterRemoving);

								function afterRemoving(err){
									if(err) console.log(err);
									var newMessage1 =  "You bought " + description + " for " + price + ". If this seller does not contact you within a week, feel free to email the seller at " + sellerEmail + ".";
									var newMessage2 = req.session.user.firstName + " " + req.session.user.lastName + " bought your item: " + description + ".  Contact the buyer at " + req.session.user.email;
									var newNotification = new models.Notification(
									{ 
										"message": newMessage2,
										"seen": "notSeen",
										"user": sellerEmail
									});

									newNotification.save(afterSaving);	

									function afterSaving(err) {
										if(err) console.log(err);
										console.log("buyItem.js session balance = " + req.session.user.credits);
										var newNotification2 = new models.Notification({ //making second notification 
											"message" : newMessage1,
											"seen": "notSeen",
											"user": req.session.user["email"]
										});
										newNotification2.save(afterSaving2);

										function afterSaving2(err){
											if(err) console.log(err);
											console.log("in after saving 2");
											models.Notification.find({"user": req.session.user["email"], "seen": "notSeen"}).exec(afterQuery);

											function afterQuery(err, notifications){
												var numNotifications = notifications.length;
												userItemInfo = {'user': req.session.user, 'itemID': itemID, 'success': true, 'numNotifications': numNotifications};

												res.json(userItemInfo);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

