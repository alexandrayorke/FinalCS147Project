var models = require('../models');

exports.view = function(req, res) { 

	if (typeof req.session.user == 'undefined'){
		res.render('index');
	}

	var aboutMeText = req.session.user.aboutMe;
	console.log("about me text: " + aboutMeText);
	//if (aboutMeText.length === 0) {
	
	models.Notification.find({"user": req.session.user["email"], "seen": "notSeen"}).exec(displayNotifications);

	function displayNotifications(err, notifications){
		if(err) console.log(err);
		var numNotifications = notifications.length;
		var aboutMeText = req.session.user.aboutMe;
		if (aboutMeText.length === 0) {
		//if (typeof aboutMeText === 'undefined') {
			aboutMeText = "Tell us something about yourself...";
		}
		console.log("editProfile.js aboutMeText = " + aboutMeText);
		console.log("NUM_NOTIFICATIONS IN HOMEPAGE.JS: " + numNotifications);
		var passwordText = [];
		for (var i = 0; i < req.session.user.password.length; i++) {
			passwordText[i] = req.session.user.password.charAt(i);
		}
		console.log("editProfile.js passwordText = " + passwordText);
		var pageInfo = {'user': req.session.user, 'numNotifications': numNotifications, 'aboutMeText': aboutMeText, 'passwordText': passwordText};
		res.render('editProfile', pageInfo);

	}
	//var pageInfo = {'user': req.session.user, 'data': data, 'nextID': req.session.nextID};
	//res.render('editProfile', pageInfo);

 }

