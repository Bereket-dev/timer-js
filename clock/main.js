const clock = document.getElementById("clock");
const ring = document.querySelector(".ring");
const ringElement = `            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="ring"
              enable-background="new 0 0 512 512"
              viewBox="0 0 512 512"
            >
              <path
                fill="#efc139"
                d="M373.984,312.375c-6.798-18.772-10.275-38.585-10.275-58.551v-51.367c0-27.792-12.057-52.942-31.547-71.149
              c-19.49-18.207-46.412-29.47-76.162-29.47c-59.49,0-107.709,45.045-107.709,100.619v51.367c0,19.965-3.477,39.778-10.275,58.551
              l-25.713,71.007c-3.997,11.039,4.18,22.697,15.92,22.697h82.855h89.843h82.855c11.741,0,19.918-11.658,15.92-22.697
              L373.984,312.375z"
              ></path>
              <circle cx="256" cy="81.419" r="20.419" fill="#ecb220"></circle>
              <path
                fill="#d3a02d"
                d="M256 451c24.809 0 44.921-20.112 44.921-44.921h-89.843C211.079 430.888 231.191 451 256 451zM106.584 182.091c-4.033-3.771-10.361-3.56-14.134.474C74.061 202.229 63.933 228.309 63.933 256s10.128 53.771 28.518 73.436c1.969 2.105 4.634 3.17 7.306 3.17 2.447 0 4.9-.893 6.828-2.696 4.034-3.772 4.246-10.101.474-14.134-30.823-32.96-30.823-86.591 0-119.551C110.83 192.191 110.618 185.863 106.584 182.091z"
              ></path>
              <path
                fill="#d3a02d"
                d="M64.361 158.276c3.772-4.033 3.561-10.361-.473-14.134s-10.361-3.561-14.134.474C21.876 174.425 6.524 213.981 6.524 256s15.353 81.575 43.229 111.384c1.969 2.105 4.634 3.17 7.306 3.17 2.447 0 4.9-.893 6.829-2.696 4.034-3.772 4.246-10.101.473-14.134C13.969 299.839 13.969 212.161 64.361 158.276zM419.551 182.564c-3.772-4.034-10.1-4.247-14.134-.474-4.034 3.772-4.246 10.101-.474 14.134 30.823 32.96 30.823 86.591 0 119.551-3.772 4.033-3.561 10.361.474 14.134 1.928 1.804 4.381 2.696 6.828 2.696 2.671 0 5.337-1.064 7.306-3.17 18.39-19.664 28.518-45.744 28.518-73.436S437.94 202.229 419.551 182.564z"
              ></path>
              <path
                fill="#d3a02d"
                d="M462.248,144.616c-3.772-4.034-10.101-4.247-14.134-0.474c-4.034,3.772-4.246,10.101-0.473,14.134
              c50.392,53.885,50.392,141.563,0,195.447c-3.772,4.033-3.561,10.361,0.473,14.134c1.929,1.804,4.381,2.696,6.829,2.696
              c2.671,0,5.337-1.064,7.306-3.17c27.877-29.809,43.229-69.365,43.229-111.384S490.125,174.425,462.248,144.616z"
              ></path>
            </svg>`;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let period = hours > 12 ? "PM" : "AM";
  let myHours = hours % 12 || 12; // to set 12 hours range

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  clock.innerText = myHours + " : " + minutes + " : " + seconds + " " + period;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  const currentTime = formattedHours + ":" + formattedMinutes;

  return currentTime;
}

let isClicked = false;
let ringTone = new Audio("./audio/ringtone.wav");

function startRinging() {
  //alarm notification
  const inputes = document.querySelectorAll("input");
  inputes.forEach((alarm) => {
    const toggle = alarm.nextElementSibling; // Get the alarm toggle
    const ball = toggle.querySelector(".my-ball"); // Check if the toggle is active
    const isActive = ball && ball.classList.contains("active");
    const currentTime = updateClock();

    if (!isClicked && isActive) {
      if (alarm.value === currentTime) {
        ringTone.loop = true;
        ringTone.play();
        ring.classList.add("ringing");
      }
    }
  });
}

function stopRinging() {
  const stopBtn = document.getElementById("stopBtn");

  stopBtn.addEventListener("click", () => {
    if (!ringTone.paused) {
      ringTone.pause();
      ringTone.currentTime = 0;
      ring.classList.remove("ringing");
      isClicked = true;
    }

    setTimeout(() => {
      isClicked = false;
    }, 60000);
  });
}

setInterval(() => {
  updateClock();
  startRinging();
}, 1000);

updateClock();
stopRinging();

