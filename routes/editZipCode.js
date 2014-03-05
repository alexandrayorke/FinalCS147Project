var models = require('../models');

exports.editZipInfo = function(req, res) { 
	console.log("user in editzip:" + req.session.user);
	if (typeof req.session.user === 'undefined'){
		res.redirect('/');
	} else {


		var newZipCode = req.params.newZipCode;
		if (newZipCode != "-1") {
			console.log("editZipCode.js newZipCode = " + newZipCode);
			models.User
			.find({"email": req.session.user.email})
			.exec(editUser);

			function editUser(err, user){
				if(err) console.log(err);
				console.log("editPassword.js user = " + user[0]);
				models.User.update( { "email": req.session.user.email }, { $set: {"zip": newZipCode}}).exec(afterUpdating);

				function afterUpdating(err, user) {
					if(err) console.log(err);
					models.User.find({"email": req.session.user.email}).exec(foundUpdatedUser);

					function foundUpdatedUser(err, user) {
						if(err) console.log(err);
						req.session.user = user[0];
						console.log("editZipCode.js afterUpdating req.session.user = "  + req.session.user);	
						res.json(req.session.user);
						console.log("editZipCode.js end in foundUpdatedUser");
					}
				}
			}
		} else {
			res.json(req.session.user);
			console.log("editPassword.js end in blank zip code");
		}
	}
}