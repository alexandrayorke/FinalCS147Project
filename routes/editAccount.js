var data = require('../data.json');

exports.editAccountInfo = function(req, res) { 
	var newEmail = req.params.newEmail;
	var newPassword = req.params.newPassword;
	for (var i = 0; i < data["users"].length; i++) {
		var curEmail = data["users"][i]["email"];
		if (curEmail === req.session.user.email) {
			data["users"][i]["email"] = newEmail;
			data["users"][i]["password"] = newPassword;
			req.session.user = data["users"][i];
		}
	}
	res.json(req.session.user);
	console.log("editAccount.js email = " + req.session.user.email);
	console.log("editAccount.js password = " + req.session.user.password);
}

