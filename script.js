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
  var docInfo = [];
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
      var firstName = data[i].nppes_provider_first_name;
      var lastName = data[i].nppes_provider_last_name_organ;
      var fullAddress = data[i].nppes_provider_street_address_1;
      var providerType = data[i].provider_type;
      var city = data[i].nppes_provider_city;
      var state = data[i].nppes_provider_state;
      var zipCode = data[i].nppes_provider_zip_code;
      var shortZipCode = zipCode.slice(0, 5);
      var split = fullAddress.split(" ");
      var streetNumber = split[0];
      var streetName = split[1];
      for (var j = 2; j < split.length; j++) streetName += " " + split[j];
      //Setting doctor info to local storage
      var docInfoObj = {
        firstName: firstName,
        lastName: lastName,
        address: fullAddress,
        city: city,
        zipCode: shortZipCode,
        providerType: providerType,
      };

      docInfo.push(docInfoObj);
      localStorage.setItem("docInfo", JSON.stringify(docInfo));

      //Converting doctor location to latitude and longitude
      var googleDocStreetName = streetName.split(" ").join("+");
      var googleDocCity = city.split(" ").join("+");
      var docLocation = [];
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
        //Setting doctor address to local storage
        var docLatLngString = JSON.stringify(docLatLng);
        var docLatLngString = JSON.stringify(docLatLng);
        var docLatLngParse = JSON.parse(docLatLngString);
        var docLocationObj = {
          lat: docLatLngParse.lat,
          lng: docLatLngParse.lng,
        };
        docLocation.push(docLocationObj);
        localStorage.setItem("docLocation", JSON.stringify(docLocation));
      });
    }

    //Reset of the URL
    docSearchUrl = "https://data.cms.gov/resource/3zix-38y3.json?";
  });

  //Users address feild inputs
  var searchSplit = fullSerchAddress.split(" ");
  searchStreetNumber = searchSplit[0];
  searchStreetName = searchSplit[1];
  for (var x = 2; x < searchSplit.length; x++)
    searchStreetName += " " + searchSplit[x];

  //Converting user location to latitude and longitude
  var googleStreetName = searchStreetName.split(" ").join("+");
  var googleCity = searchCity.split(" ").join("+");
  var userLocation = [];
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
    //Setting user address to local storage
    var userLatLngString = JSON.stringify(userLatLng);
    var userLatLngParse = JSON.parse(userLatLngString);
    var userLocationObj = {
      lat: userLatLngParse.lat,
      lng: userLatLngParse.lng,
    };
    userLocation.push(userLocationObj);
    localStorage.setItem("userLocation", JSON.stringify(userLocation));
  });
});
