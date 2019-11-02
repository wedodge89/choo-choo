var firebaseConfig = {
    apiKey: "AIzaSyCIxB13rG3OuJ6bbv-N4A8ETJpBEONpbHs",
    databaseURL: "https://chugga-chugga.firebaseio.com",
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.database;

$("#trainSubmit").on("click", function(event) {
  event.preventDefault()
  let trainName = $("#trainName").val().trim()
  console.log(trainName)
  console.log("Working")
});