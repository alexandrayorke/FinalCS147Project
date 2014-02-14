'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$(".item button").click(buyListener);
}

function buyListener(e) {
	e.preventDefault();
	var itemID = $(this).closest('.item').attr('id');
	var itemDescription = $('#' + itemID + ' #description').text();
	console.log("buy.js item description = " + itemDescription)
	var c = confirm("Are you sure you want to buy\n" + itemDescription + "?");
	if (c) {
		var path = "/buyItem/" + itemID;
		console.log("buy.js itemID: " + itemID);
		console.log("buy.js url: " + path);
		$.get(path, callback);
	}
}

function callback(result) {
	console.log("buy.js removed itemID = " + result["item"]["id"]);
	console.log("buy.js new user bal = " + result["user"]["credits"]);
	$('#balance').text("Balance: " + result["user"]["credits"]);
	var elem = document.getElementById(result["item"]["id"]);
	elem.parentNode.removeChild(elem);
}