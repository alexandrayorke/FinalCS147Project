var models = require('../models');

exports.editNotifications = function(req, res) { 
	if (typeof req.session.user == 'undefined'){
		res.render('index');
	}

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
			res.send();
		}
	}
}