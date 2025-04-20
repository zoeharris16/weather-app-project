function updateValue(response) {
  let temperatureElement = document.querySelector("#temp-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCity);

findCity("London");
