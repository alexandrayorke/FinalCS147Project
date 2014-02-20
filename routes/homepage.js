var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);

	


	
	var pageInfo = {'user': req.session.user, 'data': data};
	//res.render('homepage2', pageInfo);
	res.render('homepage', pageInfo);
};


// // Call this function when the page loads (the "ready" event)
// $(document).ready(function() {
// 	initializePage();
// })

// exports.view = function(req, res){
// 	res.render('homepage');
// };
// /*
//  * Function that is called when the document is ready.
//  */
// function initializePage() {
// 	$("#buyButton").click(function(e) {
// 		console.log("BUY BUTTON CLICKED");
// 		var c = confirm("Are you sure you want to purchase this item?\n");
// 		if (c) {
// 			$('#label').text("Item purchased!");
// 		} else {

// 		}
// 	});

// 	// Add any additional listeners here
// 	// example: $("#div-id").click(functionToCall);

// }
