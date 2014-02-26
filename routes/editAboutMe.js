exports.editAboutMeInfo = function(req, res) { 
	var newEmail = req.params.newEmail;
	if (newEmail != "-1") {
		for (var i = 0; i < data["users"].length; i++) {
			var curEmail = data["users"][i]["email"];
			if (curEmail === req.session.user.email) {
				data["users"][i]["email"] = newEmail;
				req.session.user = data["users"][i];
			}
		}

		console.log("category: " + category);
			models.User
			.find({"category": category})
			.sort("date")
			.exec(displayItems);

			function displayItems(err, items){
				if(err) console.log(err);
				console.log("items:" + items);
				var pageInfo = {'user': req.session.user, 'data': data, 'items': items, 'searchInfo': "Search for " + category};
				res.render('homepage', pageInfo);
			}



	}
	res.json(req.session.user);
	console.log("editAccount.js email = " + req.session.user.email);
}