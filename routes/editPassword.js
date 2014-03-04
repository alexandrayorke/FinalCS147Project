var models = require('../models');

exports.editPasswordInfo = function(req, res) { 
	if (typeof req.session.user == 'undefined'){
		res.render('index');
	}

	var newPassword = req.params.newPassword;
	if (newPassword != "-1") {
		console.log("editPassword.js newPassword = " + newPassword);
		models.User
		.find({"email": req.session.user.email})
		.exec(editUser);

		function editUser(err, user){
			if(err) console.log(err);
			console.log("editPassword.js user = " + user[0]);
			models.User.update( { "email": req.session.user.email }, { $set: {"password": newPassword}}).exec(afterUpdating);

			function afterUpdating(err, user) {
				if(err) console.log(err);
				models.User.find({"email": req.session.user.email}).exec(foundUpdatedUser);

				function foundUpdatedUser(err, user) {
					if(err) console.log(err);
					req.session.user = user[0];
					console.log("editPassword.js afterUpdating req.session.user = "  + req.session.user);	
					res.json(req.session.user);
					console.log("editPassword.js end in foundUpdatedUser");
				}
			}
		}
	} else {
		res.json(req.session.user);
		console.log("editEmail.js end with blank password");
	}
}