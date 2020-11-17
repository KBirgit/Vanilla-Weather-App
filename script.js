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
    console.log(response.data);
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
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

function showForecast(response) {
    console.log(response.data);
    let latitude = response.latitude;
    let longitude = response.longitude;
}

function search(city) {
    
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(`${apiUrl}`).then(showTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?q=${city}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
    
    axios.get(`${apiUrl}`).then(showForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-city-input");
    search(searchInput.value);
}

function showFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    if(units === "c") {
        event.target.innerHTML = "/°C";
        temperatureElement.innerHTML = `${Math.round(celsiusTemperature * 9 / 5 + 32)}°F`;
        units = "f";
    } else {
        event.target.innerHTML = "/°F";
        temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
        units = "c";
    }
}

function showPosition(position) {

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let gpsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

    axios.get(`${gpsUrl}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let apiKey = "242f24100968a339d770d17bf88c51f0";

let celsiusTemperature = null;
let units = "c";

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let scaleLink = document.querySelector("#scale");
scaleLink.addEventListener("click", showFahrenheitTemp);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition)

search("Tallinn");