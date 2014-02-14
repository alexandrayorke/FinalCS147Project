var data = require('../data.json');

exports.view = function(req, res) { 
	var pageInfo = {'user': req.session.user, 'data': data};
	res.render('editProfile', pageInfo);
 }

