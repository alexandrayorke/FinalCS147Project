'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$("#loginForm").submit(loginListener);
}


function loginListener(e) {
	//document.getElementByID("loginForm").onsubmit = loginListener();
	// var username = req.query.username;
	// var password = req.query.password;

	e.preventDefault();
	console.log("in loginListener");
	var username = document.forms["loginForm"]["username"].value;
	var password = document.forms["loginForm"]["password"].value;
	console.log("username = " + username);
	console.log("password = " + password);

	if (username.length == 0 || password.length == 0) {
		console.log("Please enter both username and password.");
		$("#loginInstructions").text("Please enter both username and password.");
		//alert("This is an alert");
		return false;
	} else {
		//return true;
		this.submit();
	}
// do checks here
}