var data = require('../data.json');
exports.view = function(req, res) {
	var loginEmail = req.query.email;
	var loginPassword = req.query.password;
	console.log("loginEmail = " + loginEmail);
	var foundUser = false;
	for (var i = 0; i < data["users"].length; i++) {
		var curEmail = data["users"][i]["email"];
		var curPassword = data["users"][i]["password"];
		console.log("login.js curEmail: " + curEmail);
		if (curEmail === loginEmail && curPassword === loginPassword) {
			req.session.user = data["users"][i];
			console.log("login.js logged in as:" + req.session.user["lastName"]);
			foundUser = true;
			break;
		}
	}
	if (foundUser) {
		res.render('homepage', data);
	} else {
		res.render('loginTryAgain');
	}
}
