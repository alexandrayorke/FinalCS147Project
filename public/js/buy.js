'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	$(".item button").click(buyListener);
}




function buyListener(itemName) {
	return "You clicked buy" + itemName;
}

function buyListener(e) {
	e.preventDefault();
	//var itemName = $(this).attr();
	var newText = "You clicked buy";
	$(this).text(newText);
}