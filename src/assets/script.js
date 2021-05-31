function init() {
    var cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.disabled = true;
}

function setTimer() {
    var hours = document.getElementById("hours").value;
    var minutes = document.getElementById("minutes").value;
    var seconds = document.getElementById("seconds").value;

    var converted_seconds = 3600 * parseInt(hours, 10) + 60 * parseInt(minutes, 10) + parseInt(seconds, 10);

    var operation = document.querySelector('input[name="operation"]:checked').value;

    window.pywebview.api.setTimer(converted_seconds, operation);

    var cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.disabled = false;

    var setTimerBtn = document.getElementById("setTimerBtn");
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
    var cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.disabled = true;

    var setTimerBtn = document.getElementById("setTimerBtn");
    setTimerBtn.disabled = false;

    var par = document.getElementById("timerInfo");
    par.innerHTML = "";

    clearInterval(intervalVar);
}

function populateInfoDiv() {
    var time = new Date(timeToPerform * 1000).toISOString().substr(11, 8);

    var operation = document.querySelector('input[name="operation"]:checked').value;

    var par = document.getElementById("timerInfo");
    par.innerText = 'The ' + operation + ' will be performed in ' + time;

    timeToPerform = timeToPerform - 1;

    if (timeToPerform == 0) {
        resetButtons();
    }
}

window.onload = init();
var intervalVar;
var timeToPerform = 0;