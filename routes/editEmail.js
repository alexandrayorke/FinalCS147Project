var data = require('../data.json');


exports.editEmailInfo = function(req, res) { 
	var newEmail = req.params.newEmail;
	for (var i = 0; i < data["users"].length; i++) {
		var curEmail = data["users"][i]["email"];
		if (curEmail === req.session.user.email) {
			data["users"][i]["email"] = newEmail;
			req.session.user = data["users"][i];
		}
	}
	res.json(req.session.user);
	console.log("editAccount.js email = " + req.session.user.email);
}
