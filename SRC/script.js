function formatDate(timestamp) {
let date = new Date();
let daysIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = daysIndex[date.getDay()];
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = days[date.getDay()];
  return day;
}

function getLocation(response) {
  cityName = response.data.name;
  latitude = response.data.coord.lat;
  longitude = response.data.coord.lon;
  getWeather();
}

function getWeather() {
    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(showWeather).then(showForecast);
}

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#timeDay")
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  latitude = response.data.coord.lat;
  longitude = response.data.coord.lon;

  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity} %`;
  windElement.innerHTML = `${Math.round(3.6 * response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt*1000);
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
    );
    iconElement.setAttribute(
        "alt", response.data.weather[0].description
    );
}

function getForecast() {
    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 5; index++) {
      forecast = response.data.daily[index];
      forecastElement.innerHTML += `
      <span class="weekDay">
      <div class="col">
            ${formatDay(forecast.dt*1000)}
        <br />
            <img
              src="images/${forecast.weather[0].icon}.png"
              alt="${forecast.weather[0].description}"/>
        <br />
            <span id="temperature-span">${Math.round(forecast.temp.max)}</span>° <span class="nightTemp" id="temperature-span">${Math.round(forecast.temp.min)}</span>°
            </div>
            </span>
    `;
    }
}

function search(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(showWeather).then(getForecast).catch(errorFunction);
}

function handleSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-city-input");
    search(searchInput.value);
  }

function errorFunction(error) {
  alert(
    "Sorry, the location was not found. Please enter a city name."
  );
}

function scale(event) {
    event.preventDefault();
    let temp = document.querySelector("#temperature");
    let temperatureElement = document.querySelectorAll("#temperature-span");
    let windElement = document.querySelector("#wind");
    console.log(windElement);
    if(units === "c") {
      event.target.innerHTML = "/°C";
      temperatureElement.forEach(function(element) {
        let degrees = parseInt(element.innerHTML);
        element.innerHTML = Math.round(degrees * 9 / 5 + 32);
      });
      temp.innerHTML = `${Math.round(celsiusTemperature * 9 / 5 + 32)}°F`;
      let wind = parseInt(windElement.innerHTML);
      windElement.innerHTML = `${Math.round(wind / 1.609344)} mph`;
      units = "f";
    } else {
        event.target.innerHTML = "/°F";
        temperatureElement.forEach(function(element) {
        let degrees = parseInt(element.innerHTML);
        element.innerHTML = Math.round((degrees - 32) * 5 / 9);
        });
        temp.innerHTML = `${Math.round(celsiusTemperature)}°C`;
        let wind = parseInt(windElement.innerHTML);
        windElement.innerHTML = `${Math.round(wind * 1.609344)} km/h`;
        units = "c";  
      };
    }

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let gpsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

    axios.get(`${gpsUrl}&appid=${apiKey}`).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
    
    axios.get(`${apiUrl}`).then(showForecast);
}
function getSomething() {
    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
}

let cityName = null;
let latitude = null;
let longitude = null;

let apiKey = "242f24100968a339d770d17bf88c51f0";

let celsiusTemperature = null;
let units = "c";

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let scaleLink = document.querySelector("#scale");
scaleLink.addEventListener("click", scale);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition)

search("Tallinn");