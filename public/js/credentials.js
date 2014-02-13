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


	var email = document.forms["loginForm"]["email"].value;
	var password = document.forms["loginForm"]["password"].value;
	console.log("credentials.js email = " + email);
	console.log("credentials.js password = " + password);

	if (email.length == 0 || password.length == 0) {
		console.log("Please enter both email and password.");
		$("#loginInstructions").text("Please enter both email and password."); //just testing this out, we can get rid of it.
		//alert("This is an alert");
		return false;
	} else {
		this.submit();
	}
// do checks here
}