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
	var newText = "You clicked buy";
	$(this).text(newText);
	var c = confirm("Are you sure you want to buy this item?");
	if (c) {

	}
}