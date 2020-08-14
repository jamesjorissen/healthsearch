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
