'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
 function initializePage() {
 	$('#editEmailForm').submit(editEmailListener);
 	$('#editPasswordForm').submit(editPasswordListener);
 	$('#editAddressForm').submit(editAddressListener);
 	$('#editZipForm').submit(editZipListener);
 	$('#editAboutMeForm').submit(editAboutMeListener);
 }

 function editEmailListener(e) {
 	e.preventDefault();
 	if (document.getElementById("editEmailBtn").value === "Edit") {
 		var curEmail = $("#curEmail").text();
 		console.log("editProfileFields.js curEmail = " + curEmail);
 		var fieldHTML = '<div class="row fields"><div class="col-xs-3">Email: </div><div class="col-xs-6" id="curEmail"><input size="16" id="accountEmail" placeholder="' + curEmail + '"></input></div><div class="col-xs-3"><input type ="submit" id="editEmailBtn" class="btn btn-default" value="Save"></input></div></div>';
 		//var fieldHTML = '<p id="emailField">Email: <input id="accountEmail" placeholder="' + curEmail + '"></input><input type ="submit" id="editEmailBtn" class="btn btn-default" value="Edit"></input></p>';
 		$(" .emailField").html(fieldHTML);
 		//document.getElementById("editEmailBtn").value="Save";
 	} else {
 		var newEmail = document.forms["editEmailForm"]["accountEmail"].value;
 		if (newEmail.length == 0) {
 			console.log("editProfileFields.js empty newEmail");
 			newEmail = "-1";
 		}
 		var path = "/editEmail/" + newEmail;
 		$.get(path, emailCallback);
 	}
 }

 function editPasswordListener(e) {
 	e.preventDefault();
 	if (document.getElementById("editPasswordBtn").value === "Edit") {
		var curPassword = $("#curPassword").text();
 		console.log("editProfileFields.js curPassword = " + curPassword);
 		var fieldHTML = '<div class="row fields"><div class="col-xs-3">Password: </div><div class="col-xs-6" id="curPassword"><input size="16" id="accountPassword" placeholder="' + curPassword + '"></input></div><div class="col-xs-3"><input type ="submit" id="editPasswordBtn" class="btn btn-default" value="Save"></input></div></div>';
 		//var fieldHTML = '<p id="passwordField">Password: <input type="password" id="accountPassword" placeholder="' + curPassword + '"></input><input type ="submit" id="editPasswordBtn" class="btn btn-default" value="Edit"></input></p>';
 		$(" .passwordField").html(fieldHTML);
 		//document.getElementById("editPasswordBtn").value="Save";
 	} else {
 		var newPassword = document.forms["editPasswordForm"]["accountPassword"].value;
 		if (newPassword.length == 0) {
			console.log("editProfileFields.js empty newPassword");
 			newPassword = "-1";
 		}
 		var path = "/editPassword/" + newPassword;
 		$.get(path, passwordCallback);
 	}
 }

 function editAddressListener(e) {
 	e.preventDefault();
 	if (document.getElementById("editAddrBtn").value === "Edit") {
		var curAddress = $("#curAddress").text();
 		console.log("editProfileFields.js curAddress = " + curAddress);
 		var fieldHTML = '<div class="row fields"><div class="col-xs-3">Street Address: </div><div class="col-xs-6" id="curAddress"><input size="16" id="accountAddress" placeholder="' + curAddress + '"></input></div><div class="col-xs-3"><input type ="submit" id="editAddrBtn" class="btn btn-default" value="Save"></input></div></div>';
 		//var fieldHTML = '<p id="addressField">Street Address: <input id="accountAddress" placeholder="' + curAddress + '"></input><input type ="submit" id="editAddrBtn" class="btn btn-default" value="Edit"></input></p>';
 		$(" .addressField").html(fieldHTML);
 	} else {
 		var newAddress = document.forms["editAddressForm"]["accountAddress"].value;
 		if (newAddress.length == 0) {
			console.log("editProfileFields.js empty newAddress");
 			newAddress = "-1";
 		}
 		var path = "/editAddress/" + newAddress;
 		$.get(path, addressCallback);
  	}
 }

 function editZipListener(e) {
 	e.preventDefault();
 	if (document.getElementById("editZipBtn").value === "Edit") {
 		var curZipCode = $("#curZipCode").text();
 		console.log("editProfileFields.js curZipCode = " + curZipCode);
 		var fieldHTML = '<div class="row fields"><div class="col-xs-3">Zip Code: </div><div class="col-xs-6" id="curZipCode"><input size="16" id="accountZipCode" placeholder="' + curZipCode + '"></input></div><div class="col-xs-3"><input type ="submit" id="editZipBtn" class="btn btn-default" value="Save"></input></div></div>';
 		//var fieldHTML = '<p id="zipCodeField">Zip Code: <input id="accountZipCode" placeholder="' + curZipCode + '"></input><input type ="submit" id="editZipBtn" class="btn btn-default" value="Edit"></input></p>';
 		$(" .zipCodeField").html(fieldHTML);
 	} else {
 		var newZipCode = document.forms["editZipForm"]["accountZipCode"].value;
 		if (newZipCode.length == 0) {
 			console.log("editProfileFields.js empty newZipCode");
 			newZipCode = "-1";;
 		}
 		var path = "/editZipCode/" + newZipCode;
		$.get(path, zipCallback);

 	}
 }

 function editAboutMeListener(e) {
 	e.preventDefault();
 	if (document.getElementById("editAboutMeBtn").value === "Edit") {
 		var curAboutMe = $("#curAboutMe").text();
 		console.log("editProfileFields.js editAboutMeListener curAboutMe = " + curAboutMe);
 		var text = "";
 		if (curAboutMe === "Tell us something about yourself...") {
 			console.log("editProfileFields.js editAboutMeListener use placeholder");
 			text = 'placeholder="Tell us a little bit about yourself...">';
 		} else {
 			console.log("editProfileFields.js editAboutMeListener use curAboutMe: " + curAboutMe);
 			text = '>' + curAboutMe;
 		}
		var fieldHTML = '<div class="row fields"><div class="col-xs-3">About Me: </div><div class="col-xs-6" id="curAboutMe"><textarea id="accountAboutMe" rows="4" cols="16" name="accountAboutMe" ' + text + '</textarea>;																														</div><div class="col-xs-3"><input type ="submit" id="editAboutMeBtn" class="btn btn-default" value="Save"></input></div></div>';
 		//var fieldHTML = '<input type ="submit" id="editAboutMeBtn" class="btn btn-default" value="Edit"></input><p><textarea id="accountAboutMe" rows="4" cols="25 name="accountAboutMe ' + text + '</textarea></p>';
 		$(" .aboutMeField").html(fieldHTML);
 		//document.getElementById("editAboutMeBtn").value="Save";
 	} else {
 		var newAboutMe = document.forms["editAboutMeForm"]["accountAboutMe"].value;
 		// if (newAboutMe.length == 0) {
 		// 	console.log("editProfileFields.js empty newAboutMe");
 		// 	newAboutMe = "-1";;
 		// }
 		var path = "/editAboutMe";
		$.post(path, { "newAboutMe": newAboutMe} ).done(aboutMeCallback);

 	}
 }


 function emailCallback(result) {
 	var fieldHTML = '<div class="row fields"><div class="col-xs-3">Email: </div><div class="col-xs-6" id="curEmail">' + result["email"] + '</div><div class="col-xs-3"><input type ="submit" id="editEmailBtn" class="btn btn-default" value="Edit"></input></div></div>';
 	//var fieldHTML = '<p style="display:inline" id="curEmail">Email: ' + result["email"] + '</p><p style="display:inline"><input type ="submit" id="editEmailBtn" class="btn btn-default" value="Edit"></input></p>';
 	$(" .emailField").html(fieldHTML);
 	console.log("editProfileFields.js in emailCallback");
 	console.log("** " + result["email"]);
 	console.log(result["password"]);
 	console.log(result["address"]);
 	console.log(result["zip"]);
 }

 function passwordCallback(result) {
 	var newPassword = result["password"];
 	var passwordText = ""
 	for (var i = 0; i < newPassword.length; i++) {
 		passwordText += " &middot; ";
 	}
 	var fieldHTML = '<div class="row fields"><div class="col-xs-3">Password: </div><div class="col-xs-6" id="curPassword">' + passwordText + '</div><div class="col-xs-3"><input type ="submit" id="editPasswordBtn" class="btn btn-default" value="Edit"></input></div></div>';
 	//var fieldHTML = '<div class="row-fluid"><div class="col-xs-3">Password: </div><div class="col-xs-6" id="curPassword">' + result["password"] + '</div><div class="col-xs-3"><input type ="submit" id="editPasswordBtn" class="btn btn-default" value="Edit"></input></div></div>';
	//var fieldHTML = '<p style="display:inline" id="curPassword">Password: ' + result["password"] + '</p><p style="display:inline"><input type ="submit" id="editPasswordBtn" class="btn btn-default" value="Edit"></input></p>';
 	$(" .passwordField").html(fieldHTML);
 	console.log("editProfileFields.js in passwordCallback");
 	console.log(result["email"]);
 	console.log("** " + result["password"]);
 	console.log(result["address"]);
 	console.log(result["zip"]);
 }

 function addressCallback(result) {
 	var fieldHTML = '<div class="row fields"><div class="col-xs-3">Street Address: </div><div class="col-xs-6" id="curAddress">' + result["address"] + '</div><div class="col-xs-3"><input type ="submit" id="editAddrBtn" class="btn btn-default" value="Edit"></input></div></div>';
	//var fieldHTML = '<p style="display:inline" id="curAddress">Street Address: ' + result["address"] + '</p><p style="display:inline"><input type ="submit" id="editAddrBtn" class="btn btn-default" value="Edit"></input></p>';
 	 $(" .addressField").html(fieldHTML);
 	console.log("editProfileFields.js in addressCallback");
 	console.log(result["email"]);
 	console.log(result["password"]);
 	console.log("** " + result["address"]);
 	console.log(result["zip"]);
 }

 function zipCallback(result) {
 	var fieldHTML = '<div class="row fields"><div class="col-xs-3">Zip Code: </div><div class="col-xs-6" id="curZipCode">' + result["zip"] + '</div><div class="col-xs-3"><input type ="submit" id="editZipBtn" class="btn btn-default" value="Edit"></input></div></div>';
 	//var fieldHTML = '<p style="display:inline" id="curZipCode">Zip Code: ' + result["zip"] + '</p><p style="display:inline"><input type ="submit" id="editZipBtn" class="btn btn-default" value="Edit"></input></p>';
 	$(" .zipCodeField").html(fieldHTML);
 	console.log("editProfileFields.js in zipCallback");
 	console.log(result["email"]);
 	console.log(result["password"]);
 	console.log(result["address"]);
 	console.log("** " + result["zip"]);
 }

  function aboutMeCallback(result) {
  	if (result["aboutMe"].length === 0) {
  		result["aboutMe"] = "Tell us something about yourself...";
  	}
  	console.log("editProfileFields.js aboutMeCallback");
	var fieldHTML = '<div class="row fields"><div class="col-xs-3">About Me: </div><div class="col-xs-6" id="curAboutMe">' + result["aboutMe"] + '</div><div class="col-xs-3"><input type ="submit" id="editAboutMeBtn" class="btn btn-default" value="Edit"></input></div></div>';
 	//var fieldHTML = '<p><input type ="submit" id="editAboutMeBtn" class="btn btn-default" value="Edit"></input></p><p style="display:inline" id="curAboutMe">' + result["aboutMe"] + '</p>';
 	$(" .aboutMeField").html(fieldHTML);
 	console.log("editProfileFields.js in aboutMeCallback");
 	console.log(result["email"]);
 	console.log(result["password"]);
 	console.log(result["address"]);
 	console.log(result["zip"]);
 	console.log("** " + result["aboutMe"]);
 }



