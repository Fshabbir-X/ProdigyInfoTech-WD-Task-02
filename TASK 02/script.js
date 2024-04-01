let timer;
let isRunning = false;
let startTime;
let lapCounter = 1;

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("startStop").innerText = "Start";
    isRunning = false;
  } else {
    startTime = Date.now() - (lapCounter === 1 ? 0 : lapTimes[lapTimes.length - 1]);
    timer = setInterval(updateDisplay, 10);
    document.getElementById("startStop").innerText = "Stop";
    isRunning = true;
  }
}

function reset() {
  clearInterval(timer);
  document.getElementById("display").innerText = "00:00:00";
  document.getElementById("startStop").innerText = "Start";
  isRunning = false;
  lapCounter = 1;
  lapTimes = [];
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (isRunning) {
    const lapTime = Date.now() - startTime;
    const formattedTime = formatTime(lapTime);
    const lapListItem = document.createElement("li");
    lapListItem.innerText = `Lap ${lapCounter}: ${formattedTime}`;
    document.getElementById("laps").appendChild(lapListItem);
    lapCounter++;
  }
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  document.getElementById("display").innerText = formatTime(elapsedTime);
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  const milliseconds = padZero(Math.floor(date.getMilliseconds() / 10));
  return `${minutes}:${seconds}:${milliseconds}`;
}

function padZero(number) {
  return number < 10 ? `0${number}` : number;
}
