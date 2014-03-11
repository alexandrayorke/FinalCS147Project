var models = require('../models');

exports.view = function(req, res){
	console.log("user in homepage:" + req.session.user);
	if (typeof req.session.user === 'undefined'){
		res.redirect('/');
	}else{
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
					var zeroNotifications = true;
					if (numNotifications > 0) zeroNotifications = false;
					var pageInfo = {'user': req.session.user, 'items' : items, 'numNotifications': numNotifications, 'zeroNotifications': zeroNotifications};
					res.render('homepage', pageInfo);
				}
			}
		}
	};
}



