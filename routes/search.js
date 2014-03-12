var data = require("../data.json");
var models = require('../models');

exports.view = function(req, res) { 
	console.log("user in search:" + req.session.user);
	if (typeof req.session.user === 'undefined'){
		res.redirect('/');
	}else{

		var searchWords = req.query.search;
		var regex = new RegExp(searchWords, 'i');
		models.Item.find({"description": regex}).exec(afterFinding);

		function afterFinding (err, q){
			if(err) console.log(err);
			var email = req.session.user.email;

			models.Notification.find({"user": email, "seen": "notSeen"}).exec(getNumUnread);

			function getNumUnread (err, notifications) {
				var numNotifications = notifications.length;
				var pageInfo = {'user': req.session.user, 'data': data, 'items' : q, 'searchInfo': "'" + searchWords + "'",'filtered': true, 'numNotifications': numNotifications};
				res.render('homepage', pageInfo);

			}
		}
	}
}


