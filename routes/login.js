var data = require('../data.json');
exports.view = function(req, res) {
	var loginEmail = req.query.email;
	var loginPassword = req.query.password;
	console.log("loginEmail = " + loginEmail);
	var foundUser = false;
	var foundEmail = false;
	for (var i = 0; i < data["users"].length; i++) {
		var curEmail = data["users"][i]["email"];
		var curPassword = data["users"][i]["password"];
		console.log("login.js curEmail: " + curEmail);
		if (curEmail === loginEmail && curPassword === loginPassword) {
			 // for (var i=0; i < data["notifications"].length; i++){
			 // 	var curMessageTo = data["notifications"][i]["to"];
			 // 	if (curMessageTo === curEmail){
			 // 		data["users"][i][notifications].push(data["notifications"][i]);
				// }
			 // }
			req.session.user = data["users"][i];
			var itemsLen = data["items"].length;
			req.session.nextID = itemsLen;
			var pageInfo = {'user': req.session.user, 'data': data, 'nextID': req.session.nextID};
			console.log("login.js logged in as:" + req.session.user["lastName"]);
			foundUser = true;
			break;
		}else if (curEmail===loginEmail){
			foundEmail=true;
		}
	}
	if (foundUser) {
		res.render('homepage', pageInfo);
	} else if (foundEmail){

		var pageInfo2 = {'instructions': "Please enter the correct password for this email.", 'email': loginEmail};
		res.render('loginTryAgain', pageInfo2);
	}else{
		var pageInfo2 = {'instructions': "Email address not found. Please try again."};
		res.render('loginTryAgain', pageInfo2);
	}
}