function addAlarm() {
  const alarmDisplay = document.getElementById("alarmDisplay");

  let count = alarmDisplay.children.length + 1;
  let toggleNum = count;
  let ballNum = count;

  // Create the alarm elements
  const alarmDiv = document.createElement("div");
  alarmDiv.id = `initialAlarm${count}`;
  alarmDiv.classList.add("initial-alarm", "alarm");

  const alarmInput = document.createElement("input");
  alarmInput.classList.add("time");
  alarmInput.type = "time";
  alarmInput.id = `alarm${count}`;

  const alarmToggle = document.createElement("div");
  alarmToggle.classList.add("alarm-toggle");
  alarmToggle.id = `alarmToggle${toggleNum}`;

  const myBall = document.createElement("div");
  myBall.classList.add("my-ball");
  myBall.id = `ball${ballNum}`;

  const removeBtn = document.createElement("div");
  removeBtn.classList.add("alarm-btn", "remove-btn");
  removeBtn.id = "remove-btn";
  removeBtn.textContent = "-";

  alarmToggle.appendChild(myBall);
  alarmDiv.appendChild(alarmInput);
  alarmDiv.appendChild(alarmToggle);
  alarmDiv.appendChild(removeBtn);
  alarmDisplay.appendChild(alarmDiv);

  // Attach event listeners to toggle and remove button
  attachToggleEvent(alarmToggle);
  attachRemoveEvent(removeBtn);
}

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  addAlarm();
});

function attachToggleEvent(toggle) {
  toggle.addEventListener("click", () => {
    const input = toggle.previousElementSibling;
    if (input && input.value) {
      const ball = toggle.querySelector(".my-ball");
      ball.classList.toggle("active"); // Toggle the ball's active state
    }
  });
}

function attachRemoveEvent(removeBtn) {
  removeBtn.addEventListener("click", () => {
    const alarmDiv = removeBtn.closest(".alarm");
    alarmDiv.remove(); // Remove the alarm element
  });
}

// Initial setup for any existing alarms
function initialize() {
  const toggles = document.querySelectorAll(".alarm-toggle");
  toggles.forEach((toggle) => {
    attachToggleEvent(toggle); // Attach toggle event to all existing toggles
  });

  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((btn) => {
    attachRemoveEvent(btn); // Attach remove event to all existing remove buttons
  });
}

initialize(); // Initialize event listeners for any existing alarms

const alarmContainerBtn = document.getElementById("alarmBtn");
const stopWatchBtn = document.getElementById("stopWatchBtn");
const clockBtn = document.getElementById("clockBtn");

const alarmContainer = document.querySelector(".alarm-container");
const stopWatchContainer = document.querySelector(".stopwatch-container");
const clockContainer = document.querySelector(".clock-container");

alarmContainerBtn.addEventListener("click", () => {
  alarmContainer.classList.remove("none");
  if (!stopWatchContainer.classList.contains("none")) {
    stopWatchContainer.classList.add("none");
  }
  if (clockContainer.classList.contains("none")) {
    clockContainer.classList.remove("none");
  }

  ring.innerHTML = ringElement;
});

stopWatchBtn.addEventListener("click", () => {
  stopWatchContainer.classList.remove("none");
  if (!alarmContainer.classList.contains("none")) {
    alarmContainer.classList.add("none");
  }
  if (!clockContainer.classList.contains("none")) {
    clockContainer.classList.add("none");
  }
});

clockBtn.addEventListener("click", () => {
  clockContainer.classList.remove("none");
  if (!stopWatchContainer.classList.contains("none")) {
    stopWatchContainer.classList.add("none");
  }
  if (!alarmContainer.classList.contains("none")) {
    alarmContainer.classList.add("none");
  }

  ring.innerHTML = "";
});

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const stopWatchDisplay = document.getElementById("stopWatch");

let startTime = 0;
let pausedTime = 0;
let elapsedTime = 0;
let timeInterval = 0;
let isPaused;

function updateStopWatch() {
  if (!isPaused) {
    elapsedTime = Date.now() - startTime;
    elapsedTime += pausedTime;
  } else {
    elapsedTime = pausedTime;
  }
  let timerSecond = Math.floor(elapsedTime / 1000);
  let timerMinute = Math.floor(timerSecond / 60) % 60;
  let timerHour = Math.floor(timerMinute / 60) % 60;

  timerSecond = String(timerSecond).padStart(2, "0");
  timerMinute = String(timerMinute).padStart(2, "0");
  timerHour = String(timerHour).padStart(2, "0");

  stopWatchDisplay.innerHTML =
    timerHour + ":" + timerMinute + ":" + timerSecond;
}

startBtn.addEventListener("click", () => {
  startTime = Date.now();
  isPaused = false;
  setInterval(updateStopWatch, 100);
  startBtn.textContent = "Resume";
});

pauseBtn.addEventListener("click", () => {
  pausedTime = elapsedTime;
  elapsedTime = 0;
  isPaused = true;
});

resetBtn.addEventListener("click", () => {
  pausedTime = 0;
  elapsedTime = 0;
  isPaused = true;
  startBtn.textContent = "Start";
});
