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
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(3.6 * response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute(
        "alt", response.data.weather[0].description
    );
}

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-city-input");
    let cityElement = searchInput.value;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement}&appid=${apiKey}&units=metric`;

    axios.get(`${apiUrl}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
let apiKey = "242f24100968a339d770d17bf88c51f0";
