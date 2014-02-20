var data = require('../data.json');


exports.editAddressInfo = function(req, res) { 
	var newAddress = req.params.newAddress;
	if (newAddress != "-1") {
		for (var i = 0; i < data["users"].length; i++) {
			var curEmail = data["users"][i]["email"];
			if (curEmail === req.session.user.email) {
				data["users"][i]["address"] = newAddress;
				req.session.user = data["users"][i];
			}
		}
	}
	res.json(req.session.user);
	console.log("editAccount.js address = " + req.session.user.address);
}