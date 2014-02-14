'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#editAccountForm').submit(editAccountListener);
	$('#editAddressForm').submit(editAddressListener);
}

function editAccountListener(e) {
	e.preventDefault();
	if (document.getElementById("editAcctBtn").value === "Edit Account Info") {
		document.getElementById("accountEmail").readOnly=false;
		document.getElementById("accountPassword").readOnly=false;
		document.getElementById("editAcctBtn").value="Save";
	} else {
		document.getElementById("accountEmail").readOnly=true;
		document.getElementById("accountPassword").readOnly=true;
		document.getElementById("editAcctBtn").value="Edit Account Info";
	}

}

function editAddressListener(e) {
	e.preventDefault();
	if (document.getElementById("editAddrBtn").value === "Edit Address Info") {
		document.getElementById("accountAddress").readOnly=false;
		document.getElementById("accountZipCode").readOnly=false;
		document.getElementById("editAddrBtn").value="Save";
	} else {
		document.getElementById("accountAddress").readOnly=true;
		document.getElementById("accountZipCode").readOnly=true;
		document.getElementById("editAddrBtn").value="Edit Address Info";
	}
}

// var path = "/editUserData/" + email;
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
