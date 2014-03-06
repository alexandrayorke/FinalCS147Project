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
			var pageInfo = {'user': req.session.user, 'data': data, 'items' : q, 'searchInfo': "Searched for " + searchWords, 'alternative': req.session.alternative, 'filtered': true};
			res.render('homepage', pageInfo);
		}
	}
}


