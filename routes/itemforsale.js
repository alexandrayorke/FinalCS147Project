var data = require('../data.json');

exports.view = function(req, res) { 
	var desc = req.query.title;
	var price = req.query.price;
	var image = req.query.imageUrl;
	console.log("desc:" + desc)
	var newItem = {
	 	"image": image,
	  	"description": desc,
	  	"price": price		
	  };

	
	console.log("new item:" + newItem);
	console.log("new item title:" + newItem.title);
	console.log("new item price:" + newItem.price);
	data["items"].push(newItem); 
	res.render('homepage', data);

 }
