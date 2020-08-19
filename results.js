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

    //new map
    var map = new google.maps.Map(document.getElementById("map"), options);

    //array of markers
    var markers = [
      {
        coords: { lat: 44.9227, lng: -93.3294 },
        content: "<h4>44th and France</h4>",
      },
      {
        coords: { lat: 44.9778, lng: -93.265 },
        content: "<h4>Minneapolis</h4>",
      },
      {
        coords: { lat: 44.922, lng: -93.3062 },
        content: "<h4>Lake Harriet</h4>",
      },
    ];

    //loop through markers
    for (var i = 0; i < markers.length; i++) {
      //add marker
      addMarker(markers[i]);
    }

    //add marker function
    function addMarker(props) {
      var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
      });

      //check for content window
      if (props.content) {
        var infoWindow = new google.maps.InfoWindow({
          content: props.content,
        });

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
