var models = require('../models');

exports.view = function(req, res) { 

	var email = req.query.email;
	var password = req.query.password;
	var firstName = req.query.firstName;
	var lastName = req.query.lastName;
	var streetAddress = req.query.streetAddress;
	var zipCode = req.query.zipCode;


	var newUser = new models.User({
		"firstName": firstName,
		"lastName": lastName,
		"password": password,
		"email": email,
		"address": streetAddress,
		"zip": zipCode,
		"credits": 20,
		"aboutMe": ""
	});
	newUser.save(afterSaving);

	function afterSaving(err){
		if(err){console.log(err); res.send(500);}
		

		req.session.user = newUser;
		console.log("user in adduser:" + req.session.user);
		if (typeof req.session.user === 'undefined'){
			res.redirect('/');
		}	else {
			models.Item.find({}).sort("date").exec(displayItems);

			function displayItems(err, items){
				if(err) console.log(err);
				var pageInfo = {'user': req.session.user, 'items' : items};
				res.render('homepage', pageInfo);
			}
		}
		
	}
}