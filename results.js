var pullDocInfo = JSON.parse(localStorage.docInfo);
var pullDocLocation = JSON.parse(localStorage.docLocation);
var pullUserLocation = JSON.parse(localStorage.userLocation);
const googleKey = "AIzaSyC5H3l2SUF57sMCx9XKBwt52s8sDaw4CDE";
var mapLat;
var mapLng;
//This is the Lat and Lng of the user location
console.log(
  `USER LOCATION: ${pullUserLocation[0].lat}, ${pullUserLocation[0].lng}`
);

window.onload = function () {
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
  //create script tag to load google maps from javascript file
  var script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=" +
    googleKey +
    "&callback=initMap";
  script.defer = true;

  window.initMap = function () {
    //Pulling user location coordinates from local storage to generate map
    var userCoords = localStorage.getItem("userLocation");
    var mapCoords = JSON.parse(userCoords);
    var mapLat = mapCoords[0].lat;
    var mapLng = mapCoords[0].lng;

    //map options
    var options = {
      zoom: 12,
      center: { lat: mapLat, lng: mapLng },
    };

    // creating new map and attaching to DOM
    var map = new google.maps.Map(document.getElementById("map"), options);

    //pulling doctor coordinates and addresses to generate map markers
    var docCoords = localStorage.getItem("docLocation");
    var markerCoords = JSON.parse(docCoords);

    //pulling address info to populate info windows on the markers
    var docContent = localStorage.getItem("docInfo");
    var markerContent = JSON.parse(docContent);
    console.log(markerContent);

    //loop through markerCoords
    for (var j = 0; j < markerCoords.length; j++) {
      //add marker
      addMarker(markerCoords[j]);
    }

    //add marker function
    function addMarker(markerCoords) {
      var marker = new google.maps.Marker({
        position: markerCoords,
        map: map,
      });

      //loop through markerContent
      for (var k = 0; k < markerContent.length; k++) {
        addInfo(name, address, city, zip);
        var name =
          "DR. " + markerContent[k].firstName + " " + markerContent[k].lastName;
        var address = markerContent[k].address;
        var city = markerContent[k].city;
        var zip = markerContent[k].zipCode;
        console.log(name, address, city, zip);
      }
      //check for content window
      function addInfo(name, address, city, zip) {
        var infoWindow = new google.maps.InfoWindow({
          content: (name, address, city, zip),
        });
        console.log(name, address, city, zip);

        //event
        marker.addListener("click", function () {
          infoWindow.open(map, marker);
        });
      }
    }
  };

  //append script element to head
  document.head.appendChild(script);
};
