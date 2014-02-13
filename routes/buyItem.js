var data = require('../data.json');

exports.itemPurchased = function(req, res) { 
	var itemID = req.params.id;
	for (var i = 0; i < data["items"].length; i++) {
		var curID = data["items"][i]["id"];
		if (curID === itemID) {
			console.log("buyItem.js curID = itemID: " + curID);
			res.json(data["items"][i]);
			data.items.splice(i, 1);
			break;
		}
	}
}