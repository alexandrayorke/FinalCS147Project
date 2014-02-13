var data = require('../data.json');
exports.view = function(req, res) {
	var loginEmail = req.query.email;
	var loginPassword = req.query.password;
	console.log("loginEmail = " + loginEmail);
	for (var i = 0; i < data["users"].length; i++) {
		var curEmail = data["users"][i]["email"];
		console.log("curEmail: " + curEmail);
		if (curEmail === loginEmail) {
			console.log("FOUND USER: " + curEmail);
			req.session.user = data["users"][i];
			console.log("CUR USER LASTNAME:" + req.session.user["lastName"]);
			break;

		}
	}
	res.render('homepage', data);
}
