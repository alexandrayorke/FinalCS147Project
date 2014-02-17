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
 }

 function editEmailListener(e) {
 	e.preventDefault();
 	if (document.getElementById("editEmailBtn").value === "Edit") {
 		document.getElementById("accountEmail").readOnly=false;
 		document.getElementById("editEmailBtn").value="Save";
 	} else {
 		var newEmail = document.forms["editEmailForm"]["accountEmail"].value;
 		if (newEmail.length == 0) {
 			emailCallback();
 		} else {
 			var path = "/editEmail/" + newEmail;
 			$.get(path, emailCallback);
 		}
 	}
 }


 function editPasswordListener(e) {
 	e.preventDefault();
 	if (document.getElementById("editPasswordBtn").value === "Edit") {
 		document.getElementById("accountPassword").readOnly=false;
 		document.getElementById("editPasswordBtn").value="Save";
 	} else {
 		var newPassword = document.forms["editPasswordForm"]["accountPassword"].value;
 		if (newPassword.length == 0) {
 			passwordCallback();
 		} else {
 			var path = "/editPassword/" + newPassword;
 			$.get(path, passwordCallback);
 		}
 	}
 }

 function editAddressListener(e) {
 	e.preventDefault();
 	if (document.getElementById("editAddrBtn").value === "Edit") {
 		document.getElementById("accountAddress").readOnly=false;
 		document.getElementById("editAddrBtn").value="Save";
 	} else {
 		var newAddress = document.forms["editAddressForm"]["accountAddress"].value;
 		if (newAddress.length == 0) {
 			addressCallback;
 		} else {
 			var path = "/editAddress/" + newAddress;
 			$.get(path, addressCallback);
 		}
 	}
 }

 function editZipListener(e) {
 	e.preventDefault();
 	if (document.getElementById("editZipBtn").value === "Edit") {
 		document.getElementById("accountZipCode").readOnly=false;
 		document.getElementById("editZipBtn").value="Save";
 	} else {
 		var newZipCode = document.forms["editZipForm"]["accountZipCode"].value;
 		if (newZipCode.length == 0) {
 			zipCallback;
 		} else {
 			var path = "/editZipCode/" + newZipCode;
 			$.get(path, zipCallback);
 		}
 	}
 }

 function editAccountListener(e) {
 	e.preventDefault();
 	if (document.getElementById("editAcctBtn").value === "Edit Account Info") {
 		document.getElementById("accountEmail").readOnly=false;
 		document.getElementById("accountPassword").readOnly=false;
 		document.getElementById("editAcctBtn").value="Save";
 	} else {
 		var newEmail = document.forms["editAccountForm"]["accountEmail"].value;
 		var newPassword = document.forms["editAccountForm"]["accountPassword"].value;
 		var path = "/editAccount/" + newEmail + "/" + newPassword;
 		$.get(path, accountCallback);
 	}
 }



 function emailCallback(result) {
 	document.getElementById("accountEmail").readOnly=true;
 	document.getElementById("editEmailBtn").value="Edit";
 	console.log("editProfileFields.js in emailCallback");
 	console.log("** " + result["email"]);
 	console.log(result["password"]);
 	console.log(result["address"]);
 	console.log(result["zip"]);
 }

 function passwordCallback(result) {
 	document.getElementById("accountPassword").readOnly=true;
 	document.getElementById("editPasswordBtn").value="Edit";
 	 console.log("editProfileFields.js in passwordCallback");
 	console.log(result["email"]);
 	console.log("** " + result["password"]);
 	console.log(result["address"]);
 	console.log(result["zip"]);
 }

 function addressCallback(result) {
 	document.getElementById("accountAddress").readOnly=true;
 	document.getElementById("editAddrBtn").value="Edit";
 	console.log("editProfileFields.js in addressCallback");
 	console.log(result["email"]);
 	console.log(result["password"]);
 	console.log("** " + result["address"]);
 	console.log(result["zip"]);
 }

 function zipCallback(result) {
 	document.getElementById("accountZipCode").readOnly=true;
 	document.getElementById("editZipBtn").value="Edit";
 	 console.log("editProfileFields.js in zipCallback");
 	console.log(result["email"]);
 	console.log(result["password"]);
 	console.log(result["address"]);
 	console.log("** " + result["zip"]);
 }

// var path = "/editUserDa	ta/" + email;
// 		console.log("buy.js itemID: " + itemID);
// 		console.log("buy.js url: " + path);
// 		$.get(path, callback);
// 	}
// }

// function callback(result) {
// 	console.log("buy.js removed itemID = " + result["id"]);
// 	var elem = document.getElementById(result["id"]);
// 	elem.parentNode.removeChild(elem);
// }
