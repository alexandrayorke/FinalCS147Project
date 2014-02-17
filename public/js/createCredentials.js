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
 	event.preventDefault();
 	console.log("in createAccountListener");

 	var email = document.forms["createAccountForm"]["email"].value;
 	var password = document.forms["createAccountForm"]["password"].value;
 	var firstName = document.forms["createAccountForm"]["firstName"].value;
 	var lastName = document.forms["createAccountForm"]["lastName"].value;
 	var streetAddress = document.forms["createAccountForm"]["streetAddress"].value;
 	var zipCode = document.forms["createAccountForm"]["zipCode"].value;

 	console.log("createCredentials email = " + email);
 	console.log("createCredentials password = " + password);

    // attempting to get city and state from zipcode
    //var lat;
    // var lng;
    // var geocoder = new google.maps.Geocoder();
    // geocoder.geocode({ 'address': zipCode }, function (results, status) {
    // 	console.log("inside geocode");
    //     if (status == google.maps.GeocoderStatus.OK) {
    //         geocoder.geocode({'latLng': results[0].geometry.location}, function(results, status) {
    //         if (status == google.maps.GeocoderStatus.OK) {
    //             if (results[1]) {
    //                 var loc = getCityState(results);
    //                 console.log(loc);
    //             }
    //         }
    //     });
    //     }
    // }); 




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


function getCityState(results)
    {
        var a = results[0].address_components;
        var city, state;
        for(i = 0; i <  a.length; ++i)
        {
           var t = a[i].types;
           if(compIsType(t, 'administrative_area_level_1'))
              state = a[i].long_name; //store the state
           else if(compIsType(t, 'locality'))
              city = a[i].long_name; //store the city
        }
        return (city + ', ' + state)
    }

function compIsType(t, s) { 
       for(z = 0; z < t.length; ++z) 
          if(t[z] == s)
             return true;
       return false;
    }