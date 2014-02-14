var data = require('../data.json');


exports.view = function(req, res) { 
	var email = req.query.email;
	var password = req.query.password;
	var firstName = req.query.firstName;
	var lastName = req.query.lastName;
	var streetAddress = req.query.streetAddress;
	var zipCode = req.query.zipCode;

	console.log("addUser email = " + email);
	var newUser = {
		"email": email,
		"password": password,
		"firstName": firstName,
		"lastName": lastName,
		"streetAddress": streetAddress,
		"zipCode": zipCode,
		"credits": "20"
	};
	data["users"].push(newUser);
	console.log("addUser\n" + data["users"]);
	res.render('homepage', data);
}