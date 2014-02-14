var data = require('../data.json');


exports.editAddressInfo = function(req, res) { 
	var newAddress = req.params.newAddress;
	var newZipCode = req.params.newZipCode;
	for (var i = 0; i < data["users"].length; i++) {
		var curEmail = data["users"][i]["email"];
		if (curEmail === req.session.user.email) {
			data["users"][i]["address"] = newAddress;
			data["users"][i]["zip"] = newZipCode;
			req.session.user = data["users"][i];
		}
	}
	res.json(req.session.user);
	console.log("editAddress.js address = " + req.session.user.address);
	console.log("editAddress.js zipcode = " + req.session.user.zip);
}