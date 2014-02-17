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
	if (email.length == 0) {
		console.log("Please enter an email.");
		$("#loginInstructions").text("Please provide an email."); //just testing this out, we can get rid of it.
		return false;
	} else if(password.length == 0){
		console.log("Please enter a password.");
		$("#loginInstructions").text("Please provide a password."); //just testing this out, we can get rid of it.
		return false;
	} else {
		this.submit();
	}
// do checks here
}