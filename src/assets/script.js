var hoursInput = document.getElementById("hours");
var minutesInput = document.getElementById("minutes");
var secondsInput = document.getElementById("seconds");

var cancelBtn = document.getElementById("cancelBtn");
var setTimerBtn = document.getElementById("setTimerBtn");

var infoText = document.getElementById("timerInfo");

function init() {
    cancelBtn.disabled = true;
}

function setTimer() {
    var hours = hoursInput.value;
    var minutes = minutesInput.value;
    var seconds = secondsInput.value;

    var converted_seconds = 3600 * parseInt(hours, 10) + 60 * parseInt(minutes, 10) + parseInt(seconds, 10);

    var operation = document.querySelector('input[name="operation"]:checked').value;    
    window.pywebview.api.setTimer(converted_seconds, operation);

    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;

    cancelBtn.disabled = false;
    setTimerBtn.disabled = true;

    timeToPerform = converted_seconds;

    populateInfoDiv();
    intervalVar = setInterval(populateInfoDiv, 1000);
}

function cancelTimer() {
    window.pywebview.api.cancelTimer();

    resetButtons();
}

function resetButtons() {
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;

    cancelBtn.disabled = true;
    setTimerBtn.disabled = false;

    infoText.innerHTML = "";

    clearInterval(intervalVar);
}

function populateInfoDiv() {
    var time = new Date(timeToPerform * 1000).toISOString().substr(11, 8);
    
    var operation = document.querySelector('input[name="operation"]:checked').value;    
    infoText.innerText = 'The ' + operation + ' will be performed in ' + time;

    timeToPerform = timeToPerform - 1;

    if (timeToPerform == 0) {
        resetButtons();
    }
}

window.onload = init();
var intervalVar;
var timeToPerform = 0;