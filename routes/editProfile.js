var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res) { 

	models.Notification.find({"user": req.session.user["email"], "seen": "notSeen"}).exec(displayNotifications);

	function displayNotifications(err, notifications){
		if(err) console.log(err);
		var numNotifications = notifications.length;
		console.log("NUM_NOTIFICATIONS IN HOMEPAGE.JS: " + numNotifications);
		var pageInfo = {'user': req.session.user, 'data': data,'nextID': req.session.nextID, 'numNotifications': numNotifications};
		res.render('editProfile', pageInfo);
	}
	//var pageInfo = {'user': req.session.user, 'data': data, 'nextID': req.session.nextID};
	//res.render('editProfile', pageInfo);
 }

