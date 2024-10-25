let form = document.querySelector("#search-form");
let cityInput = document.querySelector("#city-input");
let cityDisplay = document.querySelector("#city-name");
let dateTimeDisplay = document.querySelector("#date-time");
let weatherDescription = document.querySelector("#weather-description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let temperatureElement = document.querySelector("#temperature");
let weatherEmoji = document.querySelector("weatherEmoji");


function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  return `${days[date.getDay()]} ${hours}:${minutes}`;
}
function updateDateTime(){
    let now = new Date();
    dateTimeDisplay.innerHTML = formatDate (now)

}

function getWeatherEmoji(description) {
    if (description.includes("clear")) {
        return "☀️";

    } else if (description.includes("cloud")) {
        return "☁️";

    } else if (description.includes("rain")) {
        return "🌨️";

    } else if (description.includes("snow")) {
        return "❄️";

    } else if (description.includes("storm")) {
        return "⚡";

    } else if (description.includes("rainbow")) {
        return "🌈";

    }
}




function refreshWeather(response) {
  // Get the data from the response
  let city = response.data.city; // Adjust this if the API response structure is different
  let temperature = Math.round(response.data.temperature.current); // Adjust based on actual response structure
    let humidity = response.data.humidity;
    let windSpeed = response.data.wind.speed;
  // Update the DOM elements
  cityDisplay.innerHTML = city;
    temperatureElement.innerHTML = `${temperature}°C`; // Assuming temperature is in Celsius
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    windElement.innerHTML = `windSpeed: ${windSpeed} m/s`;
}

function searchCity(city) {
  let apiKey = "5af0c133bfa709dct64aabc68f1ao404";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = cityInput.value.trim();

  if (city) {
    searchCity(city);
    cityInput.value = "";
  }
}

form.addEventListener("submit", handleSearch);
updateDateTime();
setInterval(updateDateTime, 60000); // Update time every minute
searchCity("default city"); // Load default city, replace "default city" with a specific city name if needed
