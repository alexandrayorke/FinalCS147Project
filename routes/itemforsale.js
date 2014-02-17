var data = require('../data.json');

exports.view = function(req, res) { 
	var desc = req.query.title;
	var price = req.query.price;
	var image = req.query.imageUrl;
	var category = req.query.category;
	var sellerEmail = req.session.user["email"];
	var sellerName = req.session.user["firstName"] + " " + req.session.user["lastName"];
	console.log("seller" + sellerEmail);
	console.log("sellername"+ sellerName);
	console.log("desc:" + desc);
	console.log("cat:" + category);
	

	var newItem = {
	 	"image": image,
	  	"description": desc,
	  	"price": price,	
	  	"category": category,
	  	"sellerEmail": sellerEmail,
	  	"sellerName": sellerName,
	  	"id": req.session.nextID	
	  };

	req.session.nextID = req.session.nextID + 1;	
	var newNotification= "Put " + desc + " up for sale";
	console.log("new notificaiton" + newNotification);
	console.log("new item title:" + newItem.description);
	
	data["items"].push(newItem); 
	//data["users"][sellerEmail]["notifications"].push(newNotification);
	var pageInfo = {'user': req.session.user, 'data': data, 'nextID': req.session.nextID};
	res.render('homepage', pageInfo);

 }
