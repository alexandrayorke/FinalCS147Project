var data = require('../data.json');


exports.editZipInfo = function(req, res) { 
	var newZipCode = req.params.newZipCode;
	if (newZipCode != "-1") {
		for (var i = 0; i < data["users"].length; i++) {
			var curEmail = data["users"][i]["email"];
			if (curEmail === req.session.user.email) {
				data["users"][i]["zip"] = newZipCode;
				req.session.user = data["users"][i];
			}
		}
	}
	res.json(req.session.user);
	console.log("editAccount.js zip code = " + req.session.user.zip);
}