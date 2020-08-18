const DocAPIKey = "8dTNuiCg8YismLRhtgUBYsZkb";
const googleKey = "AIzaSyC5H3l2SUF57sMCx9XKBwt52s8sDaw4CDE";
var docSearchUrl = "https://data.cms.gov/resource/3zix-38y3.json?";
var googleBaseURL =
  "https://maps.googleapis.com/maps/api/geocode/json?address=";

$(".search").on("click", function () {
  //Type of provider
  var provider = $(".provider").val();
  if (provider !== "Any") {
    var searchprovider = "&&provider_type=" + provider;
    docSearchUrl = docSearchUrl + searchprovider;
  }

  //Gender selector
  var gender = $(".gender").val();
  if (gender !== "Any") {
    var searchGender = "&&nppes_provider_gender=" + gender;
    docSearchUrl = docSearchUrl + searchGender;
  }

  //State selector
  var usState = $(".state").val();
  var searchState = "&&nppes_provider_state=" + usState;
  docSearchUrl = docSearchUrl + searchState;

  //Users address feilds
  var fullSerchAddress = $(".address").val();
  var searchZipCode = $(".zip-code").val();
  var searchCity = $(".city").val();

  $.ajax({
    url: docSearchUrl,
    type: "GET",
    data: {
      //Search results limit
      $limit: 5,
      $$app_token: DocAPIKey,
    },
  }).done(function (data) {
    //Docotr search full data
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      //Doctor search list addresses
      var fullAddress = data[i].nppes_provider_street_address_1;
      var city = data[i].nppes_provider_city;
      var state = data[i].nppes_provider_state;
      var zipCode = data[i].nppes_provider_zip_code;
      var shortZipCode = zipCode.slice(0, 5);
      var split = fullAddress.split(" ");
      var streetNumber = split[0];
      var streetName = split[1];
      for (var j = 2; j < split.length; j++) streetName += " " + split[j];
      // console.log("Street number: " + streetNumber);
      // console.log("Street name: " + streetName);
      // console.log("City: " + city);
      // console.log("Zip code: " + shortZipCode);
      // console.log("Full zip code: " + zipCode);
      // console.log("State: " + state);

      //Converting doctor location to latitude and longitude
      var googleDocStreetName = streetName.split(" ").join("+");
      var googleDocCity = city.split(" ").join("+");

      var userSearchURL =
        googleBaseURL +
        streetNumber +
        "+" +
        googleDocStreetName +
        ",+" +
        googleDocCity +
        ",+" +
        state +
        "&key=" +
        googleKey;
      $.ajax({
        url: userSearchURL,
        method: "GET",
      }).then(function (response) {
        var docLatLng = response.results[0].geometry.location;
        var docLatLngString = JSON.stringify(docLatLng);
        var docLatLngParse = JSON.parse(docLatLngString);
        console.log("this is the doc lat " + docLatLngParse.lat);
        console.log("this is the doc long " + docLatLngParse.lng);
      });
    }
    //Reset of the URL
    docSearchUrl = "https://data.cms.gov/resource/3zix-38y3.json?";
  });

  //Users address feild inputs
  console.log(fullSerchAddress);
  var searchSplit = fullSerchAddress.split(" ");
  searchStreetNumber = searchSplit[0];
  searchStreetName = searchSplit[1];
  for (var x = 2; x < searchSplit.length; x++)
    searchStreetName += " " + searchSplit[x];
  // console.log(searchStreetNumber);
  // console.log(searchStreetName);
  // console.log(searchCity.split(" ").join("+"));
  // console.log(searchZipCode);
  // console.log(usState);

  //Converting user location to latitude and longitude
  var googleStreetName = searchStreetName.split(" ").join("+");
  var googleCity = searchCity.split(" ").join("+");

  var userSearchURL =
    googleBaseURL +
    searchStreetNumber +
    "+" +
    googleStreetName +
    ",+" +
    googleCity +
    ",+" +
    usState +
    "&key=" +
    googleKey;
  $.ajax({
    url: userSearchURL,
    method: "GET",
  }).then(function (response) {
    var userLatLng = response.results[0].geometry.location;
    var userLatLngString = JSON.stringify(userLatLng);
    var userLatLngParse = JSON.parse(userLatLngString);
    console.log("this is the user lat " + userLatLngParse.lat);
    console.log("this is the user long " + userLatLngParse.lng);
  });
});
