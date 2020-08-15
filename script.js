
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

//API search doctor data
$.ajax({
  url: "https://data.cms.gov/resource/3zix-38y3.json",
  type: "GET",
  data: {
    $limit: 5000,
    $$app_token: "8dTNuiCg8YismLRhtgUBYsZkb",
  },
}).done(function (data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);

});
