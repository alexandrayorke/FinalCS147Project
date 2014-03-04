var models = require('../models');

exports.editEmailInfo = function(req, res) { 
	if (typeof req.session.user == 'undefined'){
		res.redirect('/');
	}


	var newEmail = req.params.newEmail;
	if (newEmail != "-1") {
		console.log("editEmail.js newEmail = " + newEmail);
		models.User
		.find({"email": req.session.user.email})
		.exec(editUser);

		function editUser(err, user){
			if(err) console.log(err);
			console.log("editEmail.js user = " + user[0]);
			models.User.update( { "email": req.session.user.email }, { $set: {"email": newEmail}}).exec(afterUpdating);

			function afterUpdating(err, user) {
				if(err) console.log(err);
				models.User.find({"email": newEmail}).exec(foundUpdatedUser);

				function foundUpdatedUser(err, user) {
					if(err) console.log(err);
					req.session.user = user[0];
					console.log("editEmail.js afterUpdating req.session.user = "  + req.session.user);	
					res.json(req.session.user);
					console.log("editEmail.js end in foundUpdatedUser");
				}
			}
		}
	} else {
		res.json(req.session.user);
		console.log("editEmail.js end with blank email");
	}
}
