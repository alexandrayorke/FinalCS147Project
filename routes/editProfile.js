var models = require('../models');

exports.view = function(req, res) { 
	models.Notification.find({"user": req.session.user["email"], "seen": "notSeen"}).exec(displayNotifications);

	function displayNotifications(err, notifications){
		if(err) console.log(err);
		var numNotifications = notifications.length;
		var aboutMeText = req.session.user.aboutMe;
		if (typeof aboutMeText === 'undefined') {
			aboutMeText = "Tell us something about yourself...";
		}
		console.log("editProfile.js aboutMeText = " + aboutMeText);
		console.log("NUM_NOTIFICATIONS IN HOMEPAGE.JS: " + numNotifications);
		var pageInfo = {'user': req.session.user, 'numNotifications': numNotifications, 'aboutMeText': aboutMeText};
		res.render('editProfile', pageInfo);
	}
	//var pageInfo = {'user': req.session.user, 'data': data, 'nextID': req.session.nextID};
	//res.render('editProfile', pageInfo);

 }

