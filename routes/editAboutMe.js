var models = require('../models');

exports.editAboutMeInfo = function(req, res) { 
	if (typeof req.session.user == 'undefined'){
		res.redirect('/');
	}

	var newAboutMe = req.body.newAboutMe;
	console.log("editAboutMe.js newAboutMe = " + newAboutMe);
	models.User
	.find({"email": req.session.user.email})
	.exec(editUser);

	function editUser(err, user){
		if(err) console.log(err);
		console.log("editAboutMe.js user = " + user[0]);
		models.User.update( { "email": req.session.user.email }, { $set: {"aboutMe": newAboutMe}}).exec(afterUpdating);

		function afterUpdating(err, user) {
			if(err) console.log(err);
			models.User.find({"email": req.session.user.email}).exec(foundUpdatedUser);

			function foundUpdatedUser(err, user) {
				if(err) console.log(err);
				req.session.user = user[0];
				console.log("editAboutMe.js afterUpdating req.session.user = "  + req.session.user);	
				res.json(req.session.user);
				console.log("editAboutMe.js end in foundUpdatedUser");
			}
		}
	}
}
