let timeDay = document.querySelector("#timeDay")
let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
timeDay.innerHTML = `${day} ${hours}:${minutes}`;



let form = document.querySelector("#search-form");
form.addEventListener("submit", search);