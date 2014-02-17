var data = require('../data.json');

exports.view = function(req, res) { 
	var desc = req.query.title;
	var price = req.query.price;
	var image = req.query.imageUrl;
	var category = req.query.category;
	console.log("desc:" + desc);
	console.log("cat:" + category);
	//var dataSz= data["items"].length;

	var newItem = {
	 	"image": image,
	  	"description": desc,
	  	"price": price,	
	  	"category": category,
	  	"id": req.session.nextID	
	  };

	req.session.nextID = req.session.nextID + 1;	
	console.log("new item:" + newItem);
	console.log("new item title:" + newItem.description);
	console.log("new item price:" + newItem.price);
	console.log("new item cat:" + newItem.category);
	data["items"].push(newItem); 
	var pageInfo = {'user': req.session.user, 'data': data, 'nextID': req.session.nextID};
	res.render('homepage', pageInfo);

 }
