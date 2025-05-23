const dateDisplay = document.getElementById("dateDisplay");
const mainTimer = document.getElementById("mainTimer");
const unitLabel = document.getElementById("unitLabel");
const unitSelect = document.getElementById("unitSelect");
const loveQuote = document.getElementById("loveQuote");

const startDate = new Date("2025-04-25T23:30:00");
let timerInterval = null;

function plural(unit, value) {
  return value === 1 ? unit : unit + "s";
}

async function fetchQuote() {
  try {
    const res = await fetch(
      "https://api.quotable.io/random?tags=love&maxLength=70"
    );
    const data = await res.json();
    loveQuote.textContent = `“${data.content}” — ${data.author}`;
  } catch (e) {
    loveQuote.textContent =
      "Every moment with you is a beautiful memory in the making.";
  }
}

function updateDisplay() {
  const now = new Date();
  const diff = now - startDate;

  let seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = (days / 7).toFixed(1);
  const months = (days / 30.44).toFixed(2);
  const years = (days / 365).toFixed(3);
  const remainingHours = hours % 24;
  const unitMode = unitSelect.value;

  if (unitMode === "full") {
    const remainingMonths = months % 12;
    const remainingDays = Math.floor(days % 30.44);
    mainTimer.textContent = `${years}y ${remainingMonths}m ${remainingDays}d`;
    unitLabel.textContent = "Years Months Days";
  } else if (unitMode === "ym") {
    const remainingMonths = months % 12;
    mainTimer.textContent = `${years}y ${remainingMonths}m`;
    unitLabel.textContent = "Years & Months";
  } else if (unitMode === "days-hours") {
    mainTimer.textContent = `${days}d ${remainingHours}h`;
    unitLabel.textContent = "Days & Hours";
  } else if (unitMode === "single-days") {
    mainTimer.textContent = days;
    unitLabel.textContent = plural("Day", days);
  } else if (unitMode === "single-hours") {
    mainTimer.textContent = hours;
    unitLabel.textContent = plural("Hour", hours);
  } else if (unitMode === "single-minutes") {
    mainTimer.textContent = minutes;
    unitLabel.textContent = plural("Minute", minutes);
  } else if (unitMode === "single-weeks") {
    mainTimer.textContent = weeks;
    unitLabel.textContent = plural("Week", weeks);
  } else if (unitMode === "single-months") {
    mainTimer.textContent = months;
    unitLabel.textContent = plural("Month", months);
  } else if (unitMode === "single-years") {
    mainTimer.textContent = years;
    unitLabel.textContent = plural("Year", years);
  }

  // Get raw values (as numbers)
  const totalYears = diff / (1000 * 60 * 60 * 24 * 365.25);
  const totalMonths = diff / (1000 * 60 * 60 * 24 * 30.44);
  const totalWeeks = diff / (1000 * 60 * 60 * 24 * 7);
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diff / (1000 * 60));

  // Fancy label using raw values
  let displayString = "";
  if (totalYears >= 1) {
    const y = Math.floor(totalYears);
    displayString = `${y} ${plural("year", y)} ago`;
  } else if (totalMonths >= 1) {
    const m = Math.floor(totalMonths);
    displayString = `${m} ${plural("month", m)} ago`;
  } else if (totalWeeks >= 1) {
    const w = Math.floor(totalWeeks);
    displayString = `${w} ${plural("week", w)} ago`;
  } else if (totalDays >= 1) {
    displayString = `${totalDays} ${plural("day", totalDays)} ago`;
  } else if (totalHours >= 1) {
    displayString = `${totalHours} ${plural("hour", totalHours)} ago`;
  } else if (totalMinutes >= 1) {
    displayString = `${totalMinutes} ${plural("minute", totalMinutes)} ago`;
  } else {
    displayString = "just now";
  }

  dateDisplay.textContent = `Our hearts met on ${displayString}`;
}

// Initialization
fetchQuote();
updateDisplay();
timerInterval = setInterval(updateDisplay, 1000);
