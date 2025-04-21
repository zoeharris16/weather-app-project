function updateValue(response) {
  let temperatureElement = document.querySelector("#temp-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#temp-icon");
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  iconElement.innerHTML = `<img src =${response.data.condition.icon_url}>`;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}, `;
}
function findCity(city) {
  let apiKey = "ea6b5e905f9afo1d15ta66af3bbd604d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateValue);
}
function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  findCity(searchInput.value);
}

function insertForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast-container">
          <div class="forecast-date">${day}</div>
          <div class="forecast-icon">☀️</div>
          <div class="forecast-temps">
            <div class="forecast-temp">
              <strong>15°</strong>
            </div>
            <div class="forecast-temp">9°</div>
          </div>
        </div>`;
  });

  forecastElement = document.querySelector("#forecast-data");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCity);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

findCity("London");
insertForecast();
