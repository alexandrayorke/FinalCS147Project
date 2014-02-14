'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
 function initializePage() {
 	$("#createAccountForm").submit(createAccountListener);
 }


 function createAccountListener(e) {

 	console.log("in createAccountListener");

 	var email = document.forms["createAccountForm"]["email"].value;
 	var password = document.forms["createAccountForm"]["password"].value;
 	var firstName = document.forms["createAccountForm"]["firstName"].value;
 	var lastName = document.forms["createAccountForm"]["lastName"].value;
 	var streetAddress = document.forms["createAccountForm"]["streetAddress"].value;
 	var zipCode = document.forms["createAccountForm"]["zipCode"].value;

 	console.log("createCredentials email = " + email);
 	console.log("createCredentials password = " + password);

 	if (email.length === 0) {
 		$("#createInstructions").text("Please provide an email");
 		return false;
 	} else if (password.length === 0) {
 		$("#createInstructions").text("Please provide a password");
 		return false;

 	} else if (firstName.length === 0) {
 		$("#createInstructions").text("Please provide a first name");
 		return false;

 	} else if (lastName.length == 0) {
 		$("#createInstructions").text("Please provide a last name");
 		return false;

 	} else if (streetAddress.length == 0) {
 		$("#createInstructions").text("Please provide a street address");
 		return false;

 	} else if (zipCode.length == 0) {
 		$("#createInstructions").text("Please provide a zipCode");
 		return false;

 	} else  {
 		console.log("submitted from createAccountListener");
 		this.submit();
 	}
// do checks here
}