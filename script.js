const mqKey = "6lZmnzDUcnk10BAOtzW6GtQcqCOQf8QZ";
const mqQuery =
  "http://open.mapquestapi.com/geocoding/v1/address?key=" +
  mqKey +
  "&location=Washington,DC";

$.ajax({
  url: mqQuery,
  method: "GET",
}).then(function (response) {
  console.log(response);

  var mapIconEl = $("#search-map");
  //var mapURL = response.;

  mapIconEl.attr("src", mapURL);
});
