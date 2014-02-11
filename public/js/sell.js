$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$("#sellBtn").click(sellItem);
}

function sellItem(e) {
	var title = $('#title').val();
	var price = $('#price').val();
	var image = $('#imageUrl').val();
	if (title.length == 0) {
		$("#instructions").text("You must a title");
	} else if (price.length == 0){
		$("#instructions").text("You must price");
	} else if (image.length==0) {
		$("#instructions").text("You must an image url");
	} else {

	var newItem={
	 	"image": image,
	 	"description": title,
	 	"price": price		
	 };

	 //data.items.push(newItem); HOW TO DO THIS?
	window.location.href = ("/homepage");

	}
}