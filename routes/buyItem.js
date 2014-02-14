var data = require('../data.json');

exports.itemPurchased = function(req, res) { 
	var itemID = req.params.id;
	for (var i = 0; i < data["items"].length; i++) {
		var curID = data["items"][i]["id"];
		if (curID === itemID) {
			var price = parseInt(data["items"][i]["price"]);
			var newBalance = parseInt(req.session.user.credits) - parseInt(price);

			for (var j = 0; j < data["users"].length; j++) {
				var curEmail = data["users"][j]["email"];
				if (curEmail === req.session.user.email) {
					data["users"][j]["credits"] = newBalance;
					console.log("json balance = " + data["users"][j]["credits"]);
					req.session.user = data["users"][j];
				}
			}
			console.log("session balance = " + req.session.user.credits);
			res.json(data["items"][i]);
			data.items.splice(i, 1);
			break;
		}
	}
}