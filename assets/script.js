let trainInfo = [];
let timer = 60;

// let timerInterval = setInterval(countdown, 1000);

// function countdown() {

// }

let timeAway

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
    let tMinutesTillTrain = frequency - tRemainder;
    let nextTrain = moment().add(tMinutesTillTrain, "minutes").format('h:mm a');
    console.log(trainInfo)
    let freqHours = Math.floor(parseInt(sv.frequency) / 60);
    let freqMins = Math.floor(parseInt(sv.frequency) % 60)

    let tableRow = $("<tr>")

    let nameData = $("<td class='cel'>").text(sv.trainName)
    let destinationData = $("<td class='cel'>").text(sv.destination);
    
    if (freqHours > 0 && freqMins > 0) {
      frequencyData = $("<td class='cel'>").text(`${freqHours} hr ${freqMins} min`)
    } else if (freqHours > 0 && freqMins <= 0) {
      frequencyData = $("<td class='cel'>").text(`${freqHours} hr`)
    } else {
      frequencyData = $("<td class='cel'>").text(`${freqMins} min`)
    }

    let firstData = $("<td class='cel'>").text(regTime)
    let nextData = $("<td class='cel'>").text(nextTrain)
    let hoursAway = Math.floor(parseInt(tMinutesTillTrain) / 60)
    let minutesAway = Math.floor(parseInt(tMinutesTillTrain) % 60)
    
    if (hoursAway > 0) {
      timeAway = $("<td class='cel'>").text(hoursAway + " hr " + minutesAway + " min");
    } else if (hoursAway <= 0 && minutesAway > 0) {
      timeAway = $("<td class='cel'>").text(minutesAway + " min");
    } else {
      timeAway = $("<td class='cel'>").text("At the station now.");
    };

    tableRow.append(nameData, destinationData, frequencyData, nextData, timeAway)

    $("#trainTable > tbody").append(tableRow)
  }
}