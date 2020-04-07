let trainInfo = [];
let timer = 60;

// let timerInterval = setInterval(countdown, 1000);

// function countdown() {

// }

var firebaseConfig = {
  apiKey: "AIzaSyCIxB13rG3OuJ6bbv-N4A8ETJpBEONpbHs",
  authDomain: "chugga-chugga.firebaseapp.com",
  databaseURL: "https://chugga-chugga.firebaseio.com",
  projectId: "chugga-chugga",
  storageBucket: "chugga-chugga.appspot.com",
  messagingSenderId: "979501269726",
  appId: "1:979501269726:web:3246929c08166dead2384f"
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database();

let trainName = "";
let destination = "";
let firstTime;
let frequency = 0;

$("#addTrain").on("click", function(event) {
  event.preventDefault()

  let trainName = $("#trainName").val().trim();
  let destination = $("#destination").val().trim();
  let firstTime = $("#firstTrainTime").val().trim();
  let frequency = $("#frequency").val().trim(); 

  if (trainName === "" ||
      destination === "" ||
      firstTime === "" ||
      frequency === "") {
        alert("Please fill in all fields.")
      } else if (isNaN(frequency)) {
        alert("Frequency must be a number.")
      } else {
        database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
      })

$("#trainName").val("");
$("#destination").val("");
$("#firstTrainTime").val("");
$("#frequency").val("");
}});

database.ref().on("child_added", function(childSnapshot){
  trainInfo.push(childSnapshot.val())
  refreshTrainTable()
})

function refreshTrainTable() {
  $("tbody").empty()
  let headerRow = $("<tr>")
  let nameHeader = $("<th>Train Name</th>")
  let destHeader = $("<th>Destination</th>")
  let freqHeader = $("<th>Frequency</th>")
  let nextHeader = $("<th>Next Arrival</th>")
  let minsHeader = $("<th>Time Away</th>")
  headerRow.append(nameHeader, destHeader, freqHeader, nextHeader, minsHeader)
  $("tbody").append(headerRow)
  for (let i = 0; i < trainInfo.length ; i++) {
    
    let sv = trainInfo[i]

    let train = sv.trainName
    let destination = sv.destination
    let frequency = sv.frequency
    let time = sv.firstTime
    // let currentTime = moment(time, 'HH:mm').format('hh:mm a')

    let regTime = moment(time, 'HH:mm').format('hh:mm a')

    let firstTimeConverted = moment(time, "hh:mm").subtract(1, "years");        
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    let tRemainder = diffTime % frequency;
    let tHoursTillTrain = (frequency - tRemainder) / 60;
    let nextTrain = moment().add(tHoursTillTrain, "Hours").format('h:mm a');
    console.log(trainInfo)

    let tableRow = $("<tr>")

    let nameData = $("<td class='cel'>").text(sv.trainName)
    let destinationData = $("<td class='cel'>").text(sv.destination);
    let frequencyData = $("<td class='cel'>").text(sv.frequency)
    let firstData = $("<td class='cel'>").text(regTime)
    let nextData = $("<td class='cel'>").text(nextTrain)
    let minuteData = $("<td class='cel'>").text(tHoursTillTrain)

    tableRow.append(nameData, destinationData, frequencyData, nextData, minuteData)

    $("#trainTable > tbody").append(tableRow)
  }
}