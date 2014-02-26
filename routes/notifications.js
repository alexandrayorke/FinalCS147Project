var models = require('../models');

exports.view = function(req, res){
	//console.log(data);	

	var email = req.session.user.email;
	//console.log("EMAIL IN NOTIFICATION.JS: " + email);
	//models.Notification.find({"user": email}).update( {$set: {"seen": true}}, {multi: true} ).exec(afterUpdate);

	models.Notification.find({"user": email, "seen": "notSeen"}).exec(getNumUnread);

	function getNumUnread(err, numNotifications) {
		if(err) console.log(err);
		var numNotifications = numNotifications.length;
		models.Notification.find({"user":email}).sort("-date").exec(afterQuery);

		function afterQuery(err, notifications) {
			if(err) console.log(err);
			console.log("notifications in js:" + notifications);
			res.render('notifications', {"notifications": notifications, "numNotifications": numNotifications});
		}
	}

};