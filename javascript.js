let now = new Date();

let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let currentDay = weekDays[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

function displayDate(date) {
  return `${currentDay} ${currentHour}:${currentMinute}`;
}

let currentDate = displayDate(now);

let date = document.querySelector("#currentDate");
date.innerHTML = currentDate;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inlineFormInputName2");
  let cityName = document.querySelector("#currentCity");
  let city = `${cityInput.value}`;
  city = city.trim();
  city = capitalizeFirstLetter(city);
  cityName.innerHTML = city;
  let apiKey = "d2f1ee1358def379d685af37a2ea3c2a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(displayPrecipitation);
  axios.get(apiUrl).then(displayWind);
  axios.get(apiUrl).then(displayDescriptionWeather);
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;
}

function displayPrecipitation(response) {
  let precipitation = `${response.data.main.humidity} %`;
  let currentPrecipitation = document.querySelector("#current-humidity");
  currentPrecipitation.innerHTML = precipitation;
}

function displayWind(response) {
  let wind = response.data.wind.speed;
  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = `${wind} km/h`;
}

function displayDescriptionWeather(response) {
  let descriptionWeather = response.data.weather[0].main;
  let currentDescriptionWeather = document.querySelector(
    "#current-description-weather"
  );
  currentDescriptionWeather.innerHTML = descriptionWeather;
}

function displayCurrentCity(response) {
  let city = response.data.name;
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = city;
}

function showWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d2f1ee1358def379d685af37a2ea3c2a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(displayCurrentCity);
  axios.get(apiUrl).then(displayPrecipitation);
  axios.get(apiUrl).then(displayWind);
  axios.get(apiUrl).then(displayDescriptionWeather);
}

function getMyWeather() {
  navigator.geolocation.getCurrentPosition(showWeather);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", enterCity);

function temperatureInFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = 75;
}
function temperatureInCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = 24;
}

let currentTemperatureInCelsius = document.querySelector(
  "#fahrenheit-current-temp"
);

//currentTemperatureInCelsius.addEventListener("click", temperatureInFahrenheit);

let currentTemperatureInFahrenheit = document.querySelector(
  "#celsius-current-temp"
);
currentTemperatureInFahrenheit.addEventListener("click", temperatureInCelsius);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getMyWeather);
