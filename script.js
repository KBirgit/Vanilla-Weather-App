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

function showTemperature(response) {
  console.log(response);
}

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-city-input");
    let cityResult = searchInput.value;

    axios.get(`${apiUrl}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
let apiKey = "242f24100968a339d770d17bf88c51f0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tallinn&appid=${apiKey}&units=metric`;
