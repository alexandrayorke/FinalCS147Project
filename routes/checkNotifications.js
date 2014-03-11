var models = require('../models');

exports.checkNotifications = function(req, res) { 
	console.log("user in checkNotifications:" + req.session.user);
	if (typeof req.session.user === 'undefined'){
		res.redirect('/');
	} else {

		var email = req.session.user.email;
		// console.log("GOT TO EDIT NOTIFICATIONS");
		var status = "notSeen";
		models.Notification.find({"user": email, "seen": status}).exec(afterQuery);


		function afterQuery(err, notifications){
			// console.log("GOT TO AFTER QUERY");
			if(err) console.log(err);
			// console.log("notifications: " + notifications);
			var numNotifications = notifications.length;
			var pageInfo = {'user': req.session.user, 'numNotifications': numNotifications};
			res.json(pageInfo);
		}
	}
}