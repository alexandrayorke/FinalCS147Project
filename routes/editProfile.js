exports.view = function(req, res) { 
	var aboutMeText = req.session.user.aboutMe;
	if (aboutMeText.length === 0) {
		aboutMeText = "Tell us something about yourself...";
	}
	console.log("editProfile.js aboutMeText = " + aboutMeText);
	var pageInfo = {'user': req.session.user, 'aboutMeText': aboutMeText};
	res.render('editProfile', pageInfo);
 }

