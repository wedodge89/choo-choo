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
let destination = $("#destination").val().trim();
let firstTime = $("#firstTrainTime").val().trim();
let frequency = $("#frequency").val().trim(); 
console.log(trainName);
console.log(destination);
console.log(firstTime);
console.log(frequency);
console.log("Working")
$("#trainName").val("");
$("#destination").val("");
$("#firstTrainTime").val("");
$("#frequency").val("");
});
