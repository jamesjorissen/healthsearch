var pullDocInfo = JSON.parse(localStorage.docInfo);
var pullDocLocation = JSON.parse(localStorage.docLocation);
var pullUserLocation = JSON.parse(localStorage.userLocation);

window.onload = function () {
  //This is the Lat and Lng of the user location
  console.log(
    `USER LOCATION: ${pullUserLocation[0].lat}, ${pullUserLocation[0].lng}`
  );
  //Looping over results
  for (var i = 0; i < pullDocInfo.length; i++) {
    $("#over_map").append(`<div class="container-2">
    <div class="drName">Doctor Name: ${pullDocInfo[i].firstName} ${pullDocInfo[i].lastName} </div>
    <div class="address">Address: ${pullDocInfo[i].address}</div>
    <div class="city">City: ${pullDocInfo[i].city}</div>
    <div class="provider">Provider: ${pullDocInfo[i].providerType}</div>
    </div>`);
    //This is the Lat and Lng of the doc location
    console.log(
      `DOC LOCATION: ${pullDocLocation[i].lat}, ${pullDocLocation[i].lng}`
    );
  }
};
