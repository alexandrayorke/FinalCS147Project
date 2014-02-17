'use strict';

$(document).ready(function() {
	initializePage();
})


function initializePage() {
	$("#sellForm").submit(sellItem);
}

function sellItem(e) {
	//e.preventDefault();
	console.log("inside sellitem");
	var title = document.forms["sellForm"]["title"].value;
	var price = document.forms["sellForm"]["price"].value;
	var image = document.forms["sellForm"]["imageUrl"].value;
	var category = document.forms["sellForm"]["category"].value;
	if (title.length === 0) {
		$("#instructions").text("You must provide a title");
		return false;
	} else if (price.length === 0 || price < 0){
		$("#instructions").text("You must provide a positive price");
		return false;
	} else if (image.length===0) {
		$("#instructions").text("You must provide an image url");
		return false;
	} else {
		return true;
	// var newItem = {
	//  	"image": image,
	//  	"description": title,
	//  	"price": price		
	//  };

	//  console.log("title" + title);
	//  console.log("newItem:" + newItem);
	//  console.log("newItem:" + newItem.description);
	//  window.location = ("/itemforsale?newItem=" + newItem);

	}
}