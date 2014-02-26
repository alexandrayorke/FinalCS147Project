'use strict';



// /*
//  * Function that is called when the document is ready.
//  */


$(document).ready(function() {
	console.log("READY");
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
 function initializePage() {
 	console.log("INITIALIZE PAGE");
 	resetNotifications();
 }

 function resetNotifications() {
 	console.log("GOT TO RESET NOTIFICATIONS");
 	var path = "/editNotifications";
 	$.get(path, notificationCallback);
 }

function notificationCallback(result) {	
	console.log("GOT TO NOTIFICATION CALLBACK");

}