var models = require('../models');

exports.view = function(req, res){
	//console.log(data);	

	var email = req.session.user.email;
	console.log("EMAIL IN NOTIFICATION.JS: " + email);

	models.Notification.find({"user":email}).sort("-date").exec(afterQuery);

	function afterQuery(err, notifications) {
		if(err) console.log(err);
		console.log(notifications);
		res.render('notifications', {"notifications": notifications});
	}


	//res.render('notifications');
};