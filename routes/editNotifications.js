var models = require('../models');

exports.editNotifications = function(req, res) { 
	console.log("user in editnotifications:" + req.session.user);
	if (typeof req.session.user === 'undefined'){
		res.redirect('/');
	} else {

		var email = req.session.user.email;
		console.log("GOT TO EDIT NOTIFICATIONS");
		var oldStatus = "notSeen";
		models.Notification.find({"user": email, "seen": oldStatus}).exec(afterQuery);


		function afterQuery(err, notifications){
			console.log("GOT TO AFTER QUERY");
			if(err) console.log(err);
			var newStatus = "seen";
			console.log("notifications: " + notifications);
			models.Notification.update({"user": email}, { $set: {"seen": newStatus}}, {multi: true}).exec(afterUpdate);

			function afterUpdate(err, notifications) {
				if(err) console.log(err);
				console.log("NOTIFICATIONS IN editNotifications: " + notifications);

				var status = "notSeen";
				models.Notification.find({"user": email, "seen": status}).exec(getAllNotifications);


				function getAllNotifications(err, notifications){
					if(err) console.log(err);
					console.log("notifications: " + notifications);
					var numNotifications = notifications.length;
					var pageInfo = {'user': req.session.user, 'numNotifications': numNotifications};
					res.json(pageInfo);
				}
			}
		}
	}
}