var data = require('../data.json');


exports.editPasswordInfo = function(req, res) { 
	var newPassword = req.params.newPassword;
	if (newPassword != "-1") {
		for (var i = 0; i < data["users"].length; i++) {
			var curEmail = data["users"][i]["email"];
			if (curEmail === req.session.user.email) {
				data["users"][i]["password"] = newPassword;
				req.session.user = data["users"][i];
			}
		}
	}
	res.json(req.session.user);
	console.log("editAccount.js password = " + req.session.user.password);
}