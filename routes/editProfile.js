var models = require('../models');

exports.view = function(req, res) { 
	console.log("editProfile.js req.session.user = " + req.session.user);
	var aboutMeText = req.session.user.aboutMe;
	console.log("editProfile.js aboutMe = " + req.session.user.aboutMe);
	if (typeof aboutMeText === 'undefined') {
		aboutMeText = "Tell us something about yourself...";
	}
	console.log("editProfile.js aboutMeText = " + aboutMeText);
	var pageInfo = {'user': req.session.user, 'aboutMeText': aboutMeText};
	res.render('editProfile', pageInfo);
 }

