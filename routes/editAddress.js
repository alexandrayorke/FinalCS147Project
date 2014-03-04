var models = require('../models');

exports.editAddressInfo = function(req, res) { 
	if (typeof req.session.user == 'undefined'){
		res.redirect('/');
	}


	var newAddress = req.params.newAddress;
	if (newAddress != "-1") {
		console.log("editAddress.js newAddress = " + newAddress);
		models.User
		.find({"email": req.session.user.email})
		.exec(editUser);

		function editUser(err, user){
			if(err) console.log(err);
			console.log("editAddress.js user = " + user[0]);
			models.User.update( { "email": req.session.user.email }, { $set: {"address": newAddress}}).exec(afterUpdating);

			function afterUpdating(err, user) {
				if(err) console.log(err);
				models.User.find({"email": req.session.user.email}).exec(foundUpdatedUser);

				function foundUpdatedUser(err, user) {
					if(err) console.log(err);
					req.session.user = user[0];
					console.log("editAddress.js afterUpdating req.session.user = "  + req.session.user);	
					res.json(req.session.user);
					console.log("editAddress.js end in foundUpdatedUser");
				}
			}
		}
	} else {
		res.json(req.session.user);
		console.log("editEmail.js end with blank password");
	}
}