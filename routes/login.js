var models = require('../models');

exports.view = function(req, res) {
	var loginEmail = req.query.email;
	var loginPassword = req.query.password;
	console.log("login.js loginEmail = " + loginEmail);

	models.User
		.find({"email": loginEmail})
		.exec(foundEmail);

		function foundEmail(err, users){
			//user is not found
			if(err) console.log(err);
			if (users.length === 0) {
				console.log("login.js no account for this email");
				var pageInfo2 = {'instructions': "Email address not found. Please try again."};
				res.render('loginTryAgain', pageInfo2);
			}

			//user has correct password
			else if (users[0].password === loginPassword) {
				console.log("login.js correct username and password");
				console.log(users[0]);
				req.session.user = users[0];
				models.Item.find({}).sort("date").exec(displayItems);


				function displayItems(err, items){
					if(err) console.log(err);
					models.Notification.find({"user": req.session.user["email"], "seen": "notSeen"}).exec(displayNotifications);

					function displayNotifications(err, notifications){
						if(err) console.log(err);
						var numNotifications = notifications.length;
						console.log("NUM_NOTIFICATIONS IN HOMEPAGE.JS: " + numNotifications);
						var pageInfo = {'user': req.session.user,'items' : items, 'numNotifications': numNotifications};
						res.render('homepage', pageInfo);
					}

				}
			}
			//user has incorrect password
			else {
				console.log("login.js incorrect password for this email");
				var pageInfo2 = {'instructions': "Please enter the correct password for this email.", 'email': loginEmail};
				res.render('loginTryAgain', pageInfo2);
			}
		}
}
