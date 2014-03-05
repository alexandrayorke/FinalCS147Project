var models = require('../models');

exports.view = function(req, res) { 
	console.log("user in sell:" + req.session.user);
	if (typeof req.session.user === 'undefined'){
		res.redirect('/');
	}else {

		models.Notification.find({"user": req.session.user["email"], "seen": "notSeen"}).exec(displayNotifications);

		function displayNotifications(err, notifications){
			if(err) console.log(err);
			var numNotifications = notifications.length;
			console.log("NUM_NOTIFICATIONS IN HOMEPAGE.JS: " + numNotifications);
			var pageInfo = {'user': req.session.user, 'numNotifications': numNotifications};
			res.render('sell', pageInfo);
		}
	//res.render('sell');
	}
 }
