
let form = document.querySelector("#search-form");
let cityInput = document.querySelector("#city-input");
let cityDisplay = document.querySelector("#city-name");

function searchCity{
    let apiKey = "5af0c133bfa709dct64aabc68f1ao404";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather);
}
function handleSearch(event) {
  event.preventDefault();
  let city = cityInput.value.trim();

  if (city) {
    cityDisplay.textContent = city;
    cityInput.value = "";
  }
}


form.addEventListener("submit", handleSearch);
