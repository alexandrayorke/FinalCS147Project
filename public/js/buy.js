'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("buy.js document.ready");
	initializePage();
	console.log("buy.js document.ready bottom");
})

/*
 * Function that is called when the document is ready.
 */
 function initializePage() {
 	console.log("buy.js initializePage");
 // 	$(".buyButton").click(buyListener);
 }

 // function buyListener(e) {
 // 	e.preventDefault();
 // 	var itemID = $(this).closest('.item').attr('id');
 // 	var itemDescription = $('#' + itemID + ' .description').text();
 // 	console.log("buy.js in buyListener");
 // 	var c = confirm("Are you sure you want to buy\n" + itemDescription + "?");
 // 	if (c) {
 // 		var path = "/buyItem/" + itemID;
 // 		console.log("buy.js itemID: " + itemID);
 // 		console.log("buy.js url: " + path);
 // 		$.get(path, callback);
 // 	}
 // }

 // function callback(result) {
 // 	console.log("buy.js in callback");
 // 	if (result["success"]) {
 // 		console.log("buy.js successfully bought itemID = " + result["itemID"]);
 // 		console.log("buy.js new user bal = " + result["user"]["credits"]);
 // 		$('#balance').text("Balance: " + result["user"]["credits"]);
 // 		$('#notificationIcon').text(result["numNotifications"]);
 // 		$('#notificationMenu').text(result["numNotifications"]);
 // 		var elem = document.getElementById(result["itemID"]);
 // 		elem.parentNode.removeChild(elem);
 // 	} else if (result["reason"] == "negative credits"){
 // 		confirm("You do not have enough credits to buy this, sorry!");
 // 	} else{
 // 		confirm ("You cannot buy an item you put up for sale.")
 // 	}
 // }