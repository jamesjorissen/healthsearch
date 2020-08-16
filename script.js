// const mqKey = "AIzaSyDVuUfCLiTCAPrSIz8gY61O7HkUzoTRef0";
// const mqQuery =
//   "https://www.google.com/maps/embed/v1/place?key=" +
//   mqKey +
//   "&location=Washington,DC";

// $.ajax({
//   url: mqQuery,
//   method: "GET",
// }).then(function (response) {
//   console.log(response);

//   var mapIconEl = $("#search-map");
//   //var mapURL = response.;

//   mapIconEl.attr("src", mapURL);
// });

//Doctor search and user address information
const DocAPIKey = "8dTNuiCg8YismLRhtgUBYsZkb";
var docSearchUrl = "https://data.cms.gov/resource/3zix-38y3.json?";

//Users address
var fullSerchAddress;
var searchZipCode;
var searchCity;
var usState;

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
  usState = $(".state").val();
  var searchState = "&&nppes_provider_state=" + usState;
  docSearchUrl = docSearchUrl + searchState;

  //Users address feilds
  fullSerchAddress = $(".address").val();
  searchZipCode = $(".zip-code").val();
  searchCity = $(".city").val();

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
      console.log("Street number: " + streetNumber);
      console.log("Street name: " + streetName);
      console.log("City: " + city);
      console.log("Zip code: " + shortZipCode);
      console.log("Full zip code: " + zipCode);
      console.log("State: " + state);
    }

    //Users address feild inputs
    console.log(fullSerchAddress);
    var searchSplit = fullSerchAddress.split(" ");
    var searchStreetNumber = searchSplit[0];
    var searchStreetName = searchSplit[1];
    for (var x = 2; x < searchSplit.length; x++)
      searchStreetName += " " + searchSplit[x];
    console.log(searchStreetNumber);
    console.log(searchStreetName);
    console.log(searchCity);
    console.log(searchZipCode);
    console.log(usState);

    //Reset of the URL
    docSearchUrl = "https://data.cms.gov/resource/3zix-38y3.json?";
  });
});
