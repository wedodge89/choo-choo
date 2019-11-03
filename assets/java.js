let firebaseConfig = {
    apiKey: "AIzaSyCIxB13rG3OuJ6bbv-N4A8ETJpBEONpbHs",
    databaseURL: "https://chugga-chugga.firebaseio.com",
  };

firebase.initializeApp(firebaseConfig);
let database = firebase.database;

let trainName="";
let destination="";
let firstTime="";
let frequency="";

$("#addTrain").on("click", function(event) {
  event.preventDefault()
  let trainName = $("#trainName").val().trim();
  $("#trainName").val("");
  let destination = $("#destination").val().trim();
  $("#destination").val("");
  let firstTime = $("#firstTrainTime").val().trim();
  $("#firstTrainTime").val("");
  let frequency = $("#frequency").val().trim(); 
  $("#frequency").val("");
  console.log(trainName);
  console.log(destination);
  console.log(firstTime);
  console.log(frequency);
  console.log("Working")
});
