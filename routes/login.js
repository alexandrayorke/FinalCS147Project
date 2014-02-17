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
			// for (var i=0; i < data["notifications"].length; i++){
			// 	var curMessageTo = data["notifications"][i]["to"];
			// 	if (curMessageTo === curEmail){

			// 	}
			// }
			req.session.user = data["users"][i];
			var itemsLen = data["items"].length;
			req.session.nextID = itemsLen;
			var pageInfo = {'user': req.session.user, 'data': data, 'nextID': req.session.nextID};
			console.log("login.js logged in as:" + req.session.user["lastName"]);
			foundUser = true;
			break;
		}
	}
	if (foundUser) {
		res.render('homepage', pageInfo);
	} else {
		res.render('loginTryAgain');
	}
}
