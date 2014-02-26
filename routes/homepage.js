var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){
	//console.log(data);
	models.Item.find({}).sort("date").exec(displayItems);


		function displayItems(err, items){
			if(err) console.log(err);
			//console.log("items in homepage:" + items);		
			models.User.find({}).exec(displayUsers);
			
			function displayUsers(err, users){
				if(err) console.log(err);
				models.Notification.find({"user": req.session.user["email"], "seen": "notSeen"}).exec(displayNotifications);

				function displayNotifications(err, notifications){
					if(err) console.log(err);
					var numNotifications = notifications.length;
					console.log("NUM_NOTIFICATIONS IN HOMEPAGE.JS: " + numNotifications);
					var pageInfo = {'user': req.session.user, 'data': data, 'items' : items, 'numNotifications': numNotifications};
					res.render('homepage', pageInfo);
				}
			}
		}
	


	
	//var pageInfo = {'user': req.session.user, 'data': data};
	//res.render('homepage2', pageInfo);
	//res.render('homepage', pageInfo);
};


// // Call this function when the page loads (the "ready" event)
// $(document).ready(function() {
// 	initializePage();
// })

// exports.view = function(req, res){
// 	res.render('homepage');
// };
// /*
//  * Function that is called when the document is ready.
//  */
// function initializePage() {
// 	$("#buyButton").click(function(e) {
// 		console.log("BUY BUTTON CLICKED");
// 		var c = confirm("Are you sure you want to purchase this item?\n");
// 		if (c) {
// 			$('#label').text("Item purchased!");
// 		} else {

// 		}
// 	});

// 	// Add any additional listeners here
// 	// example: $("#div-id").click(functionToCall);

// }
